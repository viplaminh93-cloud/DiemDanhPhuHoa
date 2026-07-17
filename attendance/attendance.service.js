//======================================
// ATTENDANCE SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceService = (()=>{

    /**
     * ======================================
     * GỬI ĐIỂM DANH
     * ======================================
     */

    async function sendAttendance(qrText,loai){

        return await Api.post({

            action:"attendance",

            maso:qrText,

            loai:loai

        });

    }

    /**
     * ======================================
     * TỔNG HÔM NAY
     * ======================================
     */

    async function getTodayCounter(loai){

        const result =

            await Api.get({

                action:"todayCounter",

                loai:loai

            });

        if(!result.success){

            return 0;

        }

        return Number(

            result.total || 0

        );

    }

    return{

        sendAttendance,

        getTodayCounter

    };

})();
