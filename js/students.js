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
        
        card.style.borderLeft =
        
            "8px solid " +
        
            (student.mauKhoi || "#1565C0");

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

        card.addEventListener(
        
            "click",
        
            ()=>{
        
                openStudent(student);
        
            }
        
        );
    

    });

}





//======================================
// OPEN STUDENT
//======================================

function openStudent(student){

    id("modalPhoto").src =

        student.hinh;

    id("modalName").innerText =

        student.hoten;

    id("modalInfo").innerHTML =

        `
        <b>Mã số:</b> ${student.maso}<br>

        <b>Lớp:</b> ${student.lop}<br>

        <b>Khối:</b> ${student.khoi}<br>

        <b>Trạng thái:</b> ${student.trangthai}
        `;

    show(

        id("studentModal")

    );

}



//======================================
// CLOSE MODAL
//======================================

id("studentModal")

.addEventListener(

    "click",

    e=>{

        if(

            e.target.id ==

            "studentModal"

        ){

            hide(

                id("studentModal")

            );

        }

    }

);
