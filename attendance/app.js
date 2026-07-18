//======================================
// ATTENDANCE APP - Giáo xứ Phú Hòa
//======================================
"use strict";

// Đợi trang tải xong để khởi tạo app
window.addEventListener("load", initializeAttendance);



/**
 * Khởi tạo ứng dụng: Log thông tin, render queue và PWA
 */
function initializeAttendance() {
    console.log("=== APP START ===");
    console.log(Config.APP.PARISH, Config.APP.NAME, "Version:", Version.VERSION);

    // Render badge điểm danh ngoại tuyến nếu service khả dụng
    if (typeof OfflineService !== "undefined") {
        OfflineService.renderQueueBadge();
    }

    initializePWA();
}




//======================================
// PWA INSTALLATION
//======================================
let installPrompt = null;

// Lắng nghe sự kiện trình duyệt gợi ý cài đặt PWA
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    Renderer.show("installBtn"); // Hiển thị nút cài đặt
});

/**
 * Gắn sự kiện click cho nút cài đặt
 */
function initializePWA() {
    const button = Utils.id("installBtn");
    if (button) {
        button.addEventListener("click", installApplication);
    }
}

/**
 * Thực hiện prompt cài đặt PWA
 */
async function installApplication() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
        Renderer.hide("installBtn");
    }
    installPrompt = null;
}





//======================================
// SERVICE WORKER REGISTRATION
//======================================
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("../service-worker.js")
            .then(reg => console.log("Service Worker OK", reg))
            .catch(console.error);
    });
}
