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

            show(home);

        }

    }

    //==================================
    // SCANNER
    //==================================

    function showScanner(){

        show(

            id("scannerBox")

        );

    }

    function hideScanner(){

        hide(

            id("scannerBox")

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
