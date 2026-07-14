//======================================
// GIÁO XỨ PHÚ HÒA
// APP CORE
//======================================

"use strict";





//======================================
// APP
//======================================


const STORAGE_VERSION = "phuhoa_version";

const OFFLINE_QUEUE_KEY = "attendance_queue";




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

        renderQueueBadge();

    }

);





//======================================
// CAMERA CALLBACK
//======================================

window.onQRCode = function(text){

    guiDiemDanh(text);

};
