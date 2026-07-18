"use strict";

/**
 * CAMERA CONTROLLER
 * Quản lý khởi tạo, dừng, tạm dừng và xử lý quét QR
 */
const CameraController = (() => {
    let scanner = null;
    let scanning = false;

    // Khởi tạo camera
    async function start() {
        if (scanner) return; // Nếu đã khởi tạo thì bỏ qua

        Debug.write("Đang thực hiện khởi tạo camera...");
        scanner = new Html5Qrcode("reader");

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        try {
            await scanner.start(
                { facingMode: "environment" },
                config,
                (decodedText) => { onScan(decodedText); }, // Gọi hàm onScan khi quét thành công
                (err) => { /* Bỏ qua log lỗi quét liên tục */ }
            );
            scanning = true;
            Debug.write("Camera đã chạy thành công!");
        } catch (err) {
            Debug.write("Lỗi bật camera:", err);
            alert("Không thể bật camera: " + err.message);
        }
    }

    // Dừng camera
    async function stop() {
        if (scanner && scanning) {
            await scanner.stop();
            scanner = null;
            scanning = false;
            Debug.write("Camera đã dừng.");
        }
    }

    // Tạm dừng
    function pause() {
        if (scanner && scanning) scanner.pause();
    }

    // Tiếp tục
    function resume() {
        if (scanner && scanning) scanner.resume();
    }

    // Xử lý nội dung QR
    async function onScan(qrText) {
        if (window.daQuet) return;
        window.daQuet = true;
    
        await CameraController.stop(); 
        Debug.write("Controller", "Camera đã dừng hẳn sau khi quét");
    
        if (navigator.vibrate) navigator.vibrate(100);
    
        try {
            await AttendanceController.onQRCode(qrText);
        } catch (error) {
            console.error("Lỗi xử lý QR:", error);
            window.daQuet = false;
            await CameraController.start();
        }
    }

    // Khởi động lại
    async function restart() {
        await stop();
        await new Promise(r => setTimeout(r, 150));
        await start();
    }

    // Lắng nghe sự kiện ẩn/hiện tab
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && scanning && !window.daQuet) {
            resume();
        }
    });

    return { start, stop, pause, resume, restart };
})();

// Gán vào window để các controller khác truy cập
window.CameraController = CameraController;
