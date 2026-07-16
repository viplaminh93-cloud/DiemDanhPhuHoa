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

//======================================
// LOGIN RENDERER
//======================================

const LoginRenderer = (()=>{

    /**
     * Hiển thị lỗi
     */
    function showError(message){

        alert(message);

    }

    /**
     * Loading Button
     */
    function setLoading(loading){

        const button = Utils.id("btnLogin");

        if(!button){

            return;

        }

        button.disabled = loading;

        button.innerText = loading

            ? "ĐANG ĐĂNG NHẬP..."

            : "ĐĂNG NHẬP";

    }

    return{

        showError,

        setLoading

    };

})();
