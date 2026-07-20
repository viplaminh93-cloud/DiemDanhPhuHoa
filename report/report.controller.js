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
        if (!isLookingUp) return;
        isLookingUp = false; // Ngăn quét tiếp

        // 1. Dừng camera ngay khi quét được mã
        await CameraService.stop();

        // 2. Gọi API tìm kiếm
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
        CameraController.stop().catch(err => console.error("Lỗi tắt camera:", err));
                isLookingUp = false;
/*        if (typeof scanner !== 'undefined' && scanner.isScanning) {
            scanner.stop().catch(err => console.error("Lỗi tắt camera:", err));
        }*/
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
