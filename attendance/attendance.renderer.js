//======================================
// ATTENDANCE RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceRenderer = (()=>{

    //----------------------------------
    // HOME
    //----------------------------------

    function showHome(){

        Renderer.show("homeBox");

        hideScanner();

    }

    function hideHome(){

        Renderer.hide("homeBox");

    }

    //----------------------------------
    // SCANNER
    //----------------------------------

    function showScanner(loai){

        hideHome();

        Renderer.show("scannerBox");

        renderType(loai);

    }

    function hideScanner(){

        Renderer.hide("scannerBox");

    }

    //----------------------------------
    // TYPE
    //----------------------------------

    function renderType(loai){

        Renderer.text(

            "typeTitle",

            "Điểm danh: " + loai

        );

    }

    //----------------------------------
    // TODAY COUNTER
    //----------------------------------

    function renderTodayCounter(total){

        Renderer.text(

            "todayCount",

            "Đã điểm danh hôm nay: " + total + " em"

        );

    }

    //----------------------------------
    // RESET
    //----------------------------------

    function reset(){

        renderType("");

        renderTodayCounter(0);

    }

    //----------------------------------

    return{

        showHome,

        hideHome,

        showScanner,

        hideScanner,

        renderType,

        renderTodayCounter,

        reset

    };

})();
