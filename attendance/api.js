"use strict";

const AttendanceAPI = (() => {
    function createRequest(maso) {
        return {
            action: "attendance",
            maso: String(maso).trim().toUpperCase(),
            loai: AttendanceService.getCurrentType(), // Lấy từ Service
            requestId: Date.now() + "_" + Math.random().toString(36).substring(2, 8),
            time: Date.now()
        };
    }

    async function sendAttendance(maso) {
        const request = createRequest(maso);
        if (!navigator.onLine) {
            OfflineService.push(request);
            return { success: false, offline: true, message: "Đã lưu Offline." };
        }
        try {
            return await Auth.post(request);
        } catch (e) {
            OfflineService.push(request);
            return { success: false, offline: true, message: "Đã lưu Offline." };
        }
    }

    return { sendAttendance, resend: Auth.post };
})();
