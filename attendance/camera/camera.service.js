//======================================
// CAMERA SERVICE
//======================================

"use strict";

const CameraService = (() => {

    let scanner = null;
    let paused = false;

    async function start(onSuccess){

        if(scanner){

            await stop();

        }

        scanner = new Html5Qrcode("reader");

        paused = false;

        await scanner.start(

            {
                facingMode:"environment"
            },

            {
                fps:10,
                qrbox:{
                    width:250,
                    height:250
                }
            },

            onSuccess,

            ()=>{}

        );

    }

    async function stop(){

        if(!scanner){

            return;

        }

        try{

            if(paused){

                await scanner.resume();
            }

        }catch(e){}

        try{

            await scanner.stop();

        }catch(e){}

        try{

            await scanner.clear();

        }catch(e){}

        scanner = null;

        paused = false;

        const reader=document.getElementById("reader");

        if(reader){

            reader.innerHTML="";
        }

    }

    async function pause(){

        if(!scanner || paused){

            return;
        }

        try{

            scanner.pause(true);

            paused=true;

        }catch(e){

            console.error(e);

        }

    }

    async function resume(){

        if(!scanner || !paused){

            return;
        }

        try{

            scanner.resume();

            paused=false;

        }catch(e){

            console.error(e);

        }

    }

    function exists(){

        return scanner!==null;

    }

    function isPaused(){

        return paused;

    }

    return{

        start,
        stop,
        pause,
        resume,
        exists,
        isPaused

    };

})();
