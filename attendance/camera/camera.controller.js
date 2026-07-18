/**
 * ======================================
 * CAMERA CONTROLLER
 * Giáo xứ Phú Hòa
 * ======================================
 */
"use strict";

const CameraController = (() => {
    let scanning = false;

    /** Bắt đầu quét mã QR */
    async function start() {
        scanning = true;
        window.daQuet = false;
        await CameraService.start(onScan);
    }

    /** Dừng quét mã QR */
    async function stop() {
        scanning = false;
        window.daQuet = false;
        await CameraService.stop();
    }

    /** Tạm dừng camera */
    async function pause() {
        CameraService.pause();
    }

    /** Tiếp tục camera nếu đang ở trạng thái quét */
    async function resume() {
        if (!scanning) return;
        window.daQuet = false;
        CameraService.resume();
    }

    /** Khởi động lại luồng camera */
    async function restart() {
        await stop();
        await Utils.sleep(150);
        await start();
    }

    /** Xử lý khi quét thành công */
    async function onScan(qrText) {
        if (window.daQuet) return;

        window.daQuet = true;
        await pause();

        if (navigator.vibrate) navigator.vibrate(100);

        try {
            await AttendanceController.onQRCode(qrText);
        } catch (error) {
            console.error(error);
            window.daQuet = false;
            await resume();
        }
    }

    /** Lắng nghe sự kiện chuyển tab để tự động resume camera */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) return;
        if (scanning && CameraService.exists() && CameraService.isPaused() && !window.daQuet) {
            CameraService.resume();
        }
    });

    return { start, stop, pause, resume, restart };
})();
