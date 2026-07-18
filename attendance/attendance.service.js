/**
 * ======================================
 * ATTENDANCE SERVICE
 * Giáo xứ Phú Hòa
 * ======================================
 */
"use strict";

const AttendanceService = (() => {
    let currentType = "";

    /** Thiết lập loại điểm danh hiện tại (Lễ hoặc Giáo lý) */
    function setCurrentType(loai) {
        currentType = loai;
    }

    /** Lấy loại điểm danh hiện tại */
    function getCurrentType() {
        return currentType;
    }

    /** Gửi thông tin QR để xử lý điểm danh */
    async function sendAttendance(qrText) {
        return await AttendanceAPI.sendAttendance(qrText);
    }

    /** Lấy số lượng đã điểm danh trong ngày */
    async function getTodayCounter() {
        try {
            const response = await Auth.post({
                action: "todayCounter",
                loai: currentType
            });

            if (response && response.success) {
                return Number(response.total || 0);
            }
            return 0;
        } catch (error) {
            console.error("Lỗi lấy số lượng điểm danh:", error);
            return 0;
        }
    }

    /** Đặt lại trạng thái service */
    function reset() {
        currentType = "";
    }

    return {
        setCurrentType,
        getCurrentType,
        sendAttendance,
        getTodayCounter,
        reset
    };
})();
