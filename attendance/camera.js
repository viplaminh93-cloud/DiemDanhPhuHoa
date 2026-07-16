//======================================
// CAMERA
//======================================

"use strict";

Auth.requireLogin();
//======================================
// BẮT ĐẦU CAMERA
//======================================

async function startCamera(){

    debug(
    
        MODULE.CAMERA,
    
        "Start camera"
    
    );    

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
        
                    rememberLastUsedCamera:CONFIG.CAMERA.REMEMBER_CAMERA,
                    
                    disableFlip:CONFIG.CAMERA.DISABLE_FLIP
        
            },
        
            qrSuccess
        
        );

        debug(
        
            MODULE.CAMERA,
        
            "Camera started"
        
        );        

    }catch(err){

    debug(
    
        MODULE.CAMERA,
    
        "Camera error: " + err
    
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

    debug(
    
        MODULE.CAMERA,
    
        "Pause camera"
    
    );    

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

    debug(
    
        MODULE.CAMERA,
    
        "Resume camera"
    
    );

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

    debug(
        MODULE.CAMERA,
        "Stop camera"
    );

    if(!App.scanner){

        return;

    }

    try{

        await App.scanner.stop();

    }
    catch(err){

        console.log(err);

    }

    try{

        App.scanner.clear();

    }
    catch(err){

        console.log(err);

    }

    id("reader").innerHTML = "";

    App.scanner = null;

}




//======================================
// QUAY LẠI
//======================================

async function backHome(){

    debug(
        MODULE.APP,
        "BackHome 1"
    );
    
    hide(id("scannerBox"));
    
    debug(
        MODULE.APP,
        "BackHome 2"
    );

    qs(".home").style.display = "";
    
    show(qs(".home"));
    
    debug(
        MODULE.APP,
        "BackHome 3"
    );

    App.dangXuLy = false;

    await stopCamera();

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

            !isHidden(id("scannerBox"))

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

    debug(
    
        MODULE.CAMERA,
    
        "QR scanned: " + text
    
    );
    
    App.dangXuLy = true;

    await pauseCamera();

    vibrate();

    if(typeof App.onQRCode !== "function"){

        App.dangXuLy = false;

        return;

    }

    await App.onQRCode(text);

}
