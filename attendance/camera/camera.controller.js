"use strict";

window.daQuet = false;

async function startCamera() {
    window.daQuet = false;
    await CameraService.start(qrSuccess);
}

async function stopCamera() {
    window.daQuet = false;
    await CameraService.stop();
}

async function pauseCamera() { await CameraService.pause(); }

async function resumeCamera() {
    window.daQuet = false;
    await CameraService.resume();
}

async function qrSuccess(qrText) {
    if (window.daQuet) return;
    window.daQuet = true;

    await pauseCamera();
    if (navigator.vibrate) navigator.vibrate(100);

    try {
        await AttendanceController.onQRCode(qrText);
    } catch (error) {
        console.error(error);
        window.daQuet = false;
        await resumeCamera();
    }
}

document.addEventListener("visibilitychange", async () => {
    if (!document.hidden && CameraService.exists() && !window.daQuet) {
        try { await resumeCamera(); } catch (e) { console.error(e); }
    }
});
