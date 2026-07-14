//======================================
// STUDENTS
//======================================

"use strict";



//======================================
// LOAD
//======================================

window.addEventListener(

    "load",

    ()=>{

        loadStudents();

    }

);




//======================================
// LOAD STUDENTS
//======================================

async function loadStudents(){

    try{

        const response = await fetch(

            CONFIG.API.URL,

            {

                method:"POST",

                headers:{

                    "Content-Type":"text/plain;charset=utf-8"

                },

                body:JSON.stringify({

                    action:"students"

                })

            }

        );

        const data = await response.json();

        if(!data.success){

            alert(

                "Không lấy được danh sách."

            );

            return;

        }

        renderStudents(

            data.list

        );

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

function renderStudents(list){

    const container =

        id("studentList");

    container.innerHTML = "";

    list.forEach(student=>{

        const card =

            create("div");

        card.className =

            "student-card";

        card.innerHTML =

        `
        <img
            class="student-photo"
            src="${student.hinh || 'images/avatar.png'}">

        <div class="student-info">

            <div class="student-name">

                ${student.hoten}

            </div>

            <div class="student-row">

                Mã số:
                ${student.maso}

            </div>

            <div class="student-row">

                Lớp:
                ${student.malop}

            </div>

            <div class="student-row">

                ${student.trangthai}

            </div>

        </div>
        `;

        container.appendChild(card);

    });

}
