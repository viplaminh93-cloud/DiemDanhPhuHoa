//======================================
// ATTENDANCE SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceService = (()=>{

    //----------------------------------
    // GỬI ĐIỂM DANH
    //----------------------------------

    async function sendAttendance(qrText, loai){

        return await AttendanceAPI.sendAttendance(

            qrText,

            loai

        );

    }

    //----------------------------------
    // LẤY TỔNG HÔM NAY
    //----------------------------------

    async function getTodayCounter(loai){

        try{

            const response = await Auth.post({

                action : "todayCounter",

                loai : loai

            });

            if(!response.success){

                return 0;

            }

            return Number(

                response.total || 0

            );

        }

        catch(error){

            console.error(error);

            return 0;

        }

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        sendAttendance,

        getTodayCounter

    };

})();
