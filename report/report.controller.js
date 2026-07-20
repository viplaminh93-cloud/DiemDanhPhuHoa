//======================================
// REPORT CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportController = (() => {
    let processing = false;
    let isLookingUp = false;

    async function load() {
        try {
            Renderer.text("reportDate", Utils.formatDate());
            const data = await ReportService.load();
            if (!data || data.success === false) {
                alert(data?.message || "Không tải được báo cáo.");
                return;
            }
            ReportRenderer.renderSummary(data);
            ReportRenderer.renderList(data.list || []);
        } catch (error) {
            console.error(error);
            alert("Lỗi tải báo cáo.");
        }
    }

    // --- Tra cứu cá nhân ---
    function startLookup() {
        isLookingUp = true;
        Utils.id("resultArea").classList.remove("hidden");
        // Gọi CameraService
        CameraService.start((maso) => {
            ReportController.onScanResult(maso);
        }).catch(err => {
            alert("Lỗi camera: " + err.message);
            isLookingUp = false;
            Utils.id("resultArea").classList.add("hidden");
        });
    }


    async function onScanResult(maso) {
        // Kiểm tra trạng thái lookup
        if (!isLookingUp) return;
        isLookingUp = false; 

        // 1. Dừng camera thông qua Service hiện có
        await CameraService.stop();

        // 2. Gọi API tìm kiếm
        const res = await Auth.post({ action: "studentHistory", maso: maso });
        
        // 3. Xử lý kết quả
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
        CameraService.stop().catch(err => console.error("Lỗi dừng camera:", err));
        isLookingUp = false;
    }

    async function backHome() {
        processing = false;
        try {
            await CameraController.stop();
        } catch (e) {
            console.log("Camera đã dừng hoặc không chạy.");
        }
        history.back(); 
    }

    return { load, startLookup, onScanResult, closeResult, backHome };
})();
