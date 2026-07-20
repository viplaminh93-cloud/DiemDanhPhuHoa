//======================================
// REPORT CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportController = (() => {
    let processing = false;
    let isLookingUp = false;
    let allDataList = [];
    let currentType = "Dự Lễ"; // Mặc định là DỰ LỄ

    async function load() {
        try {
            Renderer.text("reportDate", Utils.formatDate());
            const data = await ReportService.load();
            if (!data || data.success === false) {
                alert(data?.message || "Không tải được báo cáo.");
                return;
            }
            allDataList = data.list || [];
            ReportRenderer.renderSummary(data);
            renderData(allDataList);
        } catch (error) {
            console.error(error);
            alert("Lỗi tải báo cáo.");
        }
    }
    
    // Hàm gọi khi nhấn nút lọc
    function setFilterType(type) {
        currentType = type;
        filter();
    }

    // Hàm lấy dữ liệu sau khi đã áp dụng tất cả bộ lọc
    function getFilteredData() {
        const query = Utils.id("filterGeneral").value.toLowerCase();
        const dateQuery = Utils.id("filterDate").value;
        const compareType = Utils.id("compareType").value;
        const threshold = parseInt(Utils.id("threshold").value) || 0;
    
        // Tính số lần xuất hiện của mỗi mã số
        const stats = {};
        allDataList.forEach(item => {
            if (!stats[item.maso]) stats[item.maso] = 0;
            stats[item.maso]++;
        });
    
        return allDataList.filter(item => {
            // Tìm kiếm đa năng trên 3 trường
            const matchGeneral = 
                item.hoten.toLowerCase().includes(query) || 
                item.maso.toLowerCase().includes(query) || 
                item.lop.toLowerCase().includes(query);
                
            const matchDate = dateQuery ? convertToDDMMYYYY(dateQuery) === item.ngay : true;
            const matchType = item.loai.toUpperCase() === currentType;
            
            let matchCount = true;
            if (compareType !== "none" && threshold > 0) {
                const count = stats[item.maso];
                matchCount = (compareType === "duoi") ? count < threshold : count > threshold;
            }
            
            return matchGeneral && matchDate && matchType && matchCount;
        });
    }

    function filter() {
        renderData(getFilteredData());
    }

    function renderData(list) {
        ReportRenderer.renderList(list);
    }

    function convertToDDMMYYYY(dateStr) {
        if (!dateStr) return "";
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
    }

    // --- Xuất Excel ---
    function exportToExcel() {
        const filtered = getFilteredData(); // Lấy danh sách đang lọc
        const today = new Date();
        const dateStr = today.getDate().toString().padStart(2, '0') + '-' + 
                        (today.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                        today.getFullYear();
        
        if (filtered.length === 0) {
            alert("Không có dữ liệu để xuất!");
            return;
        }
    
        // 1. Thêm BOM (\uFEFF) vào đầu chuỗi nội dung để Excel hiểu là UTF-8
        let content = "\uFEFFMã số\tHọ Tên\tLớp\tLoại\tNgày\tGiờ\n";
        
        filtered.forEach(item => {
            content += `${item.maso}\t${item.hoten}\t${item.lop}\t${item.loai}\t${item.ngay}\t${item.gio}\n`;
        });
    
        // 2. Tạo Blob với BOM đã được chèn
        const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `BaoCaoTNTTPhuHoa_${dateStr}.xls`;
        link.click();
    }

    // --- Tra cứu cá nhân ---
    function startLookup() {
        isLookingUp = true;
        Utils.id("resultArea").classList.remove("hidden");
        CameraService.start((maso) => {
            onScanResult(maso);
        }).catch(err => {
            alert("Lỗi camera: " + err.message);
            isLookingUp = false;
            Utils.id("resultArea").classList.add("hidden");
        });
    }

    async function onScanResult(maso) {
        if (!isLookingUp) return;
        isLookingUp = false;
        await CameraService.stop();
        const res = await Auth.post({ action: "studentHistory", maso: maso });
        if (res?.success && res.list?.length > 0) {
            renderHistory(res.list);
        } else {
            alert("Không tìm thấy dữ liệu cho mã: " + maso);
            closeResult(); 
        }
    }

    function renderHistory(list) {
        const container = Utils.id("historyList");
        container.innerHTML = list.map(item => `
            <div class="report-row">
                <div>
                    <strong>${item.ngay}</strong> (${item.gio})<br>
                    <small>${item.loai} - Lớp: ${item.lop}</small>
                </div>
            </div>
        `).join("");
        Utils.id("resultArea").classList.remove("hidden");
    }

    function closeResult() {
        Utils.id("resultArea").classList.add("hidden");
        CameraService.stop().catch(err => console.error("Lỗi tắt camera:", err));
        isLookingUp = false;
    }

    async function backHome() {
        try { await CameraService.stop(); } catch (e) {}
        history.back(); 
    }

    return { load, startLookup, onScanResult, closeResult, backHome, filter, setFilterType, exportToExcel };
})();
