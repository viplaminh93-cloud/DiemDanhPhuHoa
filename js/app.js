//======================================
// GIÁO XỨ PHÚ HÒA
// APP CORE
//======================================

"use strict";


//======================================
// API
//======================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyjP-G642qpQRfwjNEO4V6yV4uW8_K1BDgwebSYH_YiS46LtTP6BNpkkY8ChK6ihW-QxA/exec";


//======================================
// APP
//======================================


const STORAGE_VERSION = "phuhoa_version";

const OFFLINE_QUEUE_KEY = "attendance_queue";




//======================================
// APP START
//======================================

/* window.addEventListener(

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

);    */





//======================================
// CAMERA CALLBACK
//======================================

window.onQRCode = function(text){

    guiDiemDanh(text);

};
