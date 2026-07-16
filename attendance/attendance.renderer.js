//======================================
// ATTENDANCE RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceRenderer = (()=>{

    //==================================
    // HOME
    //==================================

    function hideHome(){

        const home = qs(".home");

        if(home){

            home.style.display = "none";

        }

    }

    function showHome(){

        const home = qs(".home");

        if(home){

            home.style.display = "";

            Renderer.show(home);

        }

    }

    //==================================
    // SCANNER
    //==================================

    function showScanner(){

        Renderer.show(

            Utils.id("scannerBox")

        );

    }

    function hideScanner(){

        Renderer.hide(

            Utils.id("scannerBox")

        );

    }

    //==================================
    // TITLE
    //==================================

    function renderType(loai){

        renderText(

            "typeTitle",

            "Điểm danh: " + loai

        );

    }

    //==================================
    // TODAY COUNT
    //==================================

    function renderTodayCount(total){

        renderText(

            "todayCount",

            "Đã điểm danh hôm nay: "

            + total

            + " em"

        );

    }

    //==================================
    // PUBLIC
    //==================================

    return{

        hideHome,

        showHome,

        showScanner,

        hideScanner,

        renderType,

        renderTodayCount

    };

})();
