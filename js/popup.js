//======================================
// POPUP
//======================================

"use strict";


//======================================
// HIỂN THỊ POPUP
//======================================

function hienThi(data){

    // Luôn reset popup trước
    resetPopup();

    // Kiểm tra dữ liệu nhận được
    console.log("Popup Data:", data);

}


//======================================
// RESET POPUP
//======================================

function resetPopup(){

    const overlay = id("overlay");

    if(!overlay){

        return;

    }

    // Ẩn popup
    overlay.classList.add("hidden");

    // Xóa toàn bộ class màu
    Object.values(CONFIG.KHOI)
    
        .forEach(khoi=>{
    
            overlay.classList.remove(khoi.css);
    
        });

    );

}


console.log("popup.js loaded");
