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
                AttendanceService.setCurrentType(loai);
                
                // 1. Hiển thị UI
                AttendanceRenderer.showScanner(loai);
                
                // 2. Thêm một khoảng trễ nhỏ để trình duyệt render xong giao diện
                await new Promise(resolve => setTimeout(resolve, 300));
                
                const total = await AttendanceService.getTodayCounter();
                AttendanceRenderer.renderTodayCounter(total);
                
                // 3. Lúc này mới bắt đầu camera
                await CameraController.start();
            } catch (e) {
                console.error("Lỗi khởi tạo:", e);
                alert(e.message);
            }
        }
    }

    /** Xử lý kết quả quét mã QR */
    async function onQRCode(qrText) {
        if (processing) return;
        
        processing = true;
        try {
            const result = await AttendanceService.sendAttendance(qrText);

            // Cập nhật bộ đếm nếu điểm danh thành công
            if (result.success) {
                const total = await AttendanceService.getTodayCounter();
                AttendanceRenderer.renderTodayCounter(total);
            }

            // Hiển thị thông tin lên Popup
            PopupService.show(result);
        } catch (error) {
            console.error("Lỗi xử lý QR:", error);
            processing = false;
            await CameraController.resume();
        }
    }

    /** Đóng popup và cho phép tiếp tục quét */
    async function closePopup() {
        processing = false;
        await PopupService.close();
    }

    /** Quay về màn hình chính */
    async function backHome() {
        processing = false;
        AttendanceService.reset();
        await CameraController.stop();
        AttendanceRenderer.showHome();
    }

    return {
        start,
        onQRCode,
        closePopup,
        backHome
    };
})();
