"use strict";


//======================================
// STATUS
//======================================

const STATUS = Object.freeze({

    SUCCESS : "success",

    DUPLICATE : "duplicate",

    ERROR : "error"

});



//======================================
// LOẠI ĐIỂM DANH
//======================================

const LOAI = Object.freeze({

    LE : "Dự lễ",

    GIAOLY : "Giáo lý"

});



//======================================
// EVENT
//======================================

const EVENT = Object.freeze({

    QR_SUCCESS : "qr-success",

    QR_ERROR : "qr-error",

    POPUP_SHOW : "popup-show",

    POPUP_CLOSE : "popup-close",

    API_SUCCESS : "api-success",

    API_ERROR : "api-error"

});



//======================================
// MESSAGE
//======================================

const MESSAGE = Object.freeze({

    CAMERA_ERROR :

        "Không mở được camera.",

    NETWORK_ERROR :

        "Không gửi được dữ liệu.",

    UNKNOWN_ERROR :

        "Có lỗi xảy ra."

});



//======================================
// DEBUG MODULE
//======================================

const MODULE = Object.freeze({

    APP : "APP",

    API : "API",

    CAMERA : "CAMERA",

    MODEL : "MODEL",

    OFFLINE : "OFFLINE",

    POPUP : "POPUP",

    RENDERER : "RENDERER"

});
