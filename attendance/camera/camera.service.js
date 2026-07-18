/**
 * ======================================
 * CAMERA INITIALIZATION
 * Cấu hình và khởi chạy Camera
 * ======================================
 */

"use strict";

const scanner = new Html5Qrcode("reader");

const CameraService = {
    start: async (onScan) => {
        try {
            // 1. Dừng scanner nếu nó đang chạy (tránh lỗi xung đột)
            if (scanner.isScanning) {
                await scanner.stop();
            }

            // 2. Lấy danh sách thiết bị
            const devices = await Html5Qrcode.getCameras();
            if (!devices || devices.length === 0) {
                throw new Error("Không phát hiện camera.");
            }

            // 3. KHỞI ĐỘNG CAMERA SAU: 
            const backCamera = devices[devices.length - 1].id;
            console.log("Đang khởi động camera sau (ID):", backCamera);

            // 4. Khởi động với cấu hình tối giản (giảm rủi ro lỗi phần cứng)
            await scanner.start(
                backCamera,
                {
                    fps: 10,
                    qrbox: 250, // Dùng số nguyên thay vì object để tránh lỗi CSS
                    aspectRatio: 1.0
                },
                onScan,
                (err) => { /* Bỏ qua các lỗi quét liên tục để tránh spam console */ }
            );
        } catch (err) {
            console.error("Lỗi CameraService:", err);
            throw err; 
        }
    },

/*    stop: async () => {
        if (scanner.isScanning) {
            await scanner.stop().catch(e => console.log("Lỗi stop:", e));
        }
    },
    
    pause: () => { if (scanner.isScanning) scanner.pause(); },
    resume: () => { if (scanner.isScanning) scanner.resume(); },*/
    exists: () => { return !!scanner; },
    isPaused: () => { return scanner.isPaused; }
};
