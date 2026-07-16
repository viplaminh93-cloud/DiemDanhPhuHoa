//======================================
// CAMERA CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * CAMERA CONTROLLER
 * Điều khiển Camera
 * Không thao tác Html5Qrcode trực tiếp
 * ======================================
 */

//======================================
// START CAMERA
//======================================

async function startCamera(){

    await CameraService.start(

        qrSuccess

    );

}

//======================================
// STOP CAMERA
//======================================

async function stopCamera(){

    await CameraService.stop();

}

//======================================
// PAUSE CAMERA
//======================================

async function pauseCamera(){

    await CameraService.pause();

}

//======================================
// RESUME CAMERA
//======================================

async function resumeCamera(){

    await CameraService.resume();

}

//======================================
// BACK HOME
//======================================

async function backHome(){

    debug(
        MODULE.APP,
        "Back Home"
    );

    hide(

        id("scannerBox")

    );

    qs(".home").style.display = "";

    show(

        qs(".home")

    );

    App.dangXuLy = false;

    await stopCamera();

}

//======================================
// QR SUCCESS
//======================================

async function qrSuccess(text){

    if(App.dangXuLy){

        return;

    }

    debug(

        MODULE.CAMERA,

        "QR : " + text

    );

    App.dangXuLy = true;

    await pauseCamera();

    vibrate();

    if(typeof App.onQRCode !== "function"){

        App.dangXuLy = false;

        return;

    }

    await App.onQRCode(text);

}

//======================================
// TAB ACTIVE
//======================================

document.addEventListener(

    "visibilitychange",

    async()=>{

        if(document.hidden){

            return;

        }

        if(

            CameraService.exists()

            &&

            !isHidden(id("scannerBox"))

        ){

            await resumeCamera();

        }

    }

);
