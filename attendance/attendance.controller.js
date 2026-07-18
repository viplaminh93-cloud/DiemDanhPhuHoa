/**
 * ======================================
 * ATTENDANCE CONTROLLER
 * Giáo xứ Phú Hòa
 * ======================================
 */
"use strict";

const AttendanceController = (() => {
    
    let processing = false;
    
    async function start(loai) {

        console.log("1. Đã gọi start với:", loai);
        
            try {
                // TỰ ĐỘNG HIỂN THỊ GIAO DIỆN BẰNG DOM GỐC (Bỏ qua module)
                document.getElementById("homeBox").classList.add("hidden");
                document.getElementById("scannerBox").classList.remove("hidden");
                console.log("2. Đã hiển thị scannerBox thủ công");
        
                // GỌI THỬ ATTENDANCE RENDERER
                AttendanceRenderer.showScanner(loai);
                console.log("3. Đã gọi AttendanceRenderer.showScanner");
        
                // GỌI THỬ CAMERA CONTROLLER
                console.log("4. Chuẩn bị gọi CameraController.start");
                await CameraController.start(); 
                console.log("5. CameraController.start đã chạy xong");
        
            } catch (e) {
                console.error("XẢY RA LỖI TẠI:", e);
                alert("Lỗi tại: " + e.message);
            }
        }
        
/*        try {
            processing = false;
            
            Debug.write("Controller", "Bắt đầu start: " + loai);
            AttendanceService.setCurrentType(loai);
           
            AttendanceRenderer.showScanner(loai);
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const total = await AttendanceService.getTodayCounter();
            AttendanceRenderer.renderTodayCounter(total);
            
            Debug.write("Controller", "Đang gọi CameraController.start()");
            await CameraController.start();
            
            Debug.write("Controller", "Camera khởi tạo thành công");
        } catch (e) {
            Debug.write("Controller-ERROR", e.message);
            console.error("LỖI TẠI START:", e);
            alert("Lỗi: " + e.message);
        }*/
    }


    async function onQRCode(qrText) {
        if (processing) return;
        processing = true;
        Debug.write("Controller", "Đang xử lý QR...")
        try {
            const result = await AttendanceService.sendAttendance(qrText);
            if (result.success) {
                const total = await AttendanceService.getTodayCounter();
                AttendanceRenderer.renderTodayCounter(total);
            }
            PopupService.show(result);
        } catch (error) {
            Debug.write("Controller-ERROR", "Lỗi QR: " + error.message);
            processing = false;
            await CameraController.resume();
        }
    }

    async function closePopup() {
        processing = false;
        await PopupService.close();
    }

    async function backHome() {
        Debug.write("Controller", "Quay lại trang chủ");
        processing = false;
        AttendanceService.reset();
        await CameraController.stop();
        AttendanceRenderer.showHome();
    }

    // Đảm bảo có đủ ngoặc đóng cho module pattern
    return { start, onQRCode, closePopup, backHome };
})();
