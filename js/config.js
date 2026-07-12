//======================================
// CONFIG
//======================================

"use strict";

const CONFIG = {

    //==============================
    // APP
    //==============================

    APP:{

        NAME:"Điểm danh TNTT",

        PARISH:"Giáo xứ Phú Hòa",

        VERSION:"1.0.0"

    },


    //==============================
    // API
    //==============================

    API:{

        URL:
        "https://script.google.com/macros/s/AKfycbwK1pWbhW1MBbcNunsN1edGWkV7PPKUrL7s0mPqHbQArFHM57vn29MZou6kvSvaS82AeQ/exec"

    },


    //==============================
    // CAMERA
    //==============================

    CAMERA:{
    
        FPS:10,
    
        WIDTH:220,
    
        HEIGHT:220,
    
        VIBRATE:50,
    
        FACING_MODE:"environment",
    
        REMEMBER_CAMERA:true,
    
        DISABLE_FLIP:true
    
    },


    //==============================
    // POPUP
    //==============================

    POPUP:{

        AUTO_CLOSE:false,

        DURATION:3000

    },


    //==============================
    // OFFLINE
    //==============================

    OFFLINE:{

        STORAGE_KEY:"attendance_queue"

    },


    //==============================
    // KHỐI
    //==============================

    KHOI:{

        "KHAI TÂM":{

            css:"khaitam"

        },

        "XƯNG TỘI":{

            css:"xungtoi"

        },

        "THÊM SỨC":{

            css:"themsuc"

        },

        "SỐNG ĐẠO":{

            css:"songdao"

        },

        "VÀO ĐỜI":{

            css:"vaodoi"

        }

    }

};

console.log("config.js loaded");
