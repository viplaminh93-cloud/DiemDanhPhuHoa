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
 * Không thao tác Html5Qrcode trực tiếp.
 * ======================================
 */

window.daQuet = false;

/**
 * ======================================
 * START CAMERA
 * ======================================
 */

async function startCamera(){

    window.daQuet = false;

    await CameraService.start(

        qrSuccess

    );

}

/**
 * ======================================
 * STOP CAMERA
 * ======================================
 */

async function stopCamera(){

    await CameraService.stop();

}

/**
 * ======================================
 * PAUSE CAMERA
 * ======================================
 */

async function pauseCamera(){

    await CameraService.pause();

}

/**
 * ======================================
 * RESUME CAMERA
 * ======================================
 */

async function resumeCamera(){

    window.daQuet = false;

    await CameraService.resume();

}

/**
 * ======================================
 * QR SUCCESS
 * ======================================
 */

async function qrSuccess(qrText){

    //----------------------------------
    // Chống quét liên tục
    //----------------------------------

    if(window.daQuet){

        return;

    }

    window.daQuet = true;

    //----------------------------------
    // Dừng Camera
    //----------------------------------

    await pauseCamera();

    //----------------------------------
    // Rung
    //----------------------------------

    if(navigator.vibrate){

        navigator.vibrate(100);

    }

    //----------------------------------
    // Gửi Attendance
    //----------------------------------

    try{

        if(

            typeof AttendanceController !== "undefined"

            &&

            typeof AttendanceController.onQRCode === "function"

        ){

            await AttendanceController.onQRCode(

                qrText

            );

        }

    }

    catch(error){

        console.error(error);

        window.daQuet = false;

        await resumeCamera();

    }

}

/**
 * ======================================
 * TAB ACTIVE
 * ======================================
 */

document.addEventListener(

    "visibilitychange",

    async()=>{

        if(document.hidden){

            return;

        }

        if(

            CameraService.exists()

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
