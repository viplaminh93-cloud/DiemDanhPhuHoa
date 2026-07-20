//======================================
// ATTENDANCE APP - Giáo xứ Phú Hòa
//======================================
"use strict";

// Chỉ để 1 lần duy nhất lắng nghe sự kiện trang tải



window.addEventListener("load", () => {
    console.log("=== APP START ==="); 
    console.log(Config.APP.PARISH, Config.APP.NAME, "Version:", Version.VERSION); 
    
//    initializePWA(); // Khởi động đồng bộ offline 
    
    if (typeof OfflineService !== "undefined") { 
        OfflineService.renderQueueBadge(); 
        OfflineService.sync(); } 
    
    if ("serviceWorker" in navigator) { 
//            window.addEventListener("load", () => { 
                navigator.serviceWorker 
                .register("../service-worker.js") 
                .then(reg => console.log("Service Worker OK", reg)) 
                .catch(console.error); };
});


/*window.addEventListener("load", () => {       //đoạn này mới mà ko sài được :(((
    initializePWA();
    
    // Khởi động đồng bộ offline
    if (typeof OfflineService !== "undefined") {
        OfflineService.renderQueueBadge();
        OfflineService.sync(); 
    }
    // SERVICE WORKER REGISTRATION
    if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/service-worker.js");
    } 
    });*/

    



// Lắng nghe trạng thái mạng (chỉ cần ở đây, không cần trong offline.js nữa)
window.addEventListener("online", () => {
    console.log("Network online. Syncing...");
    if (typeof OfflineService !== "undefined") {
        OfflineService.sync();
    }
});



/**
 * Khởi tạo ứng dụng: Log thông tin, render queue và PWA
 */
function initializeAttendance() {
    // Render badge điểm danh ngoại tuyến nếu service khả dụng
    if (typeof OfflineService !== "undefined") {
        OfflineService.renderQueueBadge();
    }

    initializePWA();
}
