//==================================================
// STUDENTS CONTROLLER
// Điều phối logic cho module Students
//==================================================

"use strict";

// Kiểm tra quyền đăng nhập trước khi thực thi
Auth.requireLogin();

// Lắng nghe sự kiện load trang để khởi tạo dữ liệu
window.addEventListener("load", initStudents);

/**
 * Khởi tạo dữ liệu: Tải từ server và hiển thị toàn bộ danh sách
 */
async function initStudents() {
    await StudentService.load();
    StudentRenderer.renderList(StudentService.getAll());
}

// Lắng nghe sự kiện người dùng nhập liệu vào ô tìm kiếm
Utils.id("txtSearch").addEventListener("input", onSearch);

/**
 * Xử lý tìm kiếm: Lọc danh sách theo từ khóa hoặc hiển thị tất cả nếu ô trống
 */
function onSearch() {
    const keyword = Utils.id("txtSearch").value.trim().toLowerCase();

    if (keyword === "") {
        StudentRenderer.renderList(StudentService.getAll());
        return;
    }

    StudentRenderer.renderList(StudentService.search(keyword));
}

// Lắng nghe sự kiện click vào nền Modal để đóng Modal
Utils.id("studentModal").addEventListener("click", e => {
    // Chỉ đóng khi click trực tiếp vào vùng nền (studentModal), không phải nội dung bên trong
    if (e.target.id === "studentModal") {
        StudentRenderer.closeModal();
    }
});
