//==================================================
// STUDENTS SERVICE
// Xử lý dữ liệu Thiếu nhi (Load, Cache, Search, Getter)
//==================================================

"use strict";

const StudentService = (() => {
                                    console.log("Kiểm tra google.script:", typeof google !== 'undefined' ? google.script : "KHÔNG TÌM THẤY");
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
    
        // Hàm đợi an toàn
        const waitForGoogle = () => {
            return new Promise((resolve) => {
                let count = 0;
                const check = setInterval(() => {
                    if (typeof google !== 'undefined' && google.script) {
                        clearInterval(check);
                        resolve(true);
                    }
                    count++;
                    if (count > 20) { // Đợi tối đa 2 giây
                        clearInterval(check);
                        resolve(false);
                    }
                }, 100);
            });
        };
    
        const isReady = await waitForGoogle();
        
        if (!isReady) {
            console.error("LỖI: Không tìm thấy google.script sau khi đợi.");
            return students.map(s => ({ ...s, soBuoiLe: 0, soBuoiGiaoLy: 0 }));
        }
    
        return new Promise((resolve) => {
            google.script.run
                .withSuccessHandler(stats => {
                    const combined = students.map(s => ({
                        ...s,
                        soBuoiLe: stats[String(s.maso).trim()]?.le || 0,
                        soBuoiGiaoLy: stats[String(s.maso).trim()]?.gl || 0
                    }));
                    resolve(combined);
                })
                .withFailureHandler(err => {
                    console.error("Lỗi Google Script:", err);
                    resolve(students.map(s => ({ ...s, soBuoiLe: 0, soBuoiGiaoLy: 0 })));
                })
                .getAllAttendanceStats();
        });
    }
    

    // Export các phương thức public
    return { load, getAll, getByCode, search, count, getStudentsWithStats };
})();
