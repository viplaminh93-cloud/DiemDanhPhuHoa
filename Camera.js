//======================
// Camera
//======================

async function startCamera(){

    if(scanner){

        try{

            await scanner.stop();

            scanner.clear();

        }catch(e){}

    }

    scanner = new Html5Qrcode("reader");

    try{

        await scanner.start(

            { facingMode:"environment" },

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

        alert("Không mở được camera\n\n" + err);

    }

}






//======================
// Quét thành công
//======================

function qrSuccess(text){

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

    guiDiemDanh(text);

}






//======================
// Quay lại
//======================

async function backHome(){

    try{

        if(scanner){

            await dongBoQueue();

            await scanner.stop();

            scanner.clear();

            scanner = null;

        }

    }catch(e){}

    dangXuLy = false;

    document
        .querySelector(".home")
        .style.display = "block";

    document
        .getElementById("scannerBox")
        .classList.add("hidden");

}









console.log("camera.js loaded");
