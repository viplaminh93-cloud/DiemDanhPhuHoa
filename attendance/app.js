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
        
            APP_VERSION.VERSION
        
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



//======================================
// INSTALL PWA
//======================================

let installPrompt = null;



//======================================
// BEFORE INSTALL
//======================================

window.addEventListener(

    "beforeinstallprompt",

    event=>{

        event.preventDefault();

        installPrompt = event;

        show(

            id("installBtn")

        );

        debug(

            MODULE.APP,

            "Install available"

        );

    }

);



//======================================
// INSTALL BUTTON
//======================================

window.addEventListener(

    "load",

    ()=>{

        id("installBtn")

        .addEventListener(

            "click",

            async()=>{

                if(!installPrompt){

                    return;

                }

                installPrompt.prompt();

                await installPrompt.userChoice;

                installPrompt = null;

                hide(

                    id("installBtn")

                );

            }

        );

    }

);
