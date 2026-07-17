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

    // Export các phương thức public
    return { load, getAll, getByCode, search, count };
})();
