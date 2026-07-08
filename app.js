let loaiDiemDanh = "";
let scanner = null;
let daQuet = false;

const API_URL =
"https://script.google.com/macros/s/AKfycbzaEZKccf7M7YqXMjvmMz248gf6mJb9nkEYdwH7e_8GPQeDFuBrm9xXXYOGtKwFNhCS/exec";


//======================
// Chọn loại điểm danh
//======================

function startApp(loai){

    loaiDiemDanh = loai;

    document.querySelector(".home").style.display="none";
    document.getElementById("scannerBox").classList.remove("hidden");
    document.getElementById("typeTitle").innerText="Điểm danh: "+loai;

    startCamera();

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

    fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            maso:maso,
            loai:loaiDiemDanh

        })

    })

    .then(r=>r.json())

    .then(data=>{

        console.log(data);

        hienThi(data);

    })

    .catch(err=>{
    
        alert(err);
    
        console.error(err);
    
        hienThi({
    
            success:false,
    
            message:"Lỗi kết nối"
    
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

        code.innerHTML="Mã số: "+data.student.maso;

        if(data.student.hinh){

            photo.src=data.student.hinh;

            photo.style.display="block";

        }else{

            photo.style.display="none";

        }

    }else{

        name.innerHTML="";

        code.innerHTML=data.message || "";

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


console.log("APP JS OK");
