//======================================
// UTILS
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * UTILS MODULE
 *
 * Chứa các hàm dùng chung toàn hệ thống.
 *
 * Bao gồm:
 * - DOM
 * - UI
 * - Device
 * - Time
 * - String
 * - Object
 * - Console
 *
 * Không chứa business.
 * Không phụ thuộc module khác.
 * ======================================
 */

const Utils = (()=>{

    //======================================
    // DOM
    //======================================

    function id(name){

        return document.getElementById(name);

    }

    function qs(selector){

        return document.querySelector(selector);

    }

    function qsa(selector){

        return document.querySelectorAll(selector);

    }

    function create(tag){

        return document.createElement(tag);

    }

    //======================================
    // UI
    //======================================

    function show(element){

        if(!element){
Debug.write("lỗi 1 show", element);
            return;

        }
Debug.write("lỗi 2 show", element);
        element.classList.remove("hidden");

    }

    function hide(element){

        if(!element){
Debug.write("lỗi 1 hide", element);
            return;

        }
Debug.write("lỗi 1 hide", element);
        element.classList.add("hidden");

    }

    function toggle(element){

        if(!element){

            return;

        }

        element.classList.toggle("hidden");

    }

    function isHidden(element){

        if(!element){

            return true;

        }

        return element.classList.contains(

            "hidden"

        );

    }

    //======================================
    // DEVICE
    //======================================

    function vibrate(

        ms = Config.CAMERA.VIBRATE

    ){

        if(!navigator.vibrate){

            return;

        }

        navigator.vibrate(ms);

    }

    function sleep(ms){

        return new Promise(resolve=>{

            setTimeout(

                resolve,

                ms

            );

        });

    }

    //======================================
    // TIME
    //======================================

    function now(){

        return new Date();

    }

    function formatTime(

        date = new Date()

    ){

        return date.toLocaleTimeString(

            "vi-VN"

        );

    }

    function formatDate(

        date = new Date()

    ){

        return date.toLocaleDateString(

            "vi-VN"

        );

    }

    //======================================
    // STRING
    //======================================

    function upper(text){

        return String(text)

            .toUpperCase();

    }

    function lower(text){

        return String(text)

            .toLowerCase();

    }

    function trim(text){

        return String(text)

            .trim();

    }

    //======================================
    // OBJECT
    //======================================

    function clone(object){

        return structuredClone(

            object

        );

    }

    //======================================
    // CONSOLE
    //======================================

    function log(...args){

        console.log(...args);

    }

    function warn(...args){

        console.warn(...args);

    }

    function error(...args){

        console.error(...args);

    }

    //======================================

    return{

        // DOM
        id,
        qs,
        qsa,
        create,

        // UI
        show,
        hide,
        toggle,
        isHidden,

        // DEVICE
        vibrate,
        sleep,

        // TIME
        now,
        formatTime,
        formatDate,

        // STRING
        upper,
        lower,
        trim,

        // OBJECT
        clone,

        // CONSOLE
        log,
        warn,
        error

    };

})();
