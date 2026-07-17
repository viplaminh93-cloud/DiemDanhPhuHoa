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

const Auth = (() => {
    const TOKEN_KEY = "attendance_token";
    const USER_INFO_KEY = "user_info"; // Key mới để lưu thông tin user

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
        return userInfo.email || "";
    }

    function getRole() {
        const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
        return userInfo.role || "";
    }

    function getName() {
        const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
        return userInfo.userName || "";
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
