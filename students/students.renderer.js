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

const StudentRenderer = (() => {

    /*function renderList(list) {
        const container = Utils.id("studentList");
        container.innerHTML = "";

        list.forEach(student => {
            const card = Utils.create("div"); 
            card.className = "student-card";
            card.style.borderLeft = `8px solid ${student.mauKhoi || "#1565C0"}`;
            
            card.innerHTML = `
                <img class="student-photo" src="${student.hinh || "/QuanLyTNTT/icons/avatar.png"}">
                <div class="student-info">
                    <div class="student-name">${student.hoten}</div>
                    <div class="student-row">Mã số: ${student.maso}</div>
                    <div class="student-row">Lớp: ${student.lop}</div>
                </div>`;

            card.addEventListener("click", () => openModal(student));
            container.appendChild(card);
        });
    }*/


    function renderList(list) {
        const container = Utils.id("studentList");
        container.innerHTML = "";

        list.forEach(student => {
            const card = Utils.create("div"); 
            card.className = "student-card";
            card.style.borderLeft = `8px solid ${student.mauKhoi || "#1565C0"}`;
            
            card.innerHTML = `
                <img class="student-photo" src="${student.hinh || "/QuanLyTNTT/icons/avatar.png"}">
                <div class="student-info">
                    <div class="student-name">${student.hoten}</div>
                    <div class="student-row">Mã số: ${student.maso}</div>
                    <div class="student-row">Lớp: ${student.lop}</div>
                    <div class="student-stats">
                        <span class="stat-item">Lễ: <b>${student.soBuoiLe}</b></span>
                        <span class="stat-item">GL: <b>${student.soBuoiGiaoLy}</b></span>
                    </div>
                </div>`;

            card.addEventListener("click", () => openModal(student));
            container.appendChild(card);
        });
    }



    

    function openModal(student) {
        Utils.id("modalPhoto").src = student.hinh || "/QuanLyTNTT/icons/avatar.png";
        Utils.id("modalName").innerText = student.hoten;
        Utils.id("modalInfo").innerHTML = `
            <div class="info-row"><span>Mã số</span><b>${student.maso}</b></div>
            <div class="info-row"><span>Lớp</span><b>${student.lop}</b></div>
            <div class="info-row"><span>Lễ</span><b>${student.soBuoiLe}</b></div>
            <div class="info-row"><span>Giáo Lý</span><b>${student.soBuoiGiaoLy}</b></div>
            <div class="info-row"><span>Trạng thái</span><b>${student.trangthai}</b></div>`;
        Utils.show(Utils.id("studentModal"));
    }


    
    function closeModal() {
        Utils.hide(Utils.id("studentModal"));
    }

    return { renderList, openModal, closeModal };

    
})();
