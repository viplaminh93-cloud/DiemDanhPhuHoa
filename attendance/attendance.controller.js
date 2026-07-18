"use strict";

/**
 * ATTENDANCE CONTROLLER
 * Giáo xứ Phú Hòa - Điều khiển luồng nghiệp vụ điểm danh
 */
const AttendanceController = (() => {

    let processing = false;

    async function start(loai) {
        try {
            Debug.write("Controller", "Bắt đầu start: " + loai);
            
            // 1. Chuẩn bị dữ liệu và giao diện
            AttendanceService.setCurrentType(loai);
            AttendanceRenderer.showScanner(loai);

            // 2. Đợi một chút cho hiệu ứng hiển thị hoàn tất
            await new Promise(resolve => setTimeout(resolve, 300));

            // 3. Cập nhật số liệu hôm nay
            const total = await AttendanceService.getTodayCounter();
            AttendanceRenderer.renderTodayCounter(total);

            // 4. Khởi động camera
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
        
        Debug.write("Controller", "Đang xử lý QR...");
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
        window.daQuet = false; 
        await PopupService.close();
        await CameraController.resume(); 
    }

    async function backHome() {
        Debug.write("Controller", "Quay lại trang chủ");
        processing = false;
        
        AttendanceService.reset();
        await CameraController.stop();
        AttendanceRenderer.showHome();
    }

    return { start, onQRCode, closePopup, backHome };
})();
