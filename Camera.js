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
// QR SUCCESS
//======================================

function qrSuccess(decodedText){

    if(dangXuLy){

        return;

    }

    dangXuLy = true;

    if(scanner){

        scanner.pause(true);

    }

    if(navigator.vibrate){

        navigator.vibrate(50);

    }

    guiDiemDanh(decodedText);

}



//======================================
// QUAY LẠI
//======================================

async function backHome(){

    try{

        if(scanner){

            await dongBoQueue();

            await scanner.stop();

            scanner.clear();

            scanner = null;

        }

    }catch(err){

        console.log(err);

    }

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



console.log("camera.js loaded");
