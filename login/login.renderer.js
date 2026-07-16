//======================================
// LOGIN RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * LOGIN RENDERER
 * Chỉ cập nhật giao diện
 * Không gọi Server
 * Không xử lý nghiệp vụ
 * ======================================
 */

const LoginRenderer = (()=>{

    /**
     * ======================================
     * Hiện Loading
     * ======================================
     */

    function showLoading(){

        const button = id("btnLogin");

        if(!button){

            return;

        }

        button.disabled = true;

        button.innerText =

            "Đang đăng nhập...";

    }

    /**
     * ======================================
     * Ẩn Loading
     * ======================================
     */

    function hideLoading(){

        const button = id("btnLogin");

        if(!button){

            return;

        }

        button.disabled = false;

        button.innerText =

            "ĐĂNG NHẬP";

    }

    /**
     * ======================================
     * Focus Email
     * ======================================
     */

    function focusEmail(){

        id("txtEmail")?.focus();

    }

    /**
     * ======================================
     * Hiện lỗi
     * ======================================
     */

    function showError(message){

        alert(message);

    }

    return{

        showLoading,
        hideLoading,
        focusEmail,
        showError

    };

})();
