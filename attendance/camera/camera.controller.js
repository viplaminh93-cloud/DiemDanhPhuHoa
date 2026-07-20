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
        if (scanner) {
            try {
                // 1. Dừng scanner nếu đang quét
                if (scanning) {
                    await scanner.stop();
                }
                
                // 2. Clear (Quan trọng) - Xóa nội dung bên trong thẻ #reader
                // Nếu dùng thư viện, cách an toàn nhất là xóa nội dung thẻ div
                const readerDiv = document.getElementById("reader");
                if (readerDiv) {
                    readerDiv.innerHTML = ""; 
                }
    
                // 3. Reset trạng thái
                scanner = null;
                scanning = false;
                window.daQuet = false; // Reset cờ để cho phép quét lần sau
                
                Debug.write("Camera đã dừng và dọn dẹp hoàn toàn.");
            } catch (err) {
                Debug.write("Lỗi khi stop camera:", err);
            }
        }
    }


    async function pause() {
        if (scanner && scanning) {
            scanner.pause();
            // Thay vì display: none, hãy ẩn lớp video element bên trong
            const videoElement = document.querySelector("#reader video");
            if (videoElement) {
                videoElement.style.opacity = "1"; // Vẫn giữ layout, nhưng làm mờ hoàn toàn
            }
        }
    }
    
    async function resume() {
        if (scanner && scanning) {
            try {
                await scanner.resume();
                Debug.write("Camera đã resume");
            } catch (err) {
                Debug.write("Lỗi resume:", err);
                // Nếu resume lỗi, khởi động lại hoàn toàn
                await restart();
            }
        }
    }
    

    // Xử lý nội dung QR
    async function onScan(qrText) {
        if (window.daQuet) return; // Chặn nếu đang xử lý
        window.daQuet = true;
        
        // Tạm dừng camera ngay lập tức
        if (scanner && scanning) {
            await scanner.pause(true); // Tham số true để ngắt luồng xử lý video
        }
        
        Debug.write("Controller", "Camera đã pause sau khi quét");
        if (Utils.vibrate) Utils.vibrate(100);
        
        // Gọi controller xử lý logic
        await AttendanceController.onQRCode(qrText);
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
