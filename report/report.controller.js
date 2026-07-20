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
        // Gọi CameraService với callback là hàm onScanResult của chính Controller này
        CameraService.start((maso) => {
            // Khi quét xong, CameraService gọi callback này
            ReportController.onScanResult(maso);
        }).catch(err => {
            alert("Lỗi camera: " + err.message);
            isLookingUp = false;
        });
    }

    async function onScanResult(maso) {
        if (!isLookingUp) return; 
    
        const res = await Auth.post({ action: "studentHistory", maso: maso });
        if (res?.success && res.list?.length > 0) {
            renderHistory(res.list);
        } else {
            alert("Không tìm thấy dữ liệu.");
        }
        isLookingUp = false;
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
        if (typeof scanner !== 'undefined' && scanner.isScanning) {
            scanner.stop().catch(err => console.error("Lỗi tắt camera:", err));
        }
    }

    async function backHome() {
        processing = false;
        
        await CameraController.stop();
        ReportRenderer.showHome();
    }

    return { load, startLookup, onScanResult, closeResult, backHome };
})();
