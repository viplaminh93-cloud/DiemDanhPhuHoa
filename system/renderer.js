//======================================
// RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * RENDERER MODULE
 *
 * Quản lý các thao tác render giao diện.
 *
 * Chức năng:
 * - Text
 * - HTML
 * - Image
 * - Value
 * - Class
 * - Show / Hide
 *
 * Không chứa business.
 * Không fetch.
 * ======================================
 */

const Renderer = (()=>{

    //======================================
    // TEXT
    //======================================

    function text(

        elementId,

        value = ""

    ){

        const element =

            Utils.id(elementId);

        if(!element){

            return;

        }

        element.innerText = value;

    }

    //======================================
    // HTML
    //======================================

    function html(

        elementId,

        value = ""

    ){

        const element =

            Utils.id(elementId);

        if(!element){

            return;

        }

        element.innerHTML = value;

    }

    //======================================
    // IMAGE
    //======================================

    function image(

        elementId,

        src = ""

    ){

        const element =

            Utils.id(elementId);

        if(!element){

            return;

        }

        element.src = src;

    }

    //======================================
    // VALUE
    //======================================

    function value(

        elementId,

        value = ""

    ){

        const element =

            Utils.id(elementId);

        if(!element){

            return;

        }

        element.value = value;

    }

    //======================================
    // SHOW
    //======================================

    function show(elementId){

const el = Utils.id(elementId);
    Debug.write("Renderer đang gọi show với ID:", elementId, "và tìm được element:", el);
    
    Utils.show(el);

        
/*        Utils.show(

            Utils.id(elementId)

        ); */

    }

    //======================================
    // HIDE
    //======================================

    function hide(elementId){

        Utils.hide(

            Utils.id(elementId)

        );

    }

    //======================================
    // TOGGLE
    //======================================

    function toggle(elementId){

        Utils.toggle(

            Utils.id(elementId)

        );

    }

    //======================================
    // ADD CLASS
    //======================================

    function addClass(

        elementId,

        className

    ){

        const element =

            Utils.id(elementId);

        if(!element){

            return;

        }

        element.classList.add(

            className

        );

    }

    //======================================
    // REMOVE CLASS
    //======================================

    function removeClass(

        elementId,

        className

    ){

        const element =

            Utils.id(elementId);

        if(!element){

            return;

        }

        element.classList.remove(

            className

        );

    }

    //======================================
    // HAS CLASS
    //======================================

    function hasClass(

        elementId,

        className

    ){

        const element =

            Utils.id(elementId);

        if(!element){

            return false;

        }

        return element.classList.contains(

            className

        );

    }

    //======================================
    // CLEAR
    //======================================

    function clear(

        elementId

    ){

        html(

            elementId,

            ""

        );

    }

    //======================================

    return{

        text,

        html,

        image,

        value,

        show,

        hide,

        toggle,

        addClass,

        removeClass,

        hasClass,

        clear

    };

})();
