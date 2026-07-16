//======================================
// POPUP SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * POPUP SERVICE
 *
 * Điều khiển Popup.
 * Không render trực tiếp.
 * ======================================
 */

const PopupService = (()=>{

    //======================================
    // SHOW
    //======================================

    function show(data){

        debug(

            MODULE.POPUP,

            "Show popup"

        );

        PopupRenderer.reset();

        PopupRenderer.renderStudent(data);

        PopupRenderer.renderTitle(data);

        PopupRenderer.renderHint();

        PopupRenderer.show();

    }

    //======================================
    // CLOSE
    //======================================

    async function close(){

        PopupRenderer.hide();

        await Utils.sleep(150);

        window.daQuet = false;

        await CameraService.resume()

    }

    //======================================

    return{

        show,

        close

    };

})();


//======================================
// CLICK OVERLAY
//======================================

Utils.id("overlay")

.addEventListener(

    "click",

    PopupService.close

);
