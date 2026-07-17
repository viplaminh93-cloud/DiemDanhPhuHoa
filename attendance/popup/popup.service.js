//======================================
// POPUP SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const PopupService = (()=>{

    //----------------------------------
    // SHOW
    //----------------------------------

    function show(data){

        debug(

            MODULE.POPUP,

            "Show Popup"

        );

        PopupRenderer.reset();

        PopupRenderer.renderStudent(data);

        PopupRenderer.renderTitle(data);

        PopupRenderer.renderHint();

        PopupRenderer.show();

    }

    //----------------------------------
    // CLOSE
    //----------------------------------

    async function close(){

        debug(

            MODULE.POPUP,

            "Close Popup"

        );

        PopupRenderer.hide();

        await Utils.sleep(150);

        window.daQuet = false;

        await resumeCamera();

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        show,

        close

    };

})();

//======================================
// CLICK OVERLAY
//======================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        const overlay =

            Utils.id("overlay");

        if(!overlay){

            return;

        }

        overlay.addEventListener(

            "click",

            ()=>{

                AttendanceController.closePopup();

            }

        );

    }

);
