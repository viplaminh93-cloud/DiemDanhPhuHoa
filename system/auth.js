//======================================
// AUTH
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * AUTH MODULE
 *
 * Quản lý xác thực người dùng.
 *
 * Chức năng:
 * - Login
 * - Logout
 * - Save Token
 * - Get Token
 * - Require Login
 * - Authenticated POST
 *
 * Không chứa UI.
 * Không chứa Business.
 * ======================================
 */

const Auth = (()=>{

    //======================================
    // STORAGE
    //======================================

    const TOKEN_KEY =

        "attendance_token";

    //======================================
    // SAVE TOKEN
    //======================================

    function saveToken(token){

        localStorage.setItem(

            TOKEN_KEY,

            token

        );

    }

    //======================================
    // GET TOKEN
    //======================================

    function getToken(){

        return (

            localStorage.getItem(

                TOKEN_KEY

            ) || ""

        );

    }

    //======================================
    // HAS LOGIN
    //======================================

    function isLogin(){

        return getToken() !== "";

    }

    //======================================
    // LOGIN
    //======================================

    async function login(token){

        saveToken(token);

    }

    //======================================
    // LOGOUT
    //======================================

    function logout(){

        localStorage.removeItem(

            TOKEN_KEY

        );

        location.href =

            "../login/login.html";

    }

    //======================================
    // REQUIRE LOGIN
    //======================================

    function requireLogin(){

        if(isLogin()){

            return true;

        }

        location.href =

            "../login/login.html";

        return false;

    }

    //======================================
    // POST
    //======================================

    async function post(body = {}){

        if(

            body.action !== "login"

        ){

            body.token =

                getToken();

        }

        const response =

            await fetch(

                Config.API.URL,

                {

                    method : "POST",

                    headers : {

                        "Content-Type"

                        :

                        "text/plain;charset=utf-8"

                    },

                    body :

                        JSON.stringify(body)

                }

            );

        return await response.json();

    }

    function getEmail() {
        const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
        return userInfo.email || "";
    }
    
    function getRole() {
        const userInfo = JSON.parse(localStorage.getItem("user_info") || "{}");
        return userInfo.role || "";
    }
    
    //======================================
    // EXPORT
    //======================================

    return{

        login,
        logout,
        post,
        getToken,
        saveToken,
        requireLogin,
        isLogin,
        getEmail,
        getRole

    };

})();
