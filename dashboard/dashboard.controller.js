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
    // Gắn sự kiện
    //----------------------------------

    bindEvents();

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

    bind(

        "btnReport",

        openReport

    );

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
