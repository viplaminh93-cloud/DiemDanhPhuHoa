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

    debug(
        MODULE.API,
        "Receive QR: " + maso
    );

    const request = taoRequest(maso);

    debug(
        MODULE.API,
        "Request created"
    );

    debug(
        MODULE.API,
        "Send request"
    );
    
    const data = await guiRequest(request);

    debug(
        MODULE.API,
        "Request finished"
    );
  
    if(!data){
    
        return;
    
    }
    
    xuLyModel(data);

};






//======================================
// FETCH WITH TIMEOUT
//======================================

async function fetchWithTimeout(

    url,

    options,

    timeout = 5000

){

    const controller = new AbortController();

    const timer = setTimeout(

        ()=>controller.abort(),

        timeout

    );

    try{

        const response = await fetch(

            url,

            {

                ...options,

                signal:controller.signal

            }

        );

        clearTimeout(timer);

        return response;

    }

    catch(err){

        clearTimeout(timer);

        throw err;

    }

}





//======================================
// GỬI REQUEST
//======================================

async function guiRequest(request){

    debug(
        MODULE.API,
        "Fetch start"
    );

    try{

        const res = await fetchWithTimeout(

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

        const data = await res.json();
        
        debug(
            MODULE.API,
            "Fetch success"
        );
        
        return data;

    }

    catch(err){
    
        console.error(err);
    
        saveRequest(request);

        debug(
            MODULE.OFFLINE,
            "Request saved"
        );

        debug(
            MODULE.API,
            "Return offline response"
        );
    
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

    debug(
        MODULE.MODEL,
        "Process model"
    );

    if(data.offline){

        debug(
            MODULE.POPUP,
            "Show offline popup"
        );

        hienThi(data);

        return;

    }

    const hocSinh = taoHocSinh(data);

    xuLyResponse(hocSinh);

}

//======================================
// XỬ LÝ RESPONSE
//======================================

debug(
    MODULE.API,
    "Response received"
);





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





debug(

    "API",

    "api.js loaded"

);
