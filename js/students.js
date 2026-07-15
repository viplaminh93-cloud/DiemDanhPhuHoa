//======================================
// STUDENTS
//======================================

"use strict";


let allStudents = [];





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

            allStudents = data.list;

            console.log(data.list[0]);
            
            renderStudents(allStudents);

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
    
        student.hinh ||
    
        "images/no-photo.png";

    id("modalName").innerText =

        student.hoten;

    id("modalInfo").innerHTML =
    
    `
    <div class="info-row">
    
        <span>Mã số</span>
    
        <b>${student.maso}</b>
    
    </div>
    
    <div class="info-row">
    
        <span>Lớp</span>
    
        <b>${student.lop}</b>
    
    </div>
    
    <div class="info-row">
    
        <span>Khối</span>
    
        <b>${student.khoi}</b>
    
    </div>
    
    <div class="info-row">
    
        <span>Trạng thái</span>
    
        <b>${student.trangthai}</b>
    
    </div>
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




id("txtSearch").addEventListener(

    "input",

    filterStudents

);

function filterStudents(){

    const keyword =

        id("txtSearch")

        .value

        .trim()

        .toLowerCase();

    if(keyword === ""){

        renderStudents(allStudents);

        return;

    }

    const result = allStudents.filter(student=>{

        return (

            String(student.maso)

                .toLowerCase()

                .includes(keyword)

            ||

            String(student.hoten)

                .toLowerCase()

                .includes(keyword)

        );

    });

    renderStudents(result);

}
