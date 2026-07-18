/**
 * ======================================
 * ATTENDANCE CONTROLLER
 * Giáo xứ Phú Hòa
 * ======================================
 */
"use strict";

const AttendanceController = (() => {
    let processing = false;

    async function start(loai) {
        try {
            processing = false;
            AttendanceService.setCurrentType(loai);
            AttendanceRenderer.showScanner(loai);
            
            // Thêm delay nhỏ để tránh lỗi rendering
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const total = await AttendanceService.getTodayCounter();
            AttendanceRenderer.renderTodayCounter(total);
            
            await CameraController.start();
        } catch (e) {
            console.error("Lỗi khởi tạo:", e);
            alert(e.message);
        }
    }

    async function onQRCode(qrText) {
        if (processing) return;
        processing = true;
        try {
            const result = await AttendanceService.sendAttendance(qrText);
            if (result.success) {
                const total = await AttendanceService.getTodayCounter();
                AttendanceRenderer.renderTodayCounter(total);
            }
            PopupService.show(result);
        } catch (error) {
            console.error("Lỗi QR:", error);
            processing = false;
            await CameraController.resume();
        }
    }

    async function closePopup() {
        processing = false;
        await PopupService.close();
    }

    async function backHome() {
        processing = false;
        AttendanceService.reset();
        await CameraController.stop();
        AttendanceRenderer.showHome();
    }

    // Đảm bảo có đủ ngoặc đóng cho module pattern
    return { start, onQRCode, closePopup, backHome };
})();
