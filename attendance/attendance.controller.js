/**
 * ======================================
 * ATTENDANCE CONTROLLER
 * --------------------------------------
 * Điều phối toàn bộ màn hình điểm danh.
 *
 * Controller KHÔNG xử lý giao diện.
 * Controller KHÔNG gọi fetch trực tiếp.
 * Controller chỉ:
 *
 * 1. nhận sự kiện
 * 2. gọi Service
 * 3. gọi Renderer
 *
 * ======================================
 */

"use strict";

Auth.requireLogin();

/**
 * ======================================
 * Khởi tạo Attendance
 * ======================================
 */
const AttendanceController = (() => {

    /**
     * ----------------------------------
     * Loại điểm danh hiện tại
     * ----------------------------------
     */
    let currentType = "";

    /**
     * ==================================
     * Bắt đầu điểm danh
     * ==================================
     */
    async function start(type){

        currentType = type;

        App.loaiDiemDanh = type;

        /**
         * Nếu có dữ liệu Offline
         * thì tiến hành đồng bộ trước
         */
        if(navigator.onLine && hasQueue()){

            debug(
                MODULE.OFFLINE,
                "Offline queue detected"
            );

            syncQueue();

        }

        AttendanceRenderer.showScanner(type);

        await loadTodayCounter();

        CameraService.start();

    }

    /**
     * ==================================
     * Tải tổng điểm danh hôm nay
     * ==================================
     */
    async function loadTodayCounter(){

        try{

            const total =
                await AttendanceService.getTodayCounter(currentType);

            App.tongHomNay = total;

            AttendanceRenderer.renderTodayCounter(total);

        }
        catch(error){

            console.error(error);

        }

    }

    /**
     * ==================================
     * QR được Camera đọc thành công
     * ==================================
     */
    async function onQRCode(text){

        if(App.dangXuLy){

            return;

        }

        App.dangXuLy = true;

        await CameraService.pause();

        try{

            const result =
                await AttendanceService.sendAttendance(text);

            if(result.success){

                App.tongHomNay++;

                AttendanceRenderer.renderTodayCounter(
                    App.tongHomNay
                );

            }

            PopupRenderer.show(result);

        }
        catch(error){

            console.error(error);

        }

    }

    /**
     * ==================================
     * Đóng Popup
     * ==================================
     */
    async function closePopup(){

        PopupRenderer.hide();

        App.dangXuLy = false;

        await CameraService.resume();

    }

    /**
     * ==================================
     * Quay về Trang chủ
     * ==================================
     */
    async function backHome(){

        PopupRenderer.hide();

        await CameraService.stop();

        AttendanceRenderer.showHome();

        App.dangXuLy = false;

    }

    /**
     * ==================================
     * Public API
     * ==================================
     */
    return{

        start,

        onQRCode,

        closePopup,

        backHome

    };

})();
