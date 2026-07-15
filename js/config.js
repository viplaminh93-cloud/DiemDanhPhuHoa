//======================================
// CONFIG
//======================================

"use strict";

const CONFIG = Object.freeze({

    //==============================
    // APP
    //==============================

    APP: Object.freeze({

        NAME: "Điểm danh TNTT",

        PARISH: "Giáo xứ Phú Hòa",

        DEBUG: true

    }),


    //==============================
    // API
    //==============================

    API: Object.freeze({

        URL:
        "https://script.google.com/macros/s/AKfycbw1z1sRii7Ob_b_5iAuwbBYVfiYylsWxxVQaTdhDwaIbKEZyEwhYJscVuMWmpID9s7Zbg/exec"

    }),


    //==============================
    // CAMERA
    //==============================

    CAMERA: Object.freeze({

        FPS: 10,

        WIDTH: 220,

        HEIGHT: 220,

        VIBRATE: 50,

        FACING_MODE: "environment",

        REMEMBER_CAMERA: true,

        DISABLE_FLIP: true

    }),


    //==============================
    // POPUP
    //==============================

    POPUP: Object.freeze({

        AUTO_CLOSE: false,

        DURATION: 3000,

        HINT: "Chạm màn hình để tiếp tục"

    }),


    //==============================
    // OFFLINE
    //==============================

    OFFLINE: Object.freeze({

        STORAGE_KEY: "attendance_queue"

    }),


    //==============================
    // KHỐI
    //==============================

    KHOI: Object.freeze({

        "KHAI TÂM": Object.freeze({

            css: "khaitam"

        }),

        "XƯNG TỘI": Object.freeze({

            css: "xungtoi"

        }),

        "THÊM SỨC": Object.freeze({

            css: "themsuc"

        }),

        "SỐNG ĐẠO": Object.freeze({

            css: "songdao"

        }),

        "VÀO ĐỜI": Object.freeze({

            css: "vaodoi"

        })

    })

});
