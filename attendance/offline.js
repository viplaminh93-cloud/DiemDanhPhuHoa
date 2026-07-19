"use strict";

/**
 * OFFLINE SERVICE
 * Quản lý hàng đợi gửi dữ liệu khi mất kết nối.
 */
const OfflineService = (() => {
    const STORAGE_KEY = "attendance_offline_queue";

    // --- Core Methods ---
    const load = () => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
        catch (e) { console.error(e); return []; }
    };

    const save = (queue) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
        renderQueueBadge();
    };

    const push = (req) => { const q = load(); q.push(req); save(q); };
    const pop = () => { const q = load(); if (q.length) { q.shift(); save(q); } };
    const peek = () => load()[0] || null;
    const clear = () => save([]);
    const length = () => load().length;
    const hasQueue = () => length() > 0;

    // --- Sync Logic ---
/*    async function sync() {
        if (!navigator.onLine || !hasQueue()) return;

        while (hasQueue()) {
            const req = peek();
            try {
                const res = await AttendanceAPI.resend(req);
                if (res.success) pop(); else break;
            } catch (e) { console.error(e); break; }
        }
    }*/

    async function sync() {
        if (!navigator.onLine || !hasQueue()) return;
    
        while (hasQueue()) {
            const req = peek();
            
            // CẬP NHẬT LẠI TOKEN MỚI NHẤT VÀO REQUEST TRƯỚC KHI GỬI
            // Đề phòng trường hợp token cũ trong hàng đợi đã hết hạn hoặc bị trống
            req.token = Auth.getToken(); 
            
            try {
                console.log("Đang đồng bộ:", req);
                const res = await AttendanceAPI.resend(req);
                
                if (res.success) {
                    pop(); // Xóa khỏi hàng đợi nếu thành công
                } else {
                    console.warn("Sync thất bại:", res.message);
                    break; // Dừng lại nếu Server trả về lỗi logic (để tránh lỗi vòng lặp)
                }
            } catch (e) { 
                console.error("Lỗi kết nối khi sync:", e); 
                break; 
            }
        }
    }

    // --- UI Helpers ---
    function renderQueueBadge() {
        const badge = Utils.id("queueBadge");
        const count = Utils.id("queueCount");
        if (!badge || !count) return;

        const total = length();
        count.innerText = total;
        total > 0 ? badge.classList.remove("hidden") : badge.classList.add("hidden");
    }

    // Lắng nghe sự kiện kết nối mạng trở lại
    window.addEventListener("online", sync);

    return { load, save, push, peek, pop, clear, length, hasQueue, sync, renderQueueBadge };
})();
