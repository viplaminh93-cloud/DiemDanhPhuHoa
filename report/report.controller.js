//======================================
// REPORT CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportController = (() => {
    let isLookingUp = false;
    let currentType = "TẤT CẢ";

    /**
     * Tải dữ liệu từ LocalStorage (đã được sync từ ReportService)
     */
    function load() {
        Renderer.text("reportDate", Utils.formatDate());
        
        // Lấy từ kho trung tâm
        const allDataList = ReportService.getHistory();
        
        if (allDataList.length === 0) {
            console.warn("Chưa có dữ liệu lịch sử.");
        }
        
        filter(); // Hiển thị dữ liệu mặc định (TẤT CẢ)
    }

    /**
     * Lọc và Render dữ liệu dựa trên các bộ lọc trên giao diện
     */
    function filter() {
        const allDataList = ReportService.getHistory();
        
        // 1. Lấy giá trị từ bộ lọc
        const query = Utils.id("filterGeneral").value.toLowerCase();
        const dateQuery = Utils.id("filterDate").value;
        const compareType = Utils.id("compareType").value;
        const threshold = parseInt(Utils.id("threshold").value) || 0;

        // 2. Tính toán thống kê nhanh
        const stats = {};
        allDataList.forEach(item => {
            stats[item.maso] = (stats[item.maso] || 0) + 1;
        });

        // 3. Thực hiện lọc
        const filtered = allDataList.filter(item => {
            const matchGeneral = item.hoten.toLowerCase().includes(query) || 
                                 item.maso.toLowerCase().includes(query) || 
                                 item.lop.toLowerCase().includes(query);
            
            const matchDate = dateQuery ? convertToDDMMYYYY(dateQuery) === item.ngay : true;
            const matchType = (currentType === "TẤT CẢ") ? true : item.loai.trim() === currentType;
            
            let matchCount = true;
            if (compareType !== "none" && threshold > 0) {
                const count = stats[item.maso];
                matchCount = (compareType === "duoi") ? count < threshold : count > threshold;
            }
            
            return matchGeneral && matchDate && matchType && matchCount;
        });

        // 4. Render kết quả
        ReportRenderer.renderList(filtered);
        
        // 5. Cập nhật Summary
        const summary = {
            tong: filtered.length,
            le1: filtered.filter(i => i.loai.trim() === "Lễ 1").length,
            le2: filtered.filter(i => i.loai.trim() === "Lễ 2").length,
            leChieu: filtered.filter(i => i.loai.trim() === "Lễ Chiều").length,
            giaoly: filtered.filter(i => i.loai.trim() === "Giáo lý").length
        };
        ReportRenderer.renderSummary(summary);
    }

    function setFilterType(type, btnElement) {
        document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
        currentType = type;
        filter();
    }

    function convertToDDMMYYYY(dateStr) {
        if (!dateStr) return "";
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
    }

    // --- Tra cứu & Camera ---
    function startLookup() {
        isLookingUp = true;
        Utils.id("resultArea").classList.remove("hidden");
        CameraService.start((maso) => {
            onScanResult(maso);
        }).catch(err => {
            alert("Lỗi camera: " + err.message);
            isLookingUp = false;
        });
    }

    async function onScanResult(maso) {
        if (!isLookingUp) return;
        isLookingUp = false;
        await CameraService.stop();
        
        // Lấy lịch sử từ LocalStorage (tốc độ cực nhanh)
        const allHistory = ReportService.getHistory();
        const studentHistory = allHistory.filter(h => h.maso === maso);
        
        if (studentHistory.length > 0) {
            renderHistory(studentHistory);
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
    }

    function closeResult() {
        Utils.id("resultArea").classList.add("hidden");
        CameraService.stop().catch(console.error);
        isLookingUp = false;
    }

    function backHome() {
        CameraService.stop().catch(console.error);
        location.href = "../dashboard/dashboard.html";
    }

    // --- Xuất Excel ---
    function exportToExcel() {
        const filtered = ReportService.getHistory().filter(item => {
            return currentType === "TẤT CẢ" ? true : item.loai.trim() === currentType;
        });
        
        if (filtered.length === 0) {
            alert("Không có dữ liệu để xuất!");
            return;
        }
    
        let htmlContent = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="utf-8"></head>
            <body>
                <table>
                    <tr>
                        <th>Mã số</th><th>Họ Tên</th><th>Lớp</th><th>Loại</th><th>Ngày</th><th>Giờ</th><th>Người quét</th>
                    </tr>`;
        
            filtered.forEach(item => {
                htmlContent += `
                    <tr>
                        <td>${item.maso}</td>
                        <td>${item.hoten}</td>
                        <td>${item.lop}</td>
                        <td>${item.loai}</td>
                        <td>${item.ngay}</td>
                        <td>${item.gio}</td>
                        <td>${item.nguoiQuet || 'Không xác định'}</td>
                    </tr>`;
            });
        
            htmlContent += `</table></body></html>`;
    
        // 2. Tạo Blob với BOM đã được chèn
        const BOM = "\uFEFF"; // Ký tự đặc biệt giúp Excel nhận diện UTF-8
        const blob = new Blob([BOM + htmlContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `BaoCaoTNTTPhuHoa_${dateStr}.xls`;
        link.click();
    }



    return { load, startLookup, onScanResult, closeResult, backHome, filter, setFilterType, exportToExcel };
})();
