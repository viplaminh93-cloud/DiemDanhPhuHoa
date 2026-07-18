//======================================
// ATTENDANCE API
// Giáo xứ Phú Hòa
//======================================


"use strict";

const AttendanceAPI = (() => {

    /** Tạo đối tượng request điểm danh */
    function createRequest(maso) {

        const loai = AttendanceService.getCurrentType();
        Debug.write("DEBUG - Request data:", { maso, loai }); // XEM LOG NÀY TRONG F12

        if (!loai) Debug.write("CẢNH BÁO: Loại điểm danh đang rỗng!");
        
        return {
            action: "attendance",
            maso: String(maso).trim().toUpperCase(),
            loai: AttendanceService.getCurrentType(),
            requestId: Date.now() + "_" + Math.random().toString(36).substring(2, 8),
            time: Date.now()
        };
    }

    /** Gửi dữ liệu tới server với cơ chế timeout */
    async function fetchWithTimeout(body, timeout = 6000) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(Config.API.URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(body),
                signal: controller.signal
            });
            clearTimeout(timer);
            return await response.json();
        } catch (error) {
            clearTimeout(timer);
            throw error;
        }
    }

    /** Gửi điểm danh: Kiểm tra mạng trước khi gửi */
    async function sendAttendance(maso) {
        const request = createRequest(maso);

        // Trường hợp ngoại tuyến: Lưu vào hàng đợi
        if (!navigator.onLine) {
            OfflineService.push(request);
            return { success: false, offline: true, maso: request.maso, message: "Offline" };
        }

        // Trường hợp trực tuyến: Thử gửi tới server
        try {
            return await fetchWithTimeout(request);
        } catch (error) {
            OfflineService.push(request);
            return { success: false, offline: true, maso: request.maso, message: error.message };
        }
    }

    /** Gửi lại request đã lưu từ hàng đợi */
    async function resend(request) {
        return await fetchWithTimeout(request);
    }

    return { sendAttendance, resend };
})();
