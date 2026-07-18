/**
 * ======================================
 * ATTENDANCE RENDERER
 * Giáo xứ Phú Hòa
 * ======================================
 */
"use strict";

const AttendanceRenderer = (() => {

    function showHome() {
        Renderer.show("homeBox"); // Truyền ID là string
        Renderer.hide("scannerBox");
    }

    function hideHome() {
        Renderer.hide("homeBox");
    }

    function showScanner(loai) {
        hideHome();
        renderType(loai);
        Renderer.show("scannerBox"); // Truyền ID là string
    }

    function hideScanner() {
        Renderer.hide("scannerBox"); // Truyền ID là string
    }

    function renderType(loai) {
        Renderer.text("typeTitle", "Điểm danh: " + loai);
    }

    function renderTodayCounter(total) {
        Renderer.text("todayCount", "Đã điểm danh hôm nay: " + total + " em");
    }

    return { showHome, hideHome, showScanner, hideScanner, renderTodayCounter };
})();
