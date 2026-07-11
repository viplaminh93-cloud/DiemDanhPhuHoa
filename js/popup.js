//======================================
// POPUP
//======================================

"use strict";


//======================================
// HIỂN THỊ POPUP
//======================================

function hienThi(data){

    resetPopup();

    console.log(data);

}


//======================================
// RESET POPUP
//======================================

function resetPopup(){

    const overlay = id("overlay");

    if(!overlay){

        return;

    }

    overlay.classList.add("hidden");

    overlay.classList.remove(

        "success",

        "warning",

        "error",

        "khaitam",

        "xungtoi",

        "themsuc",

        "songdao",

        "vaodoi"

    );

}


console.log("popup.js loaded");
