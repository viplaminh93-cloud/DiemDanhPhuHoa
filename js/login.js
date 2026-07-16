"use strict";

//======================================
// LOGIN
//======================================

id("btnLogin").addEventListener(

    "click",

    loginSystem

);

//======================================

async function loginSystem(){

    const email =

        id("txtEmail")

        .value

        .trim()

        .toLowerCase();

    if(email===""){

        alert(

            "Nhập Email."

        );

        return;

    }

    //----------------------------------
    // LOGIN SERVER
    //----------------------------------

    const result = await Auth.post({

        action:"login",

        email:email

    });


console.log(result);
    
    if(!result.success){

        alert(

            result.message

        );

        return;

    }

    //----------------------------------
    // SAVE TOKEN
    //----------------------------------

    await Auth.login(

        result.token

    );

    //----------------------------------

    location.href="dashboard.html";

}
