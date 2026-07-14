//======================================
// DASHBOARD
//======================================

"use strict";



//======================================
// SAMPLE DATA
//======================================

const sampleData = {

    tong:128,

    le:72,

    giaoly:56,

    list:[

        {

            maso:"12015",

            hoten:"Nguyễn Văn An",

            loai:"Dự lễ",

            gio:"07:12"

        },

        {

            maso:"11008",

            hoten:"Trần Gia Bảo",

            loai:"Giáo lý",

            gio:"08:03"

        },

        {

            maso:"13002",

            hoten:"Lê Minh Đức",

            loai:"Dự lễ",

            gio:"07:25"

        }

    ]

};



//======================================
// LOAD
//======================================

window.addEventListener(

    "load",

    ()=>{

        renderDashboard(

            sampleData

        );

    }

);



//======================================
// RENDER
//======================================

function renderDashboard(data){

    id("tongDiemDanh").innerText =

        data.tong;

    id("tongLe").innerText =

        data.le;

    id("tongGiaoLy").innerText =

        data.giaoly;

    renderTable(

        data.list

    );

}



//======================================
// TABLE
//======================================

function renderTable(list){

    const body =

        id("attendanceBody");

    body.innerHTML = "";

    list.forEach(

        (item,index)=>{

            const tr =

                document.createElement("tr");

            tr.innerHTML =

                "<td>" + (index+1) + "</td>"

                +

                "<td>" + item.maso + "</td>"

                +

                "<td>" + item.hoten + "</td>"

                +

                "<td>" + item.loai + "</td>"

                +

                "<td>" + item.gio + "</td>";

            body.appendChild(tr);

        }

    );

}



//======================================
// REFRESH
//======================================

id(

    "btnRefresh"

).addEventListener(

    "click",

    ()=>{

        alert(

            "Sprint sau sẽ lấy dữ liệu từ Apps Script."

        );

    }

);
