/**
 * ======================================
 * CAMERA INITIALIZATION
 * Cấu hình và khởi chạy Camera
 * ======================================
 */
// 1. Khởi tạo Scanner (Thay 'reader' bằng id thẻ div của bạn)
const scanner = new Html5Qrcode("reader");

// 2. Camera Service: Cầu nối giữa Library và Controller
const CameraService = {
    start: async (onScan) => {
        const devices = await Html5Qrcode.getCameras();
        if (!devices || devices.length === 0) throw new Error("Không tìm thấy camera");
        
        const back = devices.find(c => /back|rear|environment/i.test(c.label));
        await scanner.start(
            back ? back.id : devices[0].id,
            { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1 },
            onScan,
            () => {}
        );
    },
    stop: async () => { if (scanner.isScanning) await scanner.stop(); },
    pause: () => { scanner.pause(); },
    resume: () => { scanner.resume(); },
    exists: () => { return !!scanner; },
    isPaused: () => { return scanner.isPaused; }
};
