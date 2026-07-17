//======================================
// ATTENDANCE API
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceAPI = (()=>{

    //----------------------------------
    // CREATE REQUEST
    //----------------------------------

    function createRequest(maso){

        return{

            action : "attendance",

            maso : String(maso)
                .trim()
                .toUpperCase(),

            loai : AttendanceService.getCurrentType(),

            requestId :

                Date.now()

                + "_"

                + Math.random()

                    .toString(36)

                    .substring(2,8),

            time : Date.now()

        };

    }

    //----------------------------------
    // FETCH TIMEOUT
    //----------------------------------

    async function fetchWithTimeout(

        body,

        timeout = 6000

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

                    Config.API.URL,

                    {

                        method : "POST",

                        headers : {

                            "Content-Type":

                            "text/plain;charset=utf-8"

                        },

                        body :

                            JSON.stringify(body),

                        signal :

                            controller.signal

                    }

                );

            clearTimeout(timer);

            return await response.json();

        }

        catch(error){

            clearTimeout(timer);

            throw error;

        }

    }

    //----------------------------------
    // SEND
    //----------------------------------

    async function sendAttendance(maso){

        const request =

            createRequest(maso);

        //----------------------------------
        // Offline
        //----------------------------------

        if(!navigator.onLine){

            OfflineService.push(request);

            return{

                success : false,

                offline : true,

                maso : request.maso,

                message : "Offline"

            };

        }

        //----------------------------------
        // Online
        //----------------------------------

        try{

            return await fetchWithTimeout(

                request

            );

        }

        catch(error){

            OfflineService.push(request);

            return{

                success : false,

                offline : true,

                maso : request.maso,

                message : error.message

            };

        }

    }

    //----------------------------------
    // RESEND
    //----------------------------------

    async function resend(request){

        return await fetchWithTimeout(

            request

        );

    }

    //----------------------------------

    return{

        sendAttendance,

        resend

    };

})();
