//======================================
// API
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * API MODULE
 *
 * Chức năng
 * - Tạo Request
 * - Gửi Apps Script
 * - Đồng bộ Offline
 * - Trả dữ liệu về AttendanceService
 *
 * Không xử lý UI.
 * Không xử lý Popup.
 * Không xử lý Camera.
 * ======================================
 */

const AttendanceAPI = (()=>{

    //======================================
    // CREATE REQUEST
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
    // FETCH WITH TIMEOUT
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

                        signal :

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

    async function sendAttendance(maso){
    
        const request = createRequest(maso);
    
        return await send(request);
    
    }



    //======================================

return{

    sendAttendance,

    resend,

    post

};
