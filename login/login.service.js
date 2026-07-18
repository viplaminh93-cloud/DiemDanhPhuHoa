"use strict";

/**
 * LOGIN SERVICE
 * Quản lý logic nghiệp vụ đăng nhập với Server.
 */
const LoginService = (() => {

    // Lấy email từ ô nhập liệu
    const getLoginEmail = () => Utils.id("txtEmail")?.value.trim() || "";

    // Gửi yêu cầu đăng nhập lên server
    async function login(email) {
        return await Auth.post({
            action: "login",
            email: email
        });
    }

    // Lưu token sau khi đăng nhập thành công
    async function saveToken(token) {
        await Auth.login(token);
    }

    return { login, saveToken, getLoginEmail };
})();
