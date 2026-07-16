//======================================
// VERSION
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * VERSION MODULE
 *
 * Quản lý thông tin phiên bản ứng dụng.
 *
 * Chức năng:
 * - Phiên bản hiện tại
 * - Tên Cache Service Worker
 *
 * Không chứa business.
 * Không thao tác DOM.
 * ======================================
 */

const Version = (()=>{

    //======================================
    // VERSION
    //======================================

    const VERSION = "1.0.0";

    //======================================
    // CACHE NAME
    //======================================

    const CACHE_NAME =

        "phuhoa-" +

        VERSION;

    //======================================

    return Object.freeze({

        VERSION,

        CACHE_NAME

    });

})();
