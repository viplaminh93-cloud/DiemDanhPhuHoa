//======================================
// REPORT SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportService = (()=>{

    //----------------------------------
    // LOAD
       /** 
       * Lấy dữ liệu báo cáo 
       * Tận dụng Auth.post để tự động xử lý token
       */
    //----------------------------------

   
    async function load() {
        try {
            // Auth.post tự động thêm token vào body
            const response = await Auth.post({ action: "report" });
            return response;
        } catch (error) {
            console.error("Lỗi khi gọi ReportService:", error);
            return { success: false, message: "Không thể kết nối đến máy chủ." };
        }
    }

    return { load };
})();
