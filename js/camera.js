//======================================
// CAMERA
//======================================

"use strict";


//======================================
// BẮT ĐẦU CAMERA
//======================================

async function startCamera(){

    if(scanner){

        try{

            await scanner.stop();

            scanner.clear();

        }catch(err){

            console.log(err);

        }

    }

    scanner = new Html5Qrcode("reader");

    try{

        await scanner.start(

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
// Resume Camera
//======================================

async function resumeCamera(){

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
// Stop Camera
//======================================

async function stopCamera(){

    if(!scanner){

        return;

    }

    try{

        await scanner.stop();

        scanner.clear();

    }

    catch(err){

        console.error(err);

    }

    scanner = null;

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

            scanner &&

            !document

                .getElementById("scannerBox")

                .classList.contains("hidden")

        ){

            try{

                await scanner.resume();

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
