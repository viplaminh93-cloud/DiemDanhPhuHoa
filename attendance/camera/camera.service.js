//======================================
// CAMERA SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * CAMERA SERVICE
 * Chỉ giao tiếp với Html5Qrcode
 * Không xử lý API
 * Không xử lý Popup
 * ======================================
 */

const CameraService = (() => {

    let scanner = null;

    //======================================
    // START
    //======================================

    async function start(onSuccess){

        debug(
            MODULE.CAMERA,
            "Start camera"
        );

        if(scanner){

            await stop();

        }

        scanner = new Html5Qrcode("reader");

        await scanner.start(

            {
                facingMode: CONFIG.CAMERA.FACING_MODE
            },

            {

                fps: CONFIG.CAMERA.FPS,

                qrbox:{
                    width:CONFIG.CAMERA.WIDTH,
                    height:CONFIG.CAMERA.HEIGHT
                },

                rememberLastUsedCamera:
                    CONFIG.CAMERA.REMEMBER_CAMERA,

                disableFlip:
                    CONFIG.CAMERA.DISABLE_FLIP

            },

            onSuccess

        );

        debug(
            MODULE.CAMERA,
            "Camera started"
        );

    }

    //======================================
    // STOP
    //======================================

    async function stop(){

        if(!scanner){

            return;

        }

        try{

            await scanner.stop();

        }

        catch(err){

            console.error(err);

        }

        try{

            scanner.clear();

        }

        catch(err){

            console.error(err);

        }

        scanner = null;

        id("reader").innerHTML = "";

        debug(
            MODULE.CAMERA,
            "Camera stopped"
        );

    }

    //======================================
    // PAUSE
    //======================================

    async function pause(){

        if(!scanner){

            return;

        }

        try{

            await scanner.pause(true);

        }

        catch(err){

            console.error(err);

        }

    }

    //======================================
    // RESUME
    //======================================

    async function resume(){

        if(!scanner){

            return;

        }

        try{

            await scanner.resume();

        }

        catch(err){

            console.error(err);

        }

    }

    //======================================
    // EXIST
    //======================================

    function exists(){

        return scanner !== null;

    }

    //======================================

    return{

        start,
        stop,
        pause,
        resume,
        exists

    };

})();
