//======================================
// LOGIN CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * KHỞI TẠO
 * ======================================
 */

window.addEventListener(

    "load",

    initLogin

);


/**
 * ======================================
 * GẮN SỰ KIỆN
 * ======================================
 */

function initLogin(){

    const button = Utils.id("btnLogin");

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        handleLogin

    );

}


/**
 * ======================================
 * XỬ LÝ ĐĂNG NHẬP
 * ======================================
 */

async function handleLogin(){

    //----------------------------------
    // Lấy email
    //----------------------------------

    const email = getLoginEmail();

    //----------------------------------
    // Kiểm tra
    //----------------------------------

    if(email === ""){

        showLoginError(

            "Nhập Email."

        );

        return;

    }

    //----------------------------------
    // Disable nút
    //----------------------------------

    setLoginLoading(true);

    //----------------------------------
    // Gửi Server
    //----------------------------------

    try{

        const result = await loginService(email);

        //----------------------------------
        // Không thành công
        //----------------------------------

        if(!result.success){

            showLoginError(

                result.message

            );

            return;

        }

        //----------------------------------
        // Lưu Token
        //----------------------------------

        await Auth.login(

            result.token

        );

        //----------------------------------
        // Chuyển Dashboard
        //----------------------------------

        location.href =

            "modules/dashboard/dashboard.html";

    }

    catch(err){

        console.error(err);

        showLoginError(

            "Không kết nối được máy chủ."

        );

    }

    finally{

        setLoginLoading(false);

    }

}
