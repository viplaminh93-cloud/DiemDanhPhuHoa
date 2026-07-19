//======================================
// REPORT SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportService = (()=>{

    //----------------------------------
    // LOAD
    //----------------------------------

    async function load() {
        const token = Auth.getToken();
        const body = { action: "report", token };
    
        const response = await fetch(Config.API.URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(body)
        });
    
        // --- BẮT LỖI TẠI ĐÂY ---
        const text = await response.text(); // Đọc dạng chữ trước
        console.log("Phản hồi thô từ server:", text);
        
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("Lỗi: Server không trả về JSON hợp lệ:", text);
            return { success: false, message: "Server trả về dữ liệu lỗi." };
        }
    }

    //----------------------------------

    return{

        load

    };

})();
