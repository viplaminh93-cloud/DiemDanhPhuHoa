"use strict";

//======================================
// STATUS
//======================================

const STATUS = Object.freeze({

    SUCCESS : "success",

    DUPLICATE : "duplicate",

    ERROR : "error"

});

//========================
// EVENT
//========================

const EVENT={

    QR_SUCCESS:"qr-success",

    QR_ERROR:"qr-error",

    POPUP_SHOW:"popup-show",

    POPUP_CLOSE:"popup-close",

    API_SUCCESS:"api-success",

    API_ERROR:"api-error"

};

//========================
// LOAI DIEM DANH
//========================

const LOAI = Object.freeze({

    LE : "Dự lễ",

    GIAOLY : "Giáo lý"

});


//======================================
// MESSAGE
//======================================

const MESSAGE = Object.freeze({

    CAMERA_ERROR:

        "Không mở được camera.",

    NETWORK_ERROR:

        "Không gửi được dữ liệu.",

    UNKNOWN_ERROR:

        "Có lỗi xảy ra."

});


const MODULE = {

    CAMERA:"CAMERA",

    API:"API",

    POPUP:"POPUP",

    OFFLINE:"OFFLINE",

    MODEL:"MODEL",

    RENDERER:"RENDERER",

    APP:"APP"

};




console.log("constants.js loaded");
