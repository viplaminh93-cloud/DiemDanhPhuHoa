//======================================
// DASHBOARD
//======================================

"use strict";



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

        renderDashboard(data);

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

function renderDashboard(data){

    id("tongDiemDanh").innerText =

        data.total;

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

        loadDashboard();

    }

);
