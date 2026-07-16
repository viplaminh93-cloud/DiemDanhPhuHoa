//======================================
// DASHBOARD CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * Dashboard Controller
 * --------------------------------------
 * Điều khiển toàn bộ Dashboard
 * Không xử lý API
 * Không render HTML
 * ======================================
 */

const DashboardController = (() => {

    //----------------------------------
    // State
    //----------------------------------

    let currentType = "Dự lễ";

    let dashboardData = null;

    //----------------------------------
    // Khởi tạo
    //----------------------------------

    function init() {

        Auth.requireLogin();

        bindEvents();

        load();

    }

    //----------------------------------
    // Gắn sự kiện
    //----------------------------------

    function bindEvents() {

        id("btnRefresh")
            .addEventListener(
                "click",
                load
            );

        id("btnLe")
            .addEventListener(
                "click",
                showMass
            );

        id("btnGiaoLy")
            .addEventListener(
                "click",
                showCatechism
            );

    }

    //----------------------------------
    // Load Dashboard
    //----------------------------------

    async function load() {

        try {

            dashboardData =
                await DashboardService.load();

            DashboardRenderer.renderSummary(
                dashboardData
            );

            DashboardRenderer.renderTable(
                dashboardData,
                currentType
            );

        }

        catch (err) {

            console.error(err);

            alert(
                "Không kết nối được máy chủ."
            );

        }

    }

    //----------------------------------
    // Hiển thị Dự lễ
    //----------------------------------

    function showMass() {

        currentType = "Dự lễ";

        DashboardRenderer.setActiveButton(
            currentType
        );

        DashboardRenderer.renderTable(
            dashboardData,
            currentType
        );

    }

    //----------------------------------
    // Hiển thị Giáo lý
    //----------------------------------

    function showCatechism() {

        currentType = "Giáo lý";

        DashboardRenderer.setActiveButton(
            currentType
        );

        DashboardRenderer.renderTable(
            dashboardData,
            currentType
        );

    }

    //----------------------------------
    // Public
    //----------------------------------

    return {

        init

    };

})();


//======================================
// START
//======================================

window.addEventListener(

    "load",

    DashboardController.init

);
