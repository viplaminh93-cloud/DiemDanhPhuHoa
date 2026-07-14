//======================================
// POPUP
//======================================

"use strict";


//======================================
// HIỂN THỊ POPUP
//======================================

function hienThi(data){

    debug(
        MODULE.POPUP,
        "hienThi() called"
    );

    resetPopup();

        debug(
            MODULE.POPUP,
            "Popup reset"
        );

    renderPopup(data);

        debug(
            MODULE.POPUP,
            "Popup rendered"
        );

    renderTitle(data);

        debug(
            MODULE.POPUP,
            "Title rendered"
        );

    renderHint();

    showPopup();

        debug(
            MODULE.POPUP,
            "Popup visible"
        );

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

    debug(
        MODULE.POPUP,
        "Reset class = " + overlay.className
    );

}


//======================================
// TITLE
//======================================

function renderTitle(data){

    const success = data.success;

    const duplicate = data.duplicate;

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

    const overlay = id("overlay");

    debug(
        MODULE.POPUP,
        "Before remove: " + overlay.className
    );

    overlay.classList.remove("hidden");

    debug(
        MODULE.POPUP,
        "After remove: " + overlay.className
    );

}



//======================================
// ĐÓNG POPUP
//======================================

async function dongPopup(){

    hide(id("overlay"));

    await sleep(150);

    App.dangXuLy = false;

    resumeCamera();

}


//======================================
// CHẠM ĐỂ ĐÓNG
//======================================

id("overlay").addEventListener(

    "click",

    dongPopup

);


//======================================
// HIỂN THỊ HƯỚNG DẪN
//======================================

function renderHint(){

    id("overlayHint").innerText =

        CONFIG.POPUP.HINT;

}






debug(

    "POPUP",

    "popup.js loaded"

);
