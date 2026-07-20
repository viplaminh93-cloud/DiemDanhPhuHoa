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
    // API CŨ (Giữ lại để tương thích với các trang cũ)
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

    //----------------------------------
    // API MỚI (Lịch sử điểm danh toàn cục)
    //----------------------------------
    
    /**
     * Đồng bộ dữ liệu từ Google Sheets về localStorage
     */
    async function syncFromGoogle() {
        return new Promise((resolve) => {
            // Kiểm tra xem google.script có tồn tại không trước khi gọi
            if (typeof google === 'undefined' || !google.script) {
                console.warn("Không có kết nối Google Script, sử dụng cache cũ.");
                return resolve(getHistory());
            }

            google.script.run
                .withSuccessHandler(data => {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                    resolve(data);
                })
                .withFailureHandler(err => {
                    console.error("Lỗi đồng bộ:", err);
                    resolve(getHistory()); // Trả về cache cũ nếu lỗi
                })
                .getAllAttendanceHistory();
        });
    }

    /**
     * Lấy dữ liệu lịch sử từ localStorage
     */
    function getHistory() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Xóa dữ liệu cũ (nếu cần Reset)
     */
    function clearData() {
        localStorage.removeItem(STORAGE_KEY);
    }

    //----------------------------------
    // TRẢ VỀ PUBLIC API
    //----------------------------------
    return { 
        load, 
        syncFromGoogle, 
        getHistory, 
        clearData 
    };
})();
