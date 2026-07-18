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
            
            Debug.write("Controller", "Bắt đầu start: " + loai);
            AttendanceService.setCurrentType(loai);
           
   //         AttendanceRenderer.showScanner(loai);
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const total = await AttendanceService.getTodayCounter();
            AttendanceRenderer.renderTodayCounter(total);
            
            Debug.write("Controller", "Đang gọi CameraController.start()");
            await CameraController.start();
            
            Debug.write("Controller", "Camera khởi tạo thành công");
        } catch (e) {
            Debug.write("Controller-ERROR", e.message);
            console.error("LỖI TẠI START:", e);
            alert("Lỗi: " + e.message);
        }
    }


    async function onQRCode(qrText) {
        if (processing) return;
        processing = true;
        Debug.write("Controller", "Đang xử lý QR...")
        try {
            const result = await AttendanceService.sendAttendance(qrText);
            if (result.success) {
                const total = await AttendanceService.getTodayCounter();
                AttendanceRenderer.renderTodayCounter(total);
            }
            PopupService.show(result);
        } catch (error) {
            Debug.write("Controller-ERROR", "Lỗi QR: " + error.message);
            processing = false;
            await CameraController.resume();
        }
    }

    async function closePopup() {
        processing = false;
        await PopupService.close();
    }

    async function backHome() {
        Debug.write("Controller", "Quay lại trang chủ");
        processing = false;
        AttendanceService.reset();
        await CameraController.stop();
        AttendanceRenderer.showHome();
    }

    // Đảm bảo có đủ ngoặc đóng cho module pattern
    return { start, onQRCode, closePopup, backHome };
})();
