/**
 * ======================================
 * CAMERA SERVICE & CONTROLLER
 * Tích hợp Html5Qrcode và điều khiển logic
 * ======================================
 */
"use strict";

const CameraController = {
    camerastart: async function() {
        Debug.write("Đang bắt đầu khởi tạo camera...");
        
        // Kiểm tra xem Html5Qrcode đã được load chưa
        if (typeof Html5Qrcode === 'undefined') {
            Debug.write("Thư viện Html5Qrcode chưa được load!");
            return;
        }

        const scanner = new Html5Qrcode("scannerBox"); // ID của thẻ div chứa camera
        
        try {
            await scanner.start(
                { facingMode: "environment" }, 
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => {
                    Debug.write("Quét thành công:", decodedText);
                    // alert("Kết quả: " + decodedText);
                },
                (err) => {
                    // console.log("Lỗi quét:", err);
                }
            );
            Debug.write("Camera đã chạy thành công!");
        } catch (err) {
            Debug.write("Lỗi bật camera:", err);
            alert("Không thể bật camera: " + err.message);
        }
    }
};

window.CameraController = CameraController;
/*
// 3. Camera Controller: Điều khiển luồng nghiệp vụ
const CameraController = (() => {
    let scanning = false;


    let scanner = null; 

    async function camerastart() {
        console.log("Đang thực hiện khởi tạo camera...");
        
        // 1. Khởi tạo đối tượng camera
        scanner = new Html5Qrcode("reader");

        // 2. Cấu hình và start
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        
        try {
            await scanner.start(
                { facingMode: "environment" }, 
                config,
                (decodedText) => {  Xử lý khi quét thành công  },
                (errorMessage) => {  Xử lý khi lỗi  }
            );
            Debug.write("Camera đã chạy thành công!");
        } catch (err) {
            throw new Debug.write("Không thể bật camera: " + err);
        }
    }

    return { camerastart };
//})();

    async function start(loai) {

        // 1. Kiểm tra thiết bị (Chỉ cho phép iOS hoặc Android)
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        if (!isMobile) {
            location.href = "../attendance/attendance.html";
            alert("Chức năng quét QR chỉ dành cho điện thoại (iOS/Android). Vui lòng sử dụng điện thoại để điểm danh.");
            return;
        } 
    let processing = false; 
        try {
 
            processing = false;
            AttendanceService.setCurrentType(loai);
    //        AttendanceRenderer.showScanner(loai);
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const total = await AttendanceService.getTodayCounter();
            AttendanceRenderer.renderTodayCounter(total);
            
            await CameraController.start();
        } catch (e) {
            console.error("Lỗi khởi tạo:", e);
            alert("Lỗi camera: " + e.message);
        }
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
*/
