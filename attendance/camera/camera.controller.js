"use strict";

const CameraController = (() => {
    window.daQuet = false;

    async function start() {
        window.daQuet = false;
        
        // Đợi CameraService sẵn sàng
        let attempts = 0;
        while (typeof CameraService === 'undefined' && attempts < 20) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (typeof CameraService !== 'undefined') {
            await CameraService.start(qrSuccess);
        } else {
            Utils.error("CameraService chưa sẵn sàng!");
        }
    }

    async function stop() {
        window.daQuet = false;
        if (typeof CameraService !== 'undefined') await CameraService.stop();
    }

    async function pause() {
        if (typeof CameraService !== 'undefined') await CameraService.pause();
    }

    async function resume() {
        window.daQuet = false;
        if (typeof CameraService !== 'undefined') await CameraService.resume();
    }

    async function qrSuccess(qrText) {
        if (window.daQuet) return;
        window.daQuet = true;

        await pause();
        if (navigator.vibrate) navigator.vibrate(100);

        try {
            await AttendanceController.onQRCode(qrText);
        } catch (error) {
            Utils.error(error);
            window.daQuet = false;
            await resume();
        }
    }

    return { start, stop, pause, resume };
})();


document.addEventListener("visibilitychange", async () => {
    if (!document.hidden && typeof CameraService !== 'undefined' && CameraService.exists() && !window.daQuet) {
        try { await CameraController.resume(); } catch (e) { Utils.error(e); }
    }
});
