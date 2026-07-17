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

async function handleLogin() {
    const email = LoginService.getLoginEmail();
    if (email === "") {
        LoginRenderer.showError("Nhập Email.");
        return;
    }

    LoginRenderer.setLoading(true);
    try {
        const result = await LoginService.login(email);
        
        // CHẶN NGAY: Nếu success là false, không được chạy tiếp
        if (!result.success) {
            LoginRenderer.showError(result.message);
            return;
        }


        await Auth.login(result.token, { 
            email: result.email,
            name: result.name,
            role: result.role || "Người dùng" 
        });

        location.href = "../dashboard/dashboard.html";
    } catch (err) {
        console.error(err);
        LoginRenderer.showError("Không kết nối được máy chủ.");
    } finally {
        LoginRenderer.setLoading(false);
    }
}
