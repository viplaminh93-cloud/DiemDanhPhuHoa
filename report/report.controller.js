//======================================
// REPORT CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportController = (() => {
    let processing = false;
    let isLookingUp = false;
    let allDataList = [];
    let currentType = "DỰ LỄ"; // Mặc định là DỰ LỄ

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
        const nameQuery = Utils.id("filterName").value.toLowerCase();
        const dateQuery = Utils.id("filterDate").value;
        const compareType = Utils.id("compareType").value;
        const threshold = parseInt(Utils.id("threshold").value) || 0;

        const stats = {};
        allDataList.forEach(item => {
            if (!stats[item.maso]) stats[item.maso] = 0;
            stats[item.maso]++;
        });

        return allDataList.filter(item => {
            const matchName = item.hoten.toLowerCase().includes(nameQuery);
            const matchDate = dateQuery ? convertToDDMMYYYY(dateQuery) === item.ngay : true;
            
            let matchCount = true;
            if (compareType !== "none" && threshold > 0) {
                const count = stats[item.maso];
                matchCount = (compareType === "duoi") ? count < threshold : count > threshold;
            }
            return matchName && matchDate && matchCount;
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
        if (filtered.length === 0) {
            alert("Không có dữ liệu để xuất!");
            return;
        }
    
        // Tiêu đề cột
        let csvContent = "\uFEFFMã số,Họ Tên,Lớp,Loại,Ngày,Giờ\n"; 
        
        filtered.forEach(item => {
            // Ghi từng dòng, mỗi giá trị cách nhau bằng dấu phẩy
            csvContent += `"${item.maso}","${item.hoten}","${item.lop}","${item.loai}","${item.ngay}","${item.gio}"\n`;
        });
    
        // Tạo file tải về
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Bao_cao_${Utils.formatDate().replace(/\//g, "-")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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

    return { load, startLookup, onScanResult, closeResult, backHome, filter, exportToExcel };
})();
