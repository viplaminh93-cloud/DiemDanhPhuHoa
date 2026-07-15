"use strict";

id("btnLogin")

.addEventListener(

    "click",

    loginSystem

);

async function loginSystem(){

    const email =

        id("txtEmail")

        .value

        .trim()

        .toLowerCase();

    if(email==""){

        alert(

            "Nhập Email."

        );

        return;

    }

    const result = await Auth.login(email);

    if(!result.success){

        alert(

            result.message

        );

        return;

    }

    location.href="dashboard.html";

}
