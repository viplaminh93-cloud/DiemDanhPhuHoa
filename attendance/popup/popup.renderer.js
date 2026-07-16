//======================================
// POPUP RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * POPUP RENDERER
 *
 * Chỉ render giao diện.
 * Không xử lý business.
 * ======================================
 */

const PopupRenderer = (()=>{

    //======================================
    // RESET
    //======================================

    function reset(){

        const overlay = Utils.id("overlay");

        if(!overlay){

            return;

        }

        overlay.classList.add("hidden");

        Object.values(Config.KHOI)

            .forEach(item=>{

                overlay.classList.remove(

                    item.css

                );

            });

    }

    //======================================
    // TITLE
    //======================================

    function renderTitle(data){

        const obj = Utils.id("overlayTitle");

        if(!obj){

            return;

        }

        if(data.success){

            obj.innerText =
                "✅ ĐIỂM DANH THÀNH CÔNG";

            return;

        }

        if(data.offline){

            obj.innerText =
                "📴 ĐÃ LƯU OFFLINE";

            return;

        }

        if(data.duplicate){

            obj.innerText =
                "⚠️ ĐÃ ĐIỂM DANH";

            return;

        }

        obj.innerText =
            "❌ KHÔNG TÌM THẤY";

    }

    //======================================
    // STUDENT
    //======================================

    function renderStudent(student){

        renderStudentName(student);

        renderStudentKhoi(student);

        renderStudentClass(student);

        renderStudentCode(student);

        renderStudentPhoto(student);

    }

    //======================================
    // HINT
    //======================================

    function renderHint(){

        Utils.id("overlayHint").innerText =

            CONFIG.POPUP.HINT;

    }

    //======================================
    // SHOW
    //======================================

    function show(){

        Utils.id("overlay")

            .classList

            .remove("hidden");

    }

    //======================================
    // HIDE
    //======================================

    function hide(){

        Utils.id("overlay")

            .classList

            .add("hidden");

    }

    //======================================

    return{

        reset,

        renderTitle,

        renderStudent,

        renderHint,

        show,

        hide

    };

})();
