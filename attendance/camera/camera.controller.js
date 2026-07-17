"use strict";

window.daQuet = false;

async function startCamera() {
    window.daQuet = false;
    
    // Cơ chế đợi tối đa 2 giây nếu CameraService chưa sẵn sàng
    let attempts = 0;
    while (typeof CameraService === 'undefined' && attempts < 20) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }

    if (typeof CameraService !== 'undefined') {
        await CameraService.start(qrSuccess);
    } else {
        Utils.error("CameraService vẫn không phản hồi sau 2 giây!");
    }
}

async function stopCamera() {
    window.daQuet = false;
    if (typeof CameraService !== 'undefined') await CameraService.stop();
}

async function pauseCamera() { 
    if (typeof CameraService !== 'undefined') await CameraService.pause(); 
}

async function resumeCamera() {
    window.daQuet = false;
    if (typeof CameraService !== 'undefined') await CameraService.resume();
}

async function qrSuccess(qrText) {
    if (window.daQuet) return;
    window.daQuet = true;

    await pauseCamera();
    Utils.vibrate(100);

    try {
        await AttendanceController.onQRCode(qrText);
    } catch (error) {
        Utils.error(error);
        window.daQuet = false;
        await resumeCamera();
    }
}

document.addEventListener("visibilitychange", async () => {
    if (!document.hidden && typeof CameraService !== 'undefined' && CameraService.exists() && !window.daQuet) {
        try { await resumeCamera(); } catch (e) { Utils.error(e); }
    }
});
