let loaiDiemDanh = "";
let scanner = null;
let dangXuLy = false;
let tongHomNay = 0;

const API_URL =
"https://script.google.com/macros/s/AKfycbzMsIwR-Yc75ThToX0IR-ZTx30RAU-ksUESOOIlBJfQzWnX8R9cFHXfieoNNR2VBZds/exec";


//======================
// Chọn loại điểm danh
//======================

function startApp(loai){

    loaiDiemDanh = loai;

    document.querySelector(".home").style.display = "none";

    document.getElementById("scannerBox")
        .classList.remove("hidden");

    document.getElementById("typeTitle")
        .innerText = "Điểm danh: " + loai;

    capNhatTongTuServer(loai);

    startCamera();

}



//======================
// Lấy tổng điểm danh
//======================

function capNhatTongTuServer(loai){

    fetch(
        API_URL +
        "?count=1&loai=" +
        encodeURIComponent(loai)
    )

    .then(res => res.json())

    .then(data => {

        tongHomNay = Number(data.count) || 0;

        capNhatTong();

    })

    .catch(err => {

        console.log(err);

        tongHomNay = 0;

        capNhatTong();

    });

}



//======================
// Camera
//======================

async function startCamera(){

    if(scanner){

        try{

            await scanner.stop();

            scanner.clear();

        }catch(e){}

    }

    scanner = new Html5Qrcode("reader");

    try{

        await scanner.start(

            { facingMode:"environment" },

            {

                fps:10,

                qrbox:{
                    width:220,
                    height:220
                },

                rememberLastUsedCamera:true,

                disableFlip:true

            },

            qrSuccess

        );

    }catch(err){

        alert("Không mở được camera\n\n" + err);

    }

}



//======================
// Quét thành công
//======================

function qrSuccess(text){

    if(dangXuLy) return;

    dangXuLy = true;

    if(scanner){

        scanner.pause(true);

    }

    if(navigator.vibrate){

        navigator.vibrate(50);

    }

    guiDiemDanh(text);

}



//======================
// Gửi Apps Script
//======================

function guiDiemDanh(maso){

    maso = maso.trim().toUpperCase();

    fetch(API_URL,{

        method:"POST",

        redirect:"follow",

        headers:{
            "Content-Type":"text/plain;charset=utf-8"
        },

        body:JSON.stringify({

            maso:maso,

            loai:loaiDiemDanh,

            requestId:
                Date.now()
                + "_"
                + Math.random()

        })

    })

    .then(res=>res.json())

    .then(data=>{

        console.log(data);

        hienThi(data);

    })

    .catch(err=>{

        console.error(err);

        hienThi({

            success:false,

            message:"Không kết nối được máy chủ"

        });

    });

}



//======================
// Popup
//======================

function hienThi(data){

    const overlay =
        document.getElementById("overlay");

    overlay.className = "hidden";

    const title =
        document.getElementById("overlayTitle");

    const photo =
        document.getElementById("overlayPhoto");

    const name =
        document.getElementById("overlayName");

    const khoi =
        document.getElementById("overlayKhoi");

    const lop =
        document.getElementById("overlayClass");

    const code =
        document.getElementById("overlayCode");

    const time =
        document.getElementById("overlayTime");

    //------------------------------------
    // Xóa màu cũ
    //------------------------------------

    overlay.classList.remove(

        "khaitam",
        "xungtoi",
        "themsuc",
        "songdao",
        "vaodoi",

        "success",
        "warning",
        "error"

    );

    //------------------------------------
    // Chọn màu popup theo khối
    //------------------------------------

    if(data.student){

        switch((data.student.khoi || "").toUpperCase()){

            case "KHAI TÂM":
                overlay.classList.add("khaitam");
                break;

            case "XƯNG TỘI":
                overlay.classList.add("xungtoi");
                break;

            case "THÊM SỨC":
                overlay.classList.add("themsuc");
                break;

            case "SỐNG ĐẠO":
                overlay.classList.add("songdao");
                break;

            case "VÀO ĐỜI":
                overlay.classList.add("vaodoi");
                break;

            default:
                overlay.classList.add("success");

        }

    }

    //------------------------------------
    // Tiêu đề
    //------------------------------------

    if(data.success){

        title.innerHTML = "ĐIỂM DANH THÀNH CÔNG";

        // Cập nhật lại tổng từ server
        capNhatTongTuServer(loaiDiemDanh);

    }else if(data.duplicate){

        overlay.classList.add("warning");

        title.innerHTML = "ĐÃ ĐIỂM DANH";

    }else{

        overlay.classList.add("error");

        title.innerHTML = "KHÔNG TÌM THẤY";

    }

    //------------------------------------
    // Thông tin học sinh
    //------------------------------------

    if(data.student){

        name.innerHTML = data.student.hoten;

        khoi.innerHTML =
            data.student.khoi
            ? "Khối: " + data.student.khoi
            : "";

        lop.innerHTML =
            data.student.lop
            ? "Lớp: " + data.student.lop
            : "";

        code.innerHTML =
            "Mã số: " + data.student.maso;

        if(data.duplicate && data.gio){

            time.innerHTML =
                "Đã điểm danh lúc: "
                + data.gio;

        }else{

            time.innerHTML = "";

        }

        if(data.student.hinh){

            photo.src = data.student.hinh;

            photo.style.display = "block";

        }else{

            photo.style.display = "none";

        }

    }else{

        name.innerHTML = "";
        khoi.innerHTML = "";
        lop.innerHTML = "";
        code.innerHTML = data.message || "";
        time.innerHTML = "";
        photo.style.display = "none";

    }

    //------------------------------------

    setTimeout(()=>{

        overlay.classList.remove("hidden");

    },10);

}



//======================
// Chạm popup để quét tiếp
//======================

window.onload = function(){

    document
        .getElementById("overlay")
        .addEventListener("click",async function(){

            this.classList.add("hidden");

            dangXuLy = false;

            if(scanner){

                try{

                    await scanner.resume();

                }catch(e){}

            }

        });

};



//======================
// Quay lại
//======================

async function backHome(){

    try{

        if(scanner){

            await scanner.stop();

            scanner.clear();

            scanner = null;

        }

    }catch(e){}

    dangXuLy = false;

    document.querySelector(".home")
        .style.display = "block";

    document.getElementById("scannerBox")
        .classList.add("hidden");

}



//======================
// Cập nhật bộ đếm
//======================

function capNhatTong(){

    document.getElementById("todayCount").innerHTML =
        "Đã điểm danh hôm nay: <b>"
        + tongHomNay
        + "</b> em";

}


//======================
// PWA INSTALL
//======================

let deferredPrompt = null;

window.addEventListener(

    "beforeinstallprompt",

    e=>{

        e.preventDefault();

        deferredPrompt = e;

        document
            .getElementById("installBtn")
            .classList.remove("hidden");

    }

);

document

.getElementById("installBtn")

.addEventListener("click",async()=>{

    if(!deferredPrompt){

        return;

    }

    deferredPrompt.prompt();

    const result =
        await deferredPrompt.userChoice;

    if(result.outcome==="accepted"){

        console.log("Installed");

    }

    deferredPrompt = null;

    document
        .getElementById("installBtn")
        .classList.add("hidden");

});

window.addEventListener(

    "appinstalled",

    ()=>{

        document
            .getElementById("installBtn")
            .classList.add("hidden");

        console.log("PWA Installed");

    }

);



console.log("APP JS OK");
