//======================================
// GIÁO XỨ PHÚ HÒA
// APP CORE
//======================================

"use strict";


//======================================
// API
//======================================

const API_URL =
"https://script.google.com/macros/s/AKfycbwK1pWbhW1MBbcNunsN1edGWkV7PPKUrL7s0mPqHbQArFHM57vn29MZou6kvSvaS82AeQ/exec";


//======================================
// APP
//======================================

const APP_VERSION = "1.0.0";

const STORAGE_VERSION = "phuhoa_version";

const OFFLINE_QUEUE_KEY = "attendance_queue";


//======================================
// GLOBAL
//======================================

let scanner = null;

let loaiDiemDanh = "";

let dangXuLy = false;

let tongHomNay = 0;

let deferredPrompt = null;


//======================================
// APP START
//======================================

window.addEventListener(

    "load",

    ()=>{

        console.log(

            "================================"

        );

        console.log(

            "GIÁO XỨ PHÚ HÒA"

        );

        console.log(

            "QR Attendance"

        );

        console.log(

            "Version:",

            APP_VERSION

        );

        console.log(

            "================================"

        );

    }

);
