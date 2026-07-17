//======================================
// ATTENDANCE CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

Auth.requireLogin();

const AttendanceController = (()=>{

    //----------------------------------
    // Đang xử lý QR
    //----------------------------------

    let processing = false;

    //----------------------------------
    // START
    //----------------------------------

    async function start(loai){

        processing = false;

        await AttendanceService.start(loai);

    }

    //----------------------------------
    // QR SUCCESS
    //----------------------------------

    async function onQRCode(qrText){

        if(processing){

            return;

        }

        processing = true;

        try{

            const result =

                await AttendanceService.sendAttendance(

                    qrText

                );

            //----------------------------------
            // Thành công
            //----------------------------------

            if(result.success){

                AttendanceService.increaseCounter();

            }

            //----------------------------------
            // Popup
            //----------------------------------

            PopupService.show(result);

        }

        catch(error){

            console.error(error);

            processing = false;

            await resumeCamera();

        }

    }

    //----------------------------------
    // CLOSE POPUP
    //----------------------------------

    async function closePopup(){

        processing = false;

        await PopupService.close();

    }

    //----------------------------------
    // BACK HOME
    //----------------------------------

    async function backHome(){

        processing = false;

        PopupRenderer.hide();

        await stopCamera();

        AttendanceRenderer.showHome();

        AttendanceService.reset();

    }

    //----------------------------------
    // Đang xử lý?
    //----------------------------------

    function isProcessing(){

        return processing;

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        start,

        onQRCode,

        closePopup,

        backHome,

        isProcessing

    };

})();
