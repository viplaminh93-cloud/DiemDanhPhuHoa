let loaiDiemDanh = "";

const API_URL =
"https://script.google.com/macros/s/AKfycbzOTHHF58Ru41WPz9vvVaUCkdUUeQAfgiMBX75h5DLUJ5ttlc65_4EoP7ViQ9rCTFsclA/exec";


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


    document.getElementById("result")
    .style.display="block";



    if(data.student){


        document.getElementById("photo")
        .src=data.student.hinh;



        document.getElementById("name")
        .innerHTML =
        data.student.hoten;


    }



    if(data.success){
    
        document.getElementById("message").innerHTML =
        "✅ " + data.message;
    
    }else if(data.duplicate){
    
        document.getElementById("message").innerHTML =
        "⚠️ " + data.message;
    
    }else{
    
        document.getElementById("message").innerHTML =
        "❌ " + data.message;
    
    }



    setTimeout(()=>{
    
        document.getElementById("result").style.display="none";
    
        daQuet = false;
    
        try{
            scanner.resume();
        }catch(e){}
    
    },2500);



}
