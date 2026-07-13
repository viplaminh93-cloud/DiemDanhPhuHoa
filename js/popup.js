//======================================
// POPUP
//======================================

"use strict";


//======================================
// HIỂN THỊ POPUP
//======================================

function hienThi(data){

    resetPopup();

    renderPopup(data);

    renderTitle(data);

    renderHint();

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

    id("overlay")

        .classList.remove("hidden");

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

console.log("popup.js loaded");
