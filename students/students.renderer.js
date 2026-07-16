//==================================================
// STUDENTS RENDERER
//
// Render giao diện Module Students
//
// Bao gồm:
//
// - Danh sách Thiếu nhi
// - Modal thông tin
// - Đóng Modal
//
//==================================================

"use strict";

const StudentRenderer = (()=>{

    //======================================
    // RENDER LIST
    //======================================

    function renderList(list){

        const container =

            id("studentList");

        container.innerHTML = "";

        list.forEach(student=>{

            const card =

                create("div");

            card.className =

                "student-card";

            card.style.borderLeft =

                "8px solid "

                +

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

            card.addEventListener(

                "click",

                ()=>{

                    openModal(student);

                }

            );

            container.appendChild(card);

        });

    }

    //======================================
    // OPEN MODAL
    //======================================

    function openModal(student){

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

    function closeModal(){

        hide(

            id("studentModal")

        );

    }

    //======================================
    // PUBLIC
    //======================================

    return{

        renderList,

        openModal,

        closeModal

    };

})();
