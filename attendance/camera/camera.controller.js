//======================================
// CAMERA CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const CameraController = (()=>{

    let scanning = false;

    //----------------------------------
    // START
    //----------------------------------

    async function start(){

        scanning = true;

        window.daQuet = false;

        await CameraService.start(onScan);

    }

    //----------------------------------
    // STOP
    //----------------------------------

    async function stop(){

        scanning = false;

        window.daQuet = false;

        await CameraService.stop();

    }

    //----------------------------------
    // PAUSE
    //----------------------------------

    async function pause(){

        CameraService.pause();

    }

    //----------------------------------
    // RESUME
    //----------------------------------

    async function resume(){

        if(!scanning){

            return;

        }

        window.daQuet = false;

        CameraService.resume();

    }

    //----------------------------------
    // RESTART
    //----------------------------------

    async function restart(){

        await stop();

        await Utils.sleep(150);

        await start();

    }

    //----------------------------------
    // QR SUCCESS
    //----------------------------------

    async function onScan(qrText){

        if(window.daQuet){

            return;

        }

        window.daQuet = true;

        await pause();

        if(navigator.vibrate){

            navigator.vibrate(100);

        }

        try{

            await AttendanceController.onQRCode(qrText);

        }

        catch(error){

            console.error(error);

            window.daQuet = false;

            await resume();

        }

    }

    //----------------------------------
    // TAB ACTIVE
    //----------------------------------

    document.addEventListener(

        "visibilitychange",

        ()=>{

            if(document.hidden){

                return;

            }

            if(

                scanning &&

                CameraService.exists() &&

                CameraService.isPaused() &&

                !window.daQuet

            ){

                CameraService.resume();

            }

        }

    );

    //----------------------------------

    return{

        start,
        stop,
        pause,
        resume,
        restart

    };

})();
