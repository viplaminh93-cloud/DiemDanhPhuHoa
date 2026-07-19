//======================================
// DASHBOARD CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * DASHBOARD CONTROLLER
 *
 * Dashboard là Menu chính.
 * Không tải dữ liệu.
 * Không render thống kê.
 * Chỉ điều hướng.
 * ======================================
 */

window.addEventListener("load", init);

/**
 * ======================================
 * KHỞI TẠO
 * ======================================
 */

function init(){

    //----------------------------------
    // Kiểm tra đăng nhập
    //----------------------------------

     if (!Auth.requireLogin()) return;

    //----------------------------------
    // Hiển thị người dùng
    //----------------------------------

    loadUser();
    const role = Auth.getRole(); // Lấy quyền

    // Nếu là TAM_KHOA, chặn ngay từ đầu
        if (role === "TAM_KHOA") {
            alert("Tài khoản của bạn chưa được cấp quyền sử dụng hệ thống.");
            Auth.logout();
            return;
        }
    
    // Ẩn/Hiện nút dựa trên quyền
        if (role === "QUET_MA") {
            Utils.id("btnReports").style.display = "none";
    
    //----------------------------------
    // Gắn sự kiện
    //----------------------------------

    bindEvents();

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
    
/*    Utils.id("btnReports").addEventListener("click", () => {
        const role = Auth.getRole();
        if (role !== "ADMIN" && role !== "QUAN_LY") {
                alert("Bạn không có quyền truy cập trang này!");
                return;
        }
        alert("Chức năng đang phát triển.");
        
    });*/
    

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

function init() {
    Auth.requireLogin();
    loadUser();
    bindEvents();
}

window.addEventListener("load", init);

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
