//======================================
// API
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * API MODULE
 *
 * Chức năng:
 * - Tạo request
 * - Gửi Apps Script
 * - Đồng bộ Offline
 * - Trả dữ liệu về Attendance Service
 *
 * Không render giao diện.
 * Không xử lý Camera.
 * ======================================
 */

const AttendanceAPI = (()=>{

    //======================================
    // TẠO REQUEST
    //======================================

    function createRequest(maso){

        return{

            maso :
                maso
                    .trim()
                    .toUpperCase(),

            loai :
                App.loaiDiemDanh,

            requestId :
                Date.now()
                + "_"
                + Math.random(),

            time :
                Date.now()

        };

    }

    //======================================
    // FETCH TIMEOUT
    //======================================

    async function fetchWithTimeout(

        url,

        options,

        timeout = 5000

    ){

        const controller =

            new AbortController();

        const timer =

            setTimeout(

                ()=>controller.abort(),

                timeout

            );

        try{

            const response =

                await fetch(

                    url,

                    {

                        ...options,

                        signal:

                            controller.signal

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
    // POST
    //======================================

    async function post(request){

        const response =

            await fetchWithTimeout(

                CONFIG.API.URL,

                {

                    method :

                        "POST",

                    redirect :

                        "follow",

                    headers : {

                        "Content-Type":

                        "text/plain;charset=utf-8"

                    },

                    body :

                        JSON.stringify(request)

                }

            );

        return await response.json();

    }

    //======================================
    // RESEND
    //======================================

    async function resend(request){

        debug(

            MODULE.API,

            "Resend : "

            + request.maso

        );

        return await post(request);

    }

    //======================================
    // SEND REQUEST
    //======================================

    async function send(request){

        //----------------------------------
        // OFFLINE
        //----------------------------------

        if(!navigator.onLine){

            saveRequest(request);

            return{

                success : false,

                offline : true,

                maso : request.maso,

                message :

                    "Đã lưu, sẽ đồng bộ khi có mạng."

            };

        }

        //----------------------------------
        // ONLINE
        //----------------------------------

        try{

            return await post(request);

        }

        catch(err){

            console.error(err);

            saveRequest(request);

            return{

                success : false,

                offline : true,

                maso : request.maso,

                message :

                    "Đã lưu, sẽ đồng bộ khi có mạng."

            };

        }

    }

    //======================================
    // QR CALLBACK
    //======================================

    async function receiveQRCode(maso){

        debug(

            MODULE.API,

            "QR : " + maso

        );

        const request =

            createRequest(maso);

        const response =

            await send(request);

        AttendanceService.processResponse(

            response

        );

    }

    //======================================

    return{

        createRequest,

        receiveQRCode,

        resend,

        send,

        post

    };

})();
