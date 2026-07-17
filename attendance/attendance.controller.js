"use strict";

async function start(loai) {
    AttendanceService.setCurrentType(loai);
    processing = false;
    
    AttendanceRenderer.showScanner(loai);
    const count = await AttendanceService.getTodayCounter();
    AttendanceRenderer.renderTodayCounter(count);
    
    await CameraController.start(); 
}

const AttendanceController = (() => {
    let processing = false;

    async function start(loai) {
        AttendanceService.setCurrentType(loai);
        processing = false;
        
        AttendanceRenderer.showScanner(loai);
        const count = await AttendanceService.getTodayCounter();
        AttendanceRenderer.renderTodayCounter(count);
        
        await CameraService.startCamera(); 
    }

    async function onQRCode(qrText) {
        if (processing) return;
        processing = true;

        try {
            const result = await AttendanceService.sendAttendance(qrText);
            if (result.success) {
                const count = await AttendanceService.getTodayCounter();
                AttendanceRenderer.renderTodayCounter(count);
            }
            PopupService.show(result);
        } catch (error) {
            Utils.error(error);
            processing = false;
            await CameraService.resumeCamera();
        }
    }

    async function closePopup() {
        processing = false;
        await PopupService.close();
    }

async function backHome() {
    processing = false;
    await CameraController.stop();
    AttendanceRenderer.showHome();
}
    return { start, onQRCode, closePopup, backHome };
})();
