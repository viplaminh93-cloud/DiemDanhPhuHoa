//======================================
// ATTENDANCE
//======================================

"use strict";


//======================================
// CHỌN LOẠI ĐIỂM DANH
//======================================

function startApp(loai){

    loaiDiemDanh = loai;

    const home =
        document.querySelector(".home");

    const scannerBox =
        document.getElementById("scannerBox");

    const title =
        document.getElementById("typeTitle");

    if(home){

        home.style.display = "none";

    }

    if(scannerBox){

        scannerBox.classList.remove("hidden");

    }

    if(title){

        title.innerHTML =
            "Điểm danh: " + loai;

    }

    //----------------------------------
    // Đồng bộ queue cũ
    //----------------------------------

    dongBoQueue();

    //----------------------------------
    // Lấy tổng hôm nay
    //----------------------------------

    capNhatTongTuServer(loai);

    //----------------------------------
    // Mở camera
    //----------------------------------

    startCamera();

}



//======================================
// LẤY TỔNG TỪ APPS SCRIPT
//======================================

function capNhatTongTuServer(loai){

    fetch(

        API_URL +

        "?count=1&loai=" +

        encodeURIComponent(loai)

    )

    .then(res=>res.json())

    .then(data=>{

        tongHomNay =

            Number(data.count) || 0;

        capNhatTong();

    })

    .catch(err=>{

        console.log(err);

    });

}



//======================================
// CẬP NHẬT GIAO DIỆN
//======================================

function capNhatTong(){

    const obj =

        document.getElementById(

            "todayCount"

        );

    if(!obj){

        return;

    }

    obj.innerHTML =

        "Đã điểm danh hôm nay: <b>"

        +

        tongHomNay

        +

        "</b> em";

}
