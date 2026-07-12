//======================================
// ATTENDANCE
//======================================

"use strict";


//======================================
// CHỌN LOẠI ĐIỂM DANH
//======================================

function startApp(loai){

    App.loaiDiemDanh = loai;

    qs(".home").style.display = "none";

    show(id("scannerBox"));

    id("typeTitle").innerText =
        "Điểm danh: " + loai;

    capNhatTongTuServer(loai);

    startCamera();

}




//======================================
// LẤY TỔNG TỪ APPS SCRIPT
//======================================

function capNhatTongTuServer(loai){

    fetch(

        CONFIG.API.URL +

        "?count=1&loai=" +

        encodeURIComponent(loai)

    )

    .then(res=>res.json())

    .then(data=>{

        App.tongHomNay = Number(data.count) || 0;

        capNhatTong();

    })

    .catch(err=>{
    
        console.error(err);
    
        hienThi({
    
            success:false,
    
            message:MESSAGE.NETWORK_ERROR
    
        });
    
    });

}



//======================================
// CẬP NHẬT GIAO DIỆN
//======================================

function capNhatTong(){

    const obj = id("todayCount");

    if(!obj) return;

    obj.innerHTML =
        "Đã điểm danh hôm nay: <b>"
        + App.tongHomNay
        + "</b> em";

}
