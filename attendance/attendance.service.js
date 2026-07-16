//======================================
// ATTENDANCE SERVICE
// attendance/attendance.service.js
//======================================

"use strict";

/**
 * ======================================
 * AttendanceService
 * Chứa toàn bộ nghiệp vụ của module
 * ======================================
 */
const AttendanceService = (() => {

    /**
     * --------------------------------------
     * Khởi tạo phiên điểm danh
     * --------------------------------------
     */
    async function start(type) {

        App.loaiDiemDanh = type;

        await syncOfflineQueue();

        AttendanceRenderer.showScanner(type);

        await loadTodayCounter(type);

        CameraController.start();

    }

    /**
     * --------------------------------------
     * Đồng bộ hàng chờ nếu đang online
     * --------------------------------------
     */
    async function syncOfflineQueue() {

        if (!navigator.onLine) {
            return;
        }

        if (!hasQueue()) {
            return;
        }

        debug(
            MODULE.OFFLINE,
            "Queue detected"
        );

        await syncQueue();

    }

    /**
     * --------------------------------------
     * Đọc tổng điểm danh hôm nay
     * --------------------------------------
     */
    async function loadTodayCounter(type) {

        try {

            const response = await fetch(

                CONFIG.API.URL +

                "?count=1&loai=" +

                encodeURIComponent(type)

            );

            const data = await response.json();

            App.tongHomNay = Number(data.count) || 0;

            AttendanceRenderer.renderCounter(
                App.tongHomNay
            );

        }

        catch (err) {

            console.error(err);

            hienThi({

                success: false,

                message: MESSAGE.NETWORK_ERROR

            });

        }

    }

    /**
     * --------------------------------------
     * Tăng bộ đếm sau khi điểm danh thành công
     * --------------------------------------
     */
    function increaseCounter() {

        App.tongHomNay++;

        AttendanceRenderer.renderCounter(
            App.tongHomNay
        );

    }

    /**
     * --------------------------------------
     * Reset bộ đếm
     * --------------------------------------
     */
    function resetCounter() {

        App.tongHomNay = 0;

        AttendanceRenderer.renderCounter(0);

    }

    /**
     * --------------------------------------
     * Trả về tổng hiện tại
     * --------------------------------------
     */
    function getCounter() {

        return App.tongHomNay;

    }

    /**
     * --------------------------------------
     * Loại điểm danh hiện tại
     * --------------------------------------
     */
    function getCurrentType() {

        return App.loaiDiemDanh;

    }

    /**
     * --------------------------------------
     * Kết thúc phiên điểm danh
     * --------------------------------------
     */
    async function finish() {

        App.dangXuLy = false;

        await CameraController.stop();

        AttendanceRenderer.showHome();

    }

    return {

        start,

        finish,

        syncOfflineQueue,

        loadTodayCounter,

        increaseCounter,

        resetCounter,

        getCounter,

        getCurrentType

    };

})();
