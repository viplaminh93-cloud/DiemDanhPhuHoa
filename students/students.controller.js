//==================================================
// STUDENTS CONTROLLER
// Điều phối logic cho module Students
//==================================================

"use strict";

Auth.requireLogin();

window.addEventListener("load", initStudents);

/**
 * Khởi tạo dữ liệu: Dùng ReportService làm nguồn dữ liệu trung tâm
 */
async function initStudents() {
    const data = await ReportService.syncFromGoogle();
    const students = data.students;
    const history = data.history;

    // 3. Xử lý logic thống kê
    const studentsWithStats = students.map(s => {
        const stats = history.filter(h => h.maso == s.maso);
        return {
            ...s,
            // Đảm bảo tên thuộc tính 'type' hoặc 'loai' khớp với dữ liệu từ Google trả về
            soBuoiLe: stats.filter(h => h.loai && h.loai.includes("Lễ")).length, 
            soBuoiGiaoLy: stats.filter(h => h.loai && h.loai.includes("Giáo lý")).length
        };
    });

    // 4. Render danh sách
    StudentRenderer.renderList(studentsWithStats);
}

// Lắng nghe sự kiện người dùng nhập liệu
Utils.id("txtSearch").addEventListener("input", onSearch);

/**
 * Xử lý tìm kiếm
 */
function onSearch() {
    const keyword = Utils.id("txtSearch").value.trim().toLowerCase();
    const history = ReportService.getHistory();
    
    // Tìm kiếm trong StudentService
    const filteredStudents = StudentService.search(keyword);

    // Render lại kèm thống kê (để số liệu không bị mất khi tìm kiếm)
    const displayList = filteredStudents.map(s => {
        const stats = history.filter(h => h.maso == s.maso);
        return {
            ...s,
            soBuoiLe: stats.filter(h => h.loai && h.loai.includes("Lễ")).length,
            soBuoiGiaoLy: stats.filter(h => h.loai && h.loai.includes("Giáo lý")).length
        };
    });

    StudentRenderer.renderList(displayList);
}

// Sự kiện Modal
Utils.id("studentModal").addEventListener("click", e => {
    if (e.target.id === "studentModal") {
        StudentRenderer.closeModal();
    }
});
