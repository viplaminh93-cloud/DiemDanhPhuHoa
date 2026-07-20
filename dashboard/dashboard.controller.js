//======================================
// DASHBOARD CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";



window.addEventListener("load", init);
const installBtn = Utils.id("installBtn");
if (installBtn) installBtn.classList.add("hidden");

/**
 * ======================================
 * KHỞI TẠO
 * ======================================
 */

function init(){
    if (!Auth.requireLogin()) return;

    loadUser();
    const role = Auth.getRole();

    if (role === "TAM_KHOA") {
        alert("Tài khoản của bạn chưa được cấp quyền sử dụng hệ thống.");
        Auth.logout();
        return;
    }
    
    // Gắn sự kiện trước (để nút cài đặt có thể hoạt động)
    bindEvents();
    initializePWA(); // Gọi hàm khởi tạo PWA ở đây!

    if (!('beforeinstallprompt' in window)) {
        const installBtn = Utils.id("installBtn");
        if (installBtn) installBtn.classList.add("hidden");
    }
}

/**
 * ======================================
 * GẮN SỰ KIỆN
 * ======================================
 */

function bindEvents(){
    bind("btnAttendance", openAttendance);
    bind("btnStudents", openStudents);
    bind("btnReport", openReport);
    bind("btnLogout", logout);
}

/**
 * ======================================
 * BIND EVENT AN TOÀN
 * ======================================
 */

function bind(id,callback){
    const element = Utils.id(id);
    if(!element) {Debug.write("Không tìm thấy:", id);
        return;
    }
    element.addEventListener("click", callback);
}


/**
 * ======================================
 * HIỂN THỊ NGƯỜI DÙNG
 * ======================================
 */

function loadUser() {

    const username = Auth.getName(); //tên user
    const role = Auth.getRole(); //phân quyền

    const nameEl = Utils.id("txtEmail");
    const roleEl = Utils.id("txtRole");

    if (nameEl) nameEl.innerText = username;
    if (roleEl) roleEl.innerText = role;
}


/**
 * ======================================
 * ĐIỂM DANH
 * ======================================
 */

function openAttendance() {location.href = "../attendance/attendance.html";}

/**
 * ======================================
 * DANH SÁCH
 * ======================================
 */

function openStudents() {location.href = "../students/students.html";}

/**
 * ======================================
 * BÁO CÁO
 * ======================================
 */

function openReport() {location.href="../report/report.html";}

/**
 * ======================================
 * ĐĂNG XUẤT
 * ======================================
 */

function logout() {Auth.logout();}









//======================================
// PWA INSTALLATION
//======================================
let installPrompt = null;

// Lắng nghe sự kiện trình duyệt gợi ý cài đặt PWA
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    Renderer.show("installBtn"); // Hiển thị nút cài đặt
});

/**
 * Gắn sự kiện click cho nút cài đặt
 */
function initializePWA() {
    const button = Utils.id("installBtn");
    if (button) {
        button.addEventListener("click", installApplication);
    }
}

/**
 * Thực hiện prompt cài đặt PWA
 */
async function installApplication() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
        Renderer.hide("installBtn");
    }
    installPrompt = null;
}
