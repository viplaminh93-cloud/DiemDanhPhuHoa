//======================================
// ATTENDANCE RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceRenderer = (()=>{

    /**
     * ======================================
     * HOME
     * ======================================
     */

    function hideHome(){

        const home = document.querySelector(".home");

        if(home){

            Renderer.hide(home);

        }

    }

    function showHome(){

        const home = document.querySelector(".home");

        if(home){

            Renderer.show(home);

        }

        hideScanner();

    }

    /**
     * ======================================
     * SCANNER
     * ======================================
     */

    function showScanner(loai){

        hideHome();

        renderType(loai);

        Renderer.show(

            Utils.id("scannerBox")

        );

    }

    function hideScanner(){

        Renderer.hide(

            Utils.id("scannerBox")

        );

    }

    /**
     * ======================================
     * TITLE
     * ======================================
     */

    function renderType(loai){

        Utils.id("typeTitle").innerText =

            "Điểm danh: " + loai;

    }

    /**
     * ======================================
     * TODAY COUNTER
     * ======================================
     */

    function renderTodayCounter(total){

        Utils.id("todayCount").innerText =

            "Đã điểm danh hôm nay: "

            + total

            + " em";

    }

    return{

        hideHome,

        showHome,

        showScanner,

        hideScanner,

        renderType,

        renderTodayCounter

    };

})();
