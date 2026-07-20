//======================================
// REPORT SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportService = (() => {
    //----------------------------------
    // BIẾN NỘI BỘ
    //----------------------------------
    const STORAGE_KEY = 'attendance_history';

    //----------------------------------
    // CÁC HÀM XỬ LÝ (Private)
    //----------------------------------
    async function load() {
        try {
            const response = await Auth.post({ action: "report" });
            return response;
        } catch (error) {
            console.error("Lỗi khi gọi ReportService:", error);
            return { success: false, message: "Không thể kết nối đến máy chủ." };
        }
    }

    async function syncFromGoogle() {
        return new Promise((resolve) => {
            if (typeof google === 'undefined' || !google.script) {
                console.warn("Đang dùng dữ liệu offline.");
                resolve(JSON.parse(localStorage.getItem("APP_DATA") || "{}"));
                return;
            }

            google.script.run
                .withSuccessHandler(data => {
                    localStorage.setItem("APP_DATA", JSON.stringify(data));
                    resolve(data);
                })
                .withFailureHandler(err => {
                    console.error("Lỗi đồng bộ:", err);
                    resolve({});
                })
                .getAppData();
        });
    }

    function getHistory() {
        const data = JSON.parse(localStorage.getItem("APP_DATA") || "{}");
        return data.history || [];
    }

    function clearData() {
        localStorage.removeItem("APP_DATA");
    }

    //----------------------------------
    // TRẢ VỀ CÁC HÀM CÔNG KHAI (Public API)
    //----------------------------------
    return { 
        load, 
        syncFromGoogle, 
        getHistory, 
        clearData 
    };
})();
