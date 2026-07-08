let loaiDiemDanh = "";
let scanner = null;
let daQuet = false;



const API_URL =
"https://script.google.com/macros/s/AKfycbyscKv7Kws2LGBsekdr8jmz19FD-ejMl4msXASxQs1Xg4jN8v8eM-fSDukB9_zrLHB2Gg/exec";



function startApp(loai){

    loaiDiemDanh = loai;


    document.querySelector(".home")
    .style.display = "none";


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


    }

    catch(err){

        alert(
            "Không mở được camera:\n"+
            err
        );

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

    console.log(data);

    hienThi(data);


})



.catch(err=>{


    hienThi({

        success:false,

        message:"Lỗi kết nối"

    });


});



}








function hienThi(data){



const overlay =
document.getElementById("overlay");



overlay.classList.remove(
"hidden",
"success",
"warning",
"error"
);





if(data.success){


    overlay.classList.add("success");


    overlayIcon.innerHTML="✅";

    overlayTitle.innerHTML=
    "ĐIỂM DANH THÀNH CÔNG";


}

else if(data.duplicate){


    overlay.classList.add("warning");


    overlayIcon.innerHTML="⚠️";

    overlayTitle.innerHTML=
    "ĐÃ ĐIỂM DANH";


}

else{


    overlay.classList.add("error");


    overlayIcon.innerHTML="❌";

    overlayTitle.innerHTML=
    "KHÔNG TÌM THẤY";


}




if(data.student){


    overlayPhoto.src =
    data.student.hinh;


    overlayPhoto.style.display=
    "block";


    overlayName.innerHTML =
    data.student.hoten;


    overlayCode.innerHTML =
    "Mã số: "
    + data.student.maso;



}
else{


    overlayPhoto.style.display="none";


    overlayName.innerHTML="";


    overlayCode.innerHTML=
    data.message;


}




}








window.onload = function(){

    const overlay =
    document.getElementById("overlay");

    if(overlay){

        overlay.addEventListener(
        "click",
        function(){

            this.classList.add("hidden");

            daQuet=false;

            try{
                scanner.resume();
            }
            catch(e){}

        });

    }

};








async function backHome(){



try{

    if(scanner){

        await scanner.stop();

        scanner.clear();

    }

}
catch(e){}



    document.querySelector(".home")
    .style.display="block";


    document.getElementById("scannerBox")
    .classList.add("hidden");



}






console.log("APP JS OK - startApp:", typeof startApp);

