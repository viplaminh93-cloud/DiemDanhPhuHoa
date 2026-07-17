//======================================
// CAMERA CONTROLLER
//======================================

"use strict";

const CameraController = (()=>{

    window.daQuet=false;

    async function start(){

        window.daQuet=false;

        await CameraService.start(qrSuccess);

    }

    async function stop(){

        window.daQuet=false;

        await CameraService.stop();

    }

    async function pause(){

        await CameraService.pause();

    }

    async function resume(){

        window.daQuet=false;

        await CameraService.resume();

    }

    async function qrSuccess(qrText){

        if(window.daQuet){

            return;
        }

        window.daQuet=true;

        await pause();

        if(navigator.vibrate){

            navigator.vibrate(100);

        }

        try{

            await AttendanceController.onQRCode(qrText);

        }

        catch(error){

            console.error(error);

            window.daQuet=false;

            await resume();

        }

    }

    return{

        start,
        stop,
        pause,
        resume

    };

})();

document.addEventListener(

    "visibilitychange",

    async()=>{

        if(document.hidden){

            return;
        }

        if(

            CameraService.exists()

            &&

            CameraService.isPaused()

            &&

            !window.daQuet

        ){

            await CameraController.resume();

        }

    }

);
