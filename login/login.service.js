//======================================
// LOGIN SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * LOGIN SERVICE
 * Chỉ làm việc với Server
 * Không đụng tới HTML
 * Không xử lý giao diện
 * ======================================
 */

const LoginService = (() => {

    /**
     * ----------------------------------
     * Đăng nhập
     * ----------------------------------
     */
    async function login(email){

        return await Auth.post({

            action : "login",

            email : email

        });

    }

    /**
     * ----------------------------------
     * Lưu Token
     * ----------------------------------
     */
    async function saveToken(token){

        await Auth.login(token);

    }

    return {

        login,
        saveToken

    };

})();
