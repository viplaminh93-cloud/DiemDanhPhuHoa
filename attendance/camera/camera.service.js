//======================================
// CAMERA CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * CAMERA CONTROLLER
 *
 * Điều khiển Camera.
 * Không làm việc với Html5Qrcode.
 * ======================================
 */

window.daQuet = false;

//======================================
// START
//======================================

async function startCamera(){

    window.daQuet = false;

    await CameraService.start(

        qrSuccess

    );

}

//======================================
// STOP
//======================================

async function stopCamera(){

    window.daQuet = false;

    await CameraService.stop();

}

//======================================
// PAUSE
//======================================

async function pauseCamera(){

    await CameraService.pause();

}

//======================================
// RESUME
//======================================

async function resumeCamera(){

    window.daQuet = false;

    await CameraService.resume();

}

//======================================
// BACK HOME
//======================================

async function backHome(){

    await AttendanceController.backHome();

}

//======================================
// QR SUCCESS
//======================================

async function qrSuccess(qrText){

    //----------------------------------
    // Chống quét liên tục
    //----------------------------------

    if(window.daQuet){

        return;

    }

    window.daQuet = true;

    //----------------------------------
    // Pause Camera
    //----------------------------------

    await pauseCamera();

    //----------------------------------
    // Rung
    //----------------------------------

    if(navigator.vibrate){

        navigator.vibrate(100);

    }

    //----------------------------------
    // Gửi Controller
    //----------------------------------

    try{

        await AttendanceController.onQRCode(

            qrText

        );

    }

    catch(error){

        console.error(error);

        window.daQuet = false;

        await resumeCamera();

    }

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

            !window.daQuet

        ){

            try{

                await resumeCamera();

            }

            catch(error){

                console.error(error);

            }

        }

    }

);
