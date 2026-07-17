//======================================
// POPUP SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const PopupService = (()=>{

    let showing = false;

    //----------------------------------
    // SHOW
    //----------------------------------

    function show(data){

        showing = true;

        PopupRenderer.reset();

        PopupRenderer.renderTitle(data);

        PopupRenderer.renderStudent(data);

        PopupRenderer.renderHint();

        PopupRenderer.show();

    }

    //----------------------------------
    // CLOSE
    //----------------------------------

    async function close(){

        if(!showing){

            return;

        }

        showing = false;

        PopupRenderer.hide();

        await Utils.sleep(150);

        AttendanceController.closePopup();

    }

    //----------------------------------
    // STATUS
    //----------------------------------

    function isShowing(){

        return showing;

    }

    //----------------------------------

    Utils.id("overlay").addEventListener(

        "click",

        close

    );

    //----------------------------------

    return{

        show,

        close,

        isShowing

    };

})();
