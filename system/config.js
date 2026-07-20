"use strict";

/**
 * CONFIG MODULE
 * Cấu hình toàn hệ thống (App, API, Camera, Popup, Offline, Khối, Auth).
 */
const Config = Object.freeze({

    // Thông tin ứng dụng
    APP: Object.freeze({
        NAME: "Điểm danh TNTT",
        PARISH: "Giáo xứ Phú Hòa",
        DEBUG: false
    }),

    // API Endpoint
    API: Object.freeze({
        URL: "https://script.google.com/macros/s/AKfycbwoLY_xGZu8FlqivCam-GHHYg6wusgRYe6q2ZUOHp5SstGH1RH7ht3OEpXXvLbyPrjJhQ/exec"
    }),

    // Cấu hình Camera
    CAMERA: Object.freeze({
        FPS: 10,
        WIDTH: 220,
        HEIGHT: 220,
        VIBRATE: 50,
        FACING_MODE: "environment",
        REMEMBER_CAMERA: true,
        DISABLE_FLIP: true
    }),

    // Cấu hình Popup
    POPUP: Object.freeze({
        AUTO_CLOSE: false,
        DURATION: 3000,
        HINT: "Chạm màn hình để tiếp tục"
    }),

    // Cấu hình Offline
    OFFLINE: Object.freeze({
        STORAGE_KEY: "attendance_queue"
    }),

    // Cấu hình CSS cho các khối
    KHOI: Object.freeze({
        "KHAI TÂM": { css: "khaitam" },
        "XƯNG TỘI": { css: "xungtoi" },
        "THÊM SỨC": { css: "themsuc" },
        "SỐNG ĐẠO": { css: "songdao" },
        "VÀO ĐỜI": { css: "vaodoi" }
    }),

    // Thông tin xác thực (Có thể thay đổi nên không dùng Object.freeze toàn cục)
    AUTH: {
        TOKEN: null,
        EMAIL: null,
        ROLE: null
    }
});
