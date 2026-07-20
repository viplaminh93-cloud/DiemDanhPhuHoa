//==================================================
// STUDENTS SERVICE
// Xử lý dữ liệu Thiếu nhi (Load, Cache, Search, Getter)
//==================================================

"use strict";

const StudentService = (() => {

    // Dữ liệu cache nội bộ
    let students = [];

    /**
     * Tải danh sách thiếu nhi từ server
     */
    async function load() {
        try {
            const data = await Auth.post({ action: "students" });

            // Xử lý lỗi xác thực hoặc lỗi từ server
            if (!data.success) {
                if (data.message === "Phiên đăng nhập hết hạn.") {
                    Auth.logout();
                    alert("Phiên đăng nhập đã hết hạn.");
                } else {
                    alert(data.message);
                }
                return;
            }

            students = data.list || [];
        } catch (err) {
            console.error(err);
            alert("Không kết nối được máy chủ.");
        }
    }

    /**
     * Lấy toàn bộ danh sách thiếu nhi
     */
    function getAll() {
        return students;
    }

    /**
     * Tìm thiếu nhi theo mã số
     * @param {string|number} maso 
     */
    function getByCode(maso) {
        return students.find(item => item.maso === maso);
    }

    /**
     * Tìm kiếm thiếu nhi theo mã số hoặc họ tên
     * @param {string} keyword 
     */
    function search(keyword) {
        const term = keyword.trim().toLowerCase();
        return students.filter(s => 
            String(s.maso).toLowerCase().includes(term) || 
            String(s.hoten).toLowerCase().includes(term)
        );
    }

    /**
     * Đếm tổng số lượng thiếu nhi
     */
    function count() {
        return students.length;
    }

    // Hàm đếm số buổi giáo lý và lễ
    async function getStudentsWithStats() {
        await load();
        const students = getAll();
    
        // Xóa đoạn IF kiểm tra typeof google đi
        // Ép chạy thẳng vào google.script.run
        try {
            const stats = await new Promise((resolve, reject) => {
                google.script.run
                    .withSuccessHandler(resolve)
                    .withFailureHandler(reject)
                    .getAllAttendanceStats();
            });
    
            return students.map(s => ({
                ...s,
                soBuoiLe: stats[String(s.maso).trim()]?.le || 0,
                soBuoiGiaoLy: stats[String(s.maso).trim()]?.gl || 0
            }));
        } catch (err) {
            console.error("Lỗi nghiêm trọng khi lấy thống kê từ server:", err);
            // Nếu lỗi thật sự, lúc này mới trả về 0 để không làm crash giao diện
            return students.map(s => ({ ...s, soBuoiLe: 0, soBuoiGiaoLy: 0 }));
        }
    }
    

    // Export các phương thức public
    return { load, getAll, getByCode, search, count, getStudentsWithStats };
})();
