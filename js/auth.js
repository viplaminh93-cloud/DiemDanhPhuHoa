"use strict";

/**
 * ======================================
 * AUTH CLIENT
 * ======================================
 */

const Auth = (() => {

    const TOKEN_KEY = "attendance_token";

    //----------------------------------
    // Save
    //----------------------------------

    function save(token){

        localStorage.setItem(

            TOKEN_KEY,

            token

        );

    }

    //----------------------------------
    // Load
    //----------------------------------

    function token(){

        return localStorage.getItem(

            TOKEN_KEY

        ) || "";

    }

    //----------------------------------
    // Remove
    //----------------------------------

    function logout(){

        localStorage.removeItem(

            TOKEN_KEY

        );

    }

    //----------------------------------
    // Login
    //----------------------------------

    async function login(email){

        const response = await fetch(

            CONFIG.API.URL,

            {

                method:"POST",

                headers:{

                    "Content-Type":"text/plain;charset=utf-8"

                },

                body:JSON.stringify({

                    action:"login",

                    email:email

                })

            }

        );

        const result = await response.json();

        if(result.success){

            save(result.token);

        }

        return result;

    }

    //----------------------------------
    // Request
    //----------------------------------

    async function post(body){

        body.token = token();

        const response = await fetch(

            CONFIG.API.URL,

            {

                method:"POST",

                headers:{

                    "Content-Type":"text/plain;charset=utf-8"

                },

                body:JSON.stringify(body)

            }

        );

        return await response.json();

    }

    //----------------------------------

    return{

        login,

        logout,

        token,

        post

    };

})();
