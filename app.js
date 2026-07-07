let loaiDiemDanh = "";

const API_URL =
"https://script.google.com/macros/s/AKfycbytCAIVzZ8bOrDu_TBpqGbnfzGd7IWQdwqowjuj40yea5t_Fjt8Wbta2vh5MvZrq-iflg/exec";


let scanner = null;
let daQuet = false;



function startApp(loai){

    loaiDiemDanh = loai;


    document.querySelector(".card").style.display="none";


    document.getElementById("scannerBox")
    .classList.remove("hidden");


    document.getElementById("typeTitle")
    .innerText =
    "Điểm danh: " + loai;


    startCamera();

}





async function startCamera(){


    scanner = new Html5Qrcode("reader");


    try{


        await scanner.start(

            {
                facingMode:"environment"
            },


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


        alert(
            "Không mở được camera:\n"+
            err
        );


        console.log(err);


    }

}





function qrSuccess(code){

    if(daQuet)
        return;


    daQuet=true;


    scanner.pause();


    guiDiemDanh(code);


}






function guiDiemDanh(maso){

fetch(API_URL,{

    method:"POST",

    body:JSON.stringify({

        maso:maso,

        loai:loaiDiemDanh

    })


})


.then(res=>res.json())


.then(data=>{


    hienThi(data);


})


.catch(err=>{

    alert("Lỗi kết nối: " + err);

    daQuet = false;

    try{
        scanner.resume();
    }catch(e){}

});


}





function hienThi(data){

    const overlay = document.getElementById("overlay");

    overlay.className = "";

    document.getElementById("overlayPhoto").style.display = "none";
    document.getElementById("overlayClass").style.display = "none";

    if(data.success){

        overlay.classList.add("success");

        document.getElementById("overlayIcon").innerHTML = "✅";
        document.getElementById("overlayTitle").innerHTML = "ĐIỂM DANH THÀNH CÔNG";

    }
    else if(data.duplicate){

        overlay.classList.add("warning");

        document.getElementById("overlayIcon").innerHTML = "⚠️";
        document.getElementById("overlayTitle").innerHTML = "ĐÃ ĐIỂM DANH";

    }
    else{

        overlay.classList.add("error");

        document.getElementById("overlayIcon").innerHTML = "❌";
        document.getElementById("overlayTitle").innerHTML = "KHÔNG TÌM THẤY";

    }


    if(data.student){

        document.getElementById("overlayPhoto").src = data.student.hinh;
        document.getElementById("overlayPhoto").style.display = "block";

        document.getElementById("overlayName").innerHTML = data.student.hoten;

        document.getElementById("overlayCode").innerHTML = data.student.maso;

    }else{

        document.getElementById("overlayName").innerHTML = "";

        document.getElementById("overlayCode").innerHTML = "";

    }


    overlay.classList.remove("hidden");

}


document.getElementById("overlay").addEventListener("click", function(){

    this.classList.add("hidden");

    daQuet = false;

    try{
        scanner.resume();
    }catch(e){}

});
