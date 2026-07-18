/**
 * ======================================
 * ATTENDANCE CONTROLLER
 * Giáo xứ Phú Hòa
 * ======================================
 */
"use strict";

const AttendanceController = (() => {
    async function start(loai) {
        try {
            processing = false;
            
            console.log("Bước 1: Set Type");
            AttendanceService.setCurrentType(loai);
            
            console.log("Bước 2: Show Scanner");
            AttendanceRenderer.showScanner(loai);
            
            console.log("Bước 3: Delay");
            await new Promise(resolve => setTimeout(resolve, 300));
            
            console.log("Bước 4: Get Counter");
            const total = await AttendanceService.getTodayCounter();
            AttendanceRenderer.renderTodayCounter(total);
            
            console.log("Bước 5: Start Camera");
            await CameraController.start();
            
            console.log("Khởi tạo thành công!");
        } catch (e) {
            // Đây là nơi bắt lỗi. Hãy nhìn vào Console để thấy lỗi báo ở Bước mấy
            console.error("LỖI TẠI START:", e);
            alert("Lỗi: " + e.message);
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
