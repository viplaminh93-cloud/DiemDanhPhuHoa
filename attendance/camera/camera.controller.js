/**
 * ======================================
 * CAMERA SERVICE & CONTROLLER
 * Tích hợp Html5Qrcode và điều khiển logic
 * ======================================
 */
"use strict";

// 3. Camera Controller: Điều khiển luồng nghiệp vụ
const CameraController = (() => {
    let scanning = false;

    async function start() {
        scanning = true;
        window.daQuet = false;
        await CameraService.start(onScan);
    }

    async function stop() {
        scanning = false;
        window.daQuet = false;
        await CameraService.stop();
    }

    function pause() {
        CameraService.pause();
    }

    function resume() {
        if (!scanning) return;
        window.daQuet = false;
        CameraService.resume();
    }

    async function restart() {
        await stop();
        await new Promise(r => setTimeout(r, 150));
        await start();
    }

    async function onScan(qrText) {
        if (window.daQuet) return;

        window.daQuet = true;
        pause();

        if (navigator.vibrate) navigator.vibrate(100);

        try {
            await AttendanceController.onQRCode(qrText);
        } catch (error) {
            console.error("Lỗi xử lý QR:", error);
            window.daQuet = false;
            resume();
        }
    }

    // Lắng nghe sự kiện chuyển tab
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && scanning && CameraService.exists() && CameraService.isPaused() && !window.daQuet) {
            CameraService.resume();
        }
    });

    return { start, stop, pause, resume, restart };
})();
