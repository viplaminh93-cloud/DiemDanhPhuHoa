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

    // Tạm dừng và làm sạch màn hình
/*    async function pause() {
        if (scanner && scanning) {
            scanner.pause();
            
            const videoElement = document.querySelector("#reader video");
            if (videoElement) {
                videoElement.style.display = "none"; 
            }
            Debug.write("Camera đã tạm dừng và ẩn hình ảnh.");
        }
    }
    
    // Tiếp tục và hiển thị lại hình ảnh
    async function resume() {
        if (scanner && scanning) {
            scanner.resume();
            
            // Hiện lại hình ảnh
            const videoElement = document.querySelector("#reader video");
            if (videoElement) {
                videoElement.style.display = "block";
            }
            Debug.write("Camera đã tiếp tục.");
        }
    }*/


    async function pause() {
        if (scanner && scanning) {
            scanner.pause();
            // Thay vì display: none, hãy ẩn lớp video element bên trong
            const videoElement = document.querySelector("#reader video");
            if (videoElement) {
                videoElement.style.opacity = "0"; // Vẫn giữ layout, nhưng làm mờ hoàn toàn
            }
        }
    }
    
    async function resume() {
        if (scanner && scanning) {
            scanner.resume();
            const videoElement = document.querySelector("#reader video");
            if (videoElement) {
                videoElement.style.opacity = "1"; // Hiện lại
            }
        }
    }
    

    // Xử lý nội dung QR
    async function onScan(qrText) {
        if (window.daQuet) return;
        window.daQuet = true;
    
        await CameraController.pause(); 
        Debug.write("Controller", "Camera đã dừng hẳn sau khi quét");
    
        if (Utils.vibrate) Utils.vibrate(100);
    
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
