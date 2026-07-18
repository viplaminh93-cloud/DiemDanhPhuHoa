/**
 * ======================================
 * CAMERA CONTROLLER - GIÁO XỨ PHÚ HÒA
 * Quản lý vòng đời và sự kiện quét QR
 * ======================================
 */
"use strict";

const CameraController = (() => {
    let scanning = false;

    /** Bắt đầu kích hoạt dịch vụ quét */
    async function start() {
        scanning = true;
        window.daQuet = false;
        await CameraService.start(onScan);
    }

    /** Dừng dịch vụ quét hoàn toàn */
    async function stop() {
        scanning = false;
        window.daQuet = false;
        await CameraService.stop();
    }

    /** Tạm dừng camera (giữ nguyên kết nối) */
    function pause() {
        CameraService.pause();
    }

    /** Tiếp tục camera nếu đang trong phiên quét */
    function resume() {
        if (!scanning) return;
        window.daQuet = false;
        CameraService.resume();
    }

    /** Khởi động lại: Dừng và bắt đầu lại sau 150ms */
    async function restart() {
        await stop();
        await Utils.sleep(150);
        await start();
    }

    /** Callback xử lý khi quét thành công */
    async function onScan(qrText) {
        if (window.daQuet) return;

        window.daQuet = true;
        pause();

        // Phản hồi xúc giác cho người dùng
        if (navigator.vibrate) navigator.vibrate(100);

        try {
            await AttendanceController.onQRCode(qrText);
        } catch (error) {
            console.error("Lỗi xử lý QR:", error);
            window.daQuet = false;
            resume();
        }
    }

    /** Tự động Resume khi người dùng quay lại tab */
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && scanning && CameraService.exists() && CameraService.isPaused() && !window.daQuet) {
            CameraService.resume();
        }
    });

    return { start, stop, pause, resume, restart };
})();
