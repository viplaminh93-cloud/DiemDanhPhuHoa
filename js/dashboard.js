//======================================
// DASHBOARD
//======================================

"use strict";

let currentType = "Dự lễ";

let dashboardData = null;

//======================================
// LOAD
//======================================

window.addEventListener(

    "load",

    ()=>{

        loadDashboard();

        id(

            "btnRefresh"

        ).addEventListener(

            "click",

            loadDashboard

        );

    }

);




//======================================
// LOAD DASHBOARD
//======================================

async function loadDashboard(){

    try{

        const response = await fetch(

            CONFIG.API.URL,

            {

                method:"POST",

                headers:{

                    "Content-Type":"text/plain;charset=utf-8"

                },

                body:JSON.stringify({

                    action:"dashboard"

                })

            }

        );

        const data = await response.json();

        if(!data.success){

            alert(

                "Không lấy được Dashboard."

            );

            return;

        }

        dashboardData = data;
        
        renderDashboard();

    }

    catch(err){

        console.error(err);

        alert(

            "Không kết nối được máy chủ."

        );

    }

}




//======================================
// RENDER
//======================================

function renderDashboard(){

    id("tongLe").innerText =
        dashboardData.le;

    id("tongGiaoLy").innerText =
        dashboardData.giaoly;

    renderTable();

}



//======================================
// TABLE
//======================================

function renderTable(){

    const body =
        id("attendanceBody");

    body.innerHTML = "";

    const list =
        dashboardData.list.filter(item=>{

            return item.lop === currentType;

        });

    id("tongDanhSach").innerText =
        list.length;

    list.forEach((item,index)=>{

        const tr =
            document.createElement("tr");

        tr.innerHTML =

            "<td>"+(index+1)+"</td>"

            +

            "<td>"+item.maso+"</td>"

            +

            "<td>"+item.hoten+"</td>"

            +

            "<td>"+(item.lop||"")+"</td>"

            +

            "<td>"+item.gio+"</td>";

        body.appendChild(tr);

    });

}



//======================================
// REFRESH
//======================================

id(

    "btnRefresh"

).addEventListener(

    "click",

    ()=>{

        loadDashboard();

    }

);


//======================================
// BUTTON
//======================================

id("btnLe").onclick = ()=>{

    currentType = "Dự lễ";

    renderTable();

}

id("btnGiaoLy").onclick = ()=>{

    currentType = "Giáo lý";

    renderTable();

}
