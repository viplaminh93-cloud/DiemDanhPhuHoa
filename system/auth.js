//======================================
// AUTH
// Giáo xứ Phú Hòa
//======================================

"use strict";

const Auth = (() => {
    const TOKEN_KEY = "attendance_token";
    const USER_INFO_KEY = "user_info";

    function saveToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    function getToken() {
        return localStorage.getItem(TOKEN_KEY) || "";
    }

    function isLogin() {
        return getToken() !== "";
    }

    async function login(token, userInfo = {}) {
        saveToken(token);
        if(token){
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        }
    }

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_INFO_KEY);
        location.href = "../login/login.html";
    }

    function requireLogin() {
        if (isLogin()) return true;
        location.href = "../login/login.html";
        return false;
    }

    function getEmail() {
        const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
        return userInfo.email || "Người dùng";
    }

    function getRole() {
        const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
        return userInfo.role || "KHACH";
    }

    function getName() {
        const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
        return userInfo.name || userInfo.email;
    }

    async function post(body = {}) {
        if (body.action !== "login") body.token = getToken();
        const response = await fetch(Config.API.URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    return { login, logout, post, getToken, saveToken, requireLogin, isLogin, getEmail, getRole, getName };
})();







window.addEventListener("DOMContentLoaded", async () => {
    // 1. Kiểm tra xem có Token không
    const token = localStorage.getItem("token"); // Hoặc cách bạn đang lưu token
    
    // 2. Nếu không có token, chuyển hướng về trang đăng nhập
    if (!token && window.location.pathname !== "/login.html") {
        window.location.href = "login.html";
        return;
    }

    // 3. Nếu có token, chuyển hướng vào Dashboard (nếu đang ở trang login)
    if (token && window.location.pathname.includes("login.html")) {
        window.location.href = "dashboard.html";
    }
});
