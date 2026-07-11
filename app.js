let loaiDiemDanh = "";
let scanner = null;
let dangXuLy = false;
let tongHomNay = 0;

const API_URL =
"https://script.google.com/macros/s/AKfycbwK1pWbhW1MBbcNunsN1edGWkV7PPKUrL7s0mPqHbQArFHM57vn29MZou6kvSvaS82AeQ/exec";

const STORAGE_VERSION = "phuhoa_version";
const APP_VERSION = "1.0.0";
const OFFLINE_QUEUE_KEY = "attendance_queue";






//======================
// APP CONFIG
//======================

const API_URL =
"https://script.google.com/macros/s/AKfycbwK1pWbhW1MBbcNunsN1edGWkV7PPKUrL7s0mPqHbQArFHM57vn29MZou6kvSvaS82AeQ/exec";

const STORAGE_VERSION = "phuhoa_version";

const APP_VERSION = "1.0.0";

const OFFLINE_QUEUE_KEY = "attendance_queue";


//======================
// GLOBAL VARIABLES
//======================

let loaiDiemDanh = "";

let scanner = null;

let dangXuLy = false;

let tongHomNay = 0;

let deferredPrompt = null;


console.log("APP CORE LOADED");












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
    
    dongBoQueue();
    
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
// Gửi Apps Script
//======================

function guiDiemDanh(maso){

    maso = maso.trim().toUpperCase();
    
    dongBoQueue();

    const request = {

        maso: maso,

        loai: loaiDiemDanh,

        requestId:
            Date.now() +
            "_" +
            Math.random(),

        time: Date.now()

    };

    //----------------------------------
    // Lưu Queue trước
    //----------------------------------

    themQueue(request);

    //----------------------------------
    // Gửi Server
    //----------------------------------

    fetch(API_URL,{

        method:"POST",

        redirect:"follow",

        headers:{
            "Content-Type":"text/plain;charset=utf-8"
        },

        body:JSON.stringify(request)

    })

    .then(res=>res.json())

    .then(data=>{

        //----------------------------------
        // Thành công hoặc trùng
        //----------------------------------

        if(data.success || data.duplicate){

            xoaQueue(request.requestId);

        }

        console.log(data);

        hienThi(data);

    })

    .catch(err=>{

        console.error(err);

        //----------------------------------
        // KHÔNG xóa queue
        //----------------------------------

        hienThi({

            success:false,

            offline:true,

            message:"Đã lưu tạm. Sẽ tự đồng bộ khi có mạng."

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

    dongBoQueue();

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

        const btn =
            document.getElementById("installBtn");

        if(btn){

            btn.classList.remove("hidden");

        }

    }

);

const installBtn =
    document.getElementById("installBtn");

if(installBtn){

    installBtn.addEventListener(

        "click",

        async()=>{

            if(!deferredPrompt){

                return;

            }

            deferredPrompt.prompt();

            await deferredPrompt.userChoice;

            deferredPrompt = null;

            installBtn.classList.add("hidden");

        }

    );

}

window.addEventListener(

    "appinstalled",

    ()=>{

        const btn =
            document.getElementById("installBtn");

        if(btn){

            btn.classList.add("hidden");

        }

        console.log("PWA Installed");

    }

);



//======================
// CHECK VERSION
//======================

(function(){

    const oldVersion =
        localStorage.getItem(STORAGE_VERSION);

    if(oldVersion !== APP_VERSION){

        localStorage.setItem(
            STORAGE_VERSION,
            APP_VERSION
        );

        if("serviceWorker" in navigator){

            navigator.serviceWorker
                .getRegistrations()
                .then(list=>{

                    list.forEach(sw=>sw.update());

                });

        }

        console.log(
            "Updated to",
            APP_VERSION
        );

    }

})();



//======================
// SPLASH
//======================

window.addEventListener(

    "load",

    ()=>{

        const splash =
            document.getElementById("splash");

        if(!splash){

            return;

        }

        setTimeout(()=>{

            splash.classList.add("hide");

        },1500);

    }

);



//======================
// OFFLINE QUEUE
//======================

function layQueue(){

    try{

        return JSON.parse(

            localStorage.getItem(
                OFFLINE_QUEUE_KEY
            ) || "[]"

        );

    }catch(e){

        return [];

    }

}



function luuQueue(queue){

    localStorage.setItem(

        OFFLINE_QUEUE_KEY,

        JSON.stringify(queue)

    );

}



function themQueue(item){

    const queue = layQueue();

    queue.push(item);

    luuQueue(queue);

}




function xoaQueue(requestId){

    const queue = layQueue()

        .filter(item =>

            item.requestId != requestId

        );

    luuQueue(queue);

}



//======================
// ĐỒNG BỘ QUEUE
//======================

async function dongBoQueue(){

    const queue = layQueue();
    
    if(queue.length === 0){
    
        return;
    
    }
    
    if(!navigator.onLine){
    
        return;
    
    }

    for(const item of queue){

        try{

            const res = await fetch(API_URL,{

                method:"POST",

                redirect:"follow",

                headers:{
                    "Content-Type":"text/plain;charset=utf-8"
                },

                body:JSON.stringify(item)

            });

            const data = await res.json();

            if(data.success || data.duplicate){

                xoaQueue(item.requestId);

            }else{

                break;

            }

        }catch(err){

            console.log("Offline Queue:",err);

            break;

        }

    }

}




window.addEventListener(

    "online",

    ()=>{

        dongBoQueue();

    }

);

console.log("APP JS OK");
