//======================================
// CAMERA
//======================================

"use strict";


//======================================
// BẮT ĐẦU CAMERA
//======================================

async function startCamera(){

    if(App.scanner){

        try{

            await window.scanner.stop();

            App.scanner.clear();

        }catch(err){

            console.log(err);

        }

    }

    App.scanner = new Html5Qrcode("reader");

    try{

        await App.scanner.start(

            {

                facingMode:"environment"

            },

            {

                fps:10,

                qrbox:{

                    width:220,

                    height:220

                },

                rememberLastUsedCamera:true,

                disableFlip:true

            },

            qrSuccess

        );

    }catch(err){

        alert(

            "Không mở được camera.\n\n"

            + err

        );

    }

}


//======================================
// Pause Camera
//======================================

async function pauseCamera(){

    if(!App.scanner){

        return;

    }

    try{

        await App.scanner.pause(true);

    }

    catch(err){

        console.error(err);

    }

}




//======================================
// Resume Camera
//======================================

async function resumeCamera(){

    if(!App.scanner){

        return;

    }

    try{

        await App.scanner.resume();

    }

    catch(err){

        console.error(err);

    }

}





//======================================
// Stop Camera
//======================================

async function stopCamera(){

    if(!App.scanner){

        return;

    }

    try{

        await App.scanner.stop();

        App.scanner.clear();

    }

    catch(err){

        console.error(err);

    }

    App.scanner = null;

}








//======================================
// QUAY LẠI
//======================================

async function backHome(){

    await stopCamera();

    dangXuLy = false;

    document
        .querySelector(".home")
        .style.display = "block";

    document
        .getElementById("scannerBox")
        .classList.add("hidden");

}



//======================================
// KHỞI ĐỘNG CAMERA KHI ĐỔI TAB
//======================================

document.addEventListener(

    "visibilitychange",

    async()=>{

        if(document.hidden){

            return;

        }

        if(

            App.scanner &&

            !document

                .getElementById("scannerBox")

                .classList.contains("hidden")

        ){

            try{

                await App.scanner.resume();

            }catch(err){

                console.log(err);

            }

        }

    }

);



//======================================
// QR SUCCESS
//======================================

function qrSuccess(text){

    if(dangXuLy){

        return;

    }

    dangXuLy = true;

    pauseCamera();

    if(navigator.vibrate){

        navigator.vibrate(50);

    }

    if(typeof window.onQRCode === "function"){

        window.onQRCode(text);

    }

}


console.log("camera.js loaded");
