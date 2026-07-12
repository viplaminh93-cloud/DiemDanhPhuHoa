//======================================
// POPUP
//======================================

"use strict";


//======================================
// HIỂN THỊ POPUP
//======================================

function hienThi(data){

    resetPopup();

    renderTitle(data);

    showPopup();

}




//======================================
// RESET
//======================================

function resetPopup(){

    const overlay = id("overlay");

    if(!overlay){

        return;

    }

    overlay.classList.add("hidden");

    Object.values(CONFIG.KHOI)
    
        .forEach(khoi=>{
    
            overlay.classList.remove(
    
                khoi.css
    
            );
    
        });

}


//======================================
// TITLE
//======================================

function renderTitle(data){

    const obj = id("overlayTitle");

    if(!obj){

        return;

    }

    if(data.success){

        obj.innerText="✅ ĐIỂM DANH THÀNH CÔNG";

        return;

    }

    if(data.duplicate){

        obj.innerText="⚠️ ĐÃ ĐIỂM DANH";

        return;

    }

    obj.innerText="❌ KHÔNG TÌM THẤY";

}


//======================================
// SHOW
//======================================

function showPopup(){

    id("overlay")

        .classList.remove("hidden");

}




//======================================
// ĐÓNG POPUP
//======================================

function dongPopup(){

    hide(id("overlay"));

    App.dangXuLy = false;

    resumeCamera();

}

console.log("popup.js loaded");
