//======================================
// CAMERA SERVICE
//======================================

"use strict";

const CameraService = (()=>{

    let scanner = null;

    let started = false;

    let paused = false;

    let readerId = "reader";

    //----------------------------------
    // CREATE
    //----------------------------------

    function create(){

        if(scanner){

            return;

        }

        scanner = new Html5Qrcode(readerId);

    }

    //----------------------------------
    // START
    //----------------------------------

    async function start(onSuccess){

        if(started){

            return;

        }

        create();

        await scanner.start(

            {

                facingMode:"environment"

            },

            {

                fps:10,

                qrbox:{

                    width:250,

                    height:250

                },

                rememberLastUsedCamera:true,

                disableFlip:false

            },

            decodedText=>{

                onSuccess(decodedText);

            },

            ()=>{}

        );

        started = true;

        paused = false;

    }

    //----------------------------------
    // PAUSE
    //----------------------------------

    async function pause(){

        if(

            !scanner ||

            !started ||

            paused

        ){

            return;

        }

        scanner.pause(true);

        paused = true;

    }

    //----------------------------------
    // RESUME
    //----------------------------------

    async function resume(){

        if(

            !scanner ||

            !started ||

            !paused

        ){

            return;

        }

        scanner.resume();

        paused = false;

    }

    //----------------------------------
    // STOP
    //----------------------------------

    async function stop(){

        if(

            !scanner ||

            !started

        ){

            destroy();

            return;

        }

        try{

            if(paused){

                scanner.resume();

                paused = false;

            }

        }catch(e){}

        try{

            await scanner.stop();

        }catch(e){}

        destroy();

    }

    //----------------------------------
    // DESTROY
    //----------------------------------

    function destroy(){

        try{

            if(scanner){

                scanner.clear();

            }

        }catch(e){}

        scanner = null;

        started = false;

        paused = false;

        const reader = document.getElementById(readerId);

        if(reader){

            reader.innerHTML = "";

        }

    }

    //----------------------------------
    // STATUS
    //----------------------------------

    function exists(){

        return scanner !== null;

    }

    function isStarted(){

        return started;

    }

    function isPaused(){

        return paused;

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        start,

        stop,

        pause,

        resume,

        exists,

        isStarted,

        isPaused

    };

})();
