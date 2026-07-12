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
    
            await App.scanner.stop();
    
        }catch(err){
    
            console.log(err);
    
        }
    
        try{
    
            App.scanner.clear();
    
        }catch(err){
    
            console.log(err);
    
        }
    
    }

    App.scanner = new Html5Qrcode("reader");

    try{

        await App.scanner.start(
        
            {
        
                facingMode:CONFIG.CAMERA.FACING_MODE
        
            },
        
            {
        
                fps:CONFIG.CAMERA.FPS,
        
                qrbox:{
        
                    width:CONFIG.CAMERA.WIDTH,
        
                    height:CONFIG.CAMERA.HEIGHT
        
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
// STOP CAMERA
//======================================

async function stopCamera(){

    if(!App.scanner) return;

    try{

        await App.scanner.stop();

    }catch(err){

        console.log(err);

    }

    try{

        App.scanner.clear();

    }catch(err){

        console.log(err);

    }

    App.scanner = null;

}








//======================================
// QUAY LẠI
//======================================

async function backHome(){

    await stopCamera();

    App.dangXuLy = false;

    qs(".home")
        .style.display = "block";

    id("scannerBox")
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

            !id("scannerBox")

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

async function qrSuccess(text){

    if(App.dangXuLy){

        return;

    }

    App.dangXuLy = true;

    await pauseCamera();

    vibrate();

    if(typeof App.onQRCode === "function"){
    
        App.onQRCode(text);
    
    }

}


console.log("camera.js loaded");
