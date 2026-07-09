let loaiDiemDanh = "";
let scanner = null;
let daQuet = false;
let tongHomNay = 0;

const API_URL =
"https://script.google.com/macros/s/AKfycbyJhX8Lx2fWzDtZN24EmdoH6jy7Pf4drlkunxXUuf3i4p0JYmjjL9KF06pJQ9u5BQL2mQ/exec";


//======================
// Chọn loại điểm danh
//======================

function startApp(loai){

    loaiDiemDanh = loai;

    document.querySelector(".home").style.display="none";

    document.getElementById("scannerBox")
        .classList.remove("hidden");

    document.getElementById("typeTitle")
        .innerText = "Điểm danh: " + loai;

    loadTodayCount();      // ← thêm dòng này

    startCamera();

}


function loadTodayCount(){

    fetch(
        API_URL +
        "?count=1&loai=" +
        encodeURIComponent(loaiDiemDanh)
    )

    .then(res => res.json())

    .then(data => {

        document.getElementById("todayCount").innerHTML =
            "👦 Đã điểm danh hôm nay: <b>" +
            data.count +
            "</b> em";

    })

    .catch(err=>{

        console.log(err);

    });

}



//======================
// Camera
//======================

async function startCamera(){

    scanner = new Html5Qrcode("reader");

    try{

        await scanner.start(

            { facingMode:"environment" },

            {
                fps:10,
                qrbox:{
                    width:250,
                    height:250
                }
            },

            qrSuccess

        );

    }catch(err){

        alert("Không mở được camera\n\n"+err);

    }

}



//======================
// Quét thành công
//======================

function qrSuccess(text){

     console.log("QR ĐỌC ĐƯỢC:", text);

    if(daQuet) return;

    daQuet=true;

    scanner.pause();

    guiDiemDanh(text);

}



//======================
// Gửi Apps Script
//======================

function guiDiemDanh(maso){

    maso = maso.trim().toUpperCase();

    fetch(API_URL, {
        method: "POST",
        redirect: "follow",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
            maso: maso,
            loai: loaiDiemDanh
        })
    })

    .then(response => response.text())

    .then(text => {

        console.log("Server:", text);

        const data = JSON.parse(text);

        hienThi(data);

    })

    .catch(err => {

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
    
    
    const overlay=document.getElementById("overlay");

    overlay.classList.remove("hidden","success","warning","error");

    const icon=document.getElementById("overlayIcon");
    const title=document.getElementById("overlayTitle");
    const photo=document.getElementById("overlayPhoto");
    const name=document.getElementById("overlayName");
    const code=document.getElementById("overlayCode");
    const lop=document.getElementById("overlayClass");
    const time=document.getElementById("overlayTime");



    
    if(data.tong != null){
    
        tongHomNay = parseInt(data.tong,10);
    
        if(!isNaN(tongHomNay)){
            capNhatTong();
        }
    
    }

    if(data.success){

        overlay.classList.add("success");

        icon.innerHTML="✅";

        title.innerHTML="ĐIỂM DANH THÀNH CÔNG";

    }

    else if(data.duplicate){

        overlay.classList.add("warning");

        icon.innerHTML="⚠️";

        title.innerHTML="ĐÃ ĐIỂM DANH";

    }

    else{

        overlay.classList.add("error");

        icon.innerHTML="❌";

        title.innerHTML="KHÔNG TÌM THẤY";

    }



    if(data.student){

        name.innerHTML=data.student.hoten;
        lop.innerHTML = data.student.lop
            ? "Lớp: " + data.student.lop
            : "";
        code.innerHTML="Mã số: "+data.student.maso;
        
        
        if(data.duplicate && data.gio){
        
            time.innerHTML =
            "🕒 Đã điểm danh lúc: " + data.gio;
        
        }else{
        
            time.innerHTML = "";
        
        }

        
        if(data.student.hinh){

            photo.src=data.student.hinh;

            photo.style.display="block";

        }else{

            photo.style.display="none";

        }

    }else{

            name.innerHTML="";
            lop.innerHTML="";
            code.innerHTML=data.message || "";
            time.innerHTML="";
            photo.style.display="none";

    }

}



//======================
// Chạm popup để quét tiếp
//======================

window.onload=function(){

    document.getElementById("overlay")
    .addEventListener("click",function(){

        this.classList.add("hidden");

        daQuet=false;

        if(scanner){

            scanner.resume();

        }

    });

}



//======================
// Quay lại
//======================

async function backHome(){

    try{

        if(scanner){

            await scanner.stop();

            scanner.clear();

        }

    }catch(e){}

    daQuet=false;

    document.querySelector(".home").style.display="block";

    document.getElementById("scannerBox").classList.add("hidden");

}

function capNhatTong(){

    document.getElementById("todayCount").innerHTML =
    "👦 Đã điểm danh hôm nay: <b>"
    + tongHomNay +
    "</b> em";

}


console.log("APP JS OK");
