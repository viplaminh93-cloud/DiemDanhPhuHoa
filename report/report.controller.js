//======================================
// REPORT CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportController = (() => {
    let processing = false;
    let isLookingUp = false;
    let allDataList = []; // Thêm biến để lưu dữ liệu gốc

    async function load() {
        try {
            Renderer.text("reportDate", Utils.formatDate());
            const data = await ReportService.load();
            if (!data || data.success === false) {
                alert(data?.message || "Không tải được báo cáo.");
                return;
            }
            allDataList = data.list || []; // Lưu dữ liệu vào biến toàn cục của module
            ReportRenderer.renderSummary(data);
            renderData(allDataList); // Hiển thị danh sách
        } catch (error) {
            console.error(error);
            alert("Lỗi tải báo cáo.");
        }
    }

    // Hàm lọc dữ liệu
    function filter() {
        const nameQuery = Utils.id("filterName").value.toLowerCase();
        const dateQuery = Utils.id("filterDate").value; // Format: YYYY-MM-DD
        const compareType = Utils.id("compareType").value;
        const threshold = parseInt(Utils.id("threshold").value) || 0;

        // Đếm số buổi của từng người (Dựa trên danh sách hiện tại)
        const stats = {};
        allDataList.forEach(item => {
            if (!stats[item.maso]) stats[item.maso] = 0;
            stats[item.maso]++;
        });

        const filtered = allDataList.filter(item => {
            const matchName = item.hoten.toLowerCase().includes(nameQuery);
            const matchDate = dateQuery ? convertToDDMMYYYY(dateQuery) === item.ngay : true;
            
            let matchCount = true;
            if (compareType !== "none" && threshold > 0) {
                const count = stats[item.maso];
                matchCount = (compareType === "duoi") ? count < threshold : count > threshold;
            }

            return matchName && matchDate && matchCount;
        });

        renderData(filtered);
    }

    function renderData(list) {
        ReportRenderer.renderList(list);
    }

    function convertToDDMMYYYY(dateStr) {
        const [y, m, d] = dateStr.split('-');
        return `${d}/${m}/${y}`;
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

    return { load, startLookup, onScanResult, closeResult, backHome, filter };
})();
