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

window.addEventListener(

    "load",

    init

);

/**
 * ======================================
 * KHỞI TẠO
 * ======================================
 */

function init(){

    //----------------------------------
    // Kiểm tra đăng nhập
    //----------------------------------

     Auth.requireLogin();

    //----------------------------------
    // Hiển thị người dùng
    //----------------------------------

    loadUser();
    const role = Auth.getRole(); // Lấy quyền

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

    bind(

        "btnAttendance",

        openAttendance

    );

    bind(

        "btnStudents",

        openStudents

    );

    bind("btnReports").addEventListener("click", () => {
        if (Auth.getRole() !== "ADMIN" || "QUAN_LY") {
                alert("Bạn không có quyền truy cập trang này!");
                return;
        }
        openReport
    });
    

    bind(

        "btnLogout",

        logout

    );

}

/**
 * ======================================
 * BIND EVENT AN TOÀN
 * ======================================
 */

function bind(id,callback){

    const element =

        Utils.id(id);

    if(!element){

        Debug.warn(

            "Không tìm thấy:",

            id

        );

        return;

    }

    element.addEventListener(

        "click",

        callback

    );

}


/**
 * ======================================
 * HIỂN THỊ NGƯỜI DÙNG
 * ======================================
 */

function loadUser() {

    const username = Auth.getName() || "Bạn hiền";
    const role = Auth.getRole() || "Người dùng";

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

function openAttendance(){

    location.href =

        "../attendance/attendance.html";

}

/**
 * ======================================
 * DANH SÁCH
 * ======================================
 */

function openStudents(){

    location.href =

        "../students/students.html";

}

/**
 * ======================================
 * BÁO CÁO
 * ======================================
 */

function openReport(){

    //----------------------------------
    // Tạm thời
    //----------------------------------

    alert(

        "Chức năng đang phát triển."

    );

}

/**
 * ======================================
 * ĐĂNG XUẤT
 * ======================================
 */

function logout(){

    Auth.logout();

}
