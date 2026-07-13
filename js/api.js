//======================================
// API
// Giáo xứ Phú Hòa
//======================================

"use strict";


//======================================
// TẠO REQUEST
//======================================

function taoRequest(maso){

    return{

        maso: maso.trim().toUpperCase(),

        loai: App.loaiDiemDanh,

        requestId:
            Date.now()
            + "_"
            + Math.random(),

        time: Date.now()

    };

}








//======================================
// NHẬN QR TỪ CAMERA
//======================================

App.onQRCode = async function(maso){

    const request = taoRequest(maso);

    const data = await guiRequest(request);

    alert(JSON.stringify(data));
    
    if(!data){
    
        return;
    
    }
    
    xuLyModel(data);

};








//======================================
// GỬI REQUEST
//======================================

async function guiRequest(request){

    try{

        const res = await fetch(

            CONFIG.API.URL,

            {

                method:"POST",

                redirect:"follow",

                headers:{

                    "Content-Type":"text/plain;charset=utf-8"

                },

                body: JSON.stringify(request)

            }

        );

        return await res.json();

    }

    catch(err){
    
        console.error(err);
    
        saveRequest(request);
    
        return {
    
            success:false,
    
            offline:true,
    
            message:"Đã lưu, sẽ đồng bộ khi có mạng."
    
        };
    
    }

}




//======================================
// XỬ LÝ MODEL
//======================================

function xuLyModel(data){

    if(data.offline){

        hienThi(data);

        return;

    }

    const hocSinh = taoHocSinh(data);

    xuLyResponse(hocSinh);

}

//======================================
// XỬ LÝ RESPONSE
//======================================

function xuLyResponse(hocSinh){

    console.log(hocSinh);

    capNhatDem(hocSinh);

    hienThi(hocSinh);

}






//======================================
// CẬP NHẬT BỘ ĐẾM
//======================================

function capNhatDem(hocSinh){

    if(!hocSinh.success){

        return;

    }

    App.tongHomNay++;

    capNhatTong();

}





//======================================
// XỬ LÝ LỖI
//======================================

function xuLyError(message){

    hienThi({

        success:false,

        message:message

    });

}






console.log("api.js loaded");
