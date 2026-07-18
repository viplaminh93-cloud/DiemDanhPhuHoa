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

    function renderList(list) {
        // Sử dụng Utils.id
        const container = Utils.id("studentList");
        container.innerHTML = "";

        list.forEach(student => {
            // Sử dụng Utils.create (hoặc document.createElement nếu bạn chưa có hàm Utils.create)
            const card = Utils.create("div"); 
            card.className = "student-card";
            card.style.borderLeft = `8px solid ${student.mauKhoi || "#1565C0"}`;
            
            card.innerHTML = `
                <img class="student-photo" src="${student.hinh || 'images/avatar.png'}">
                <div class="student-info">
                    <div class="student-name">${student.hoten}</div>
                    <div class="student-row">Mã số: ${student.maso}</div>
                    <div class="student-row">Lớp: ${student.malop}</div>
                    <div class="student-row">${student.trangthai}</div>
                </div>`;

            card.addEventListener("click", () => openModal(student));
            container.appendChild(card);
        });
    }

    function openModal(student) {
        // Sửa toàn bộ thành Utils.id, Utils.show
        Utils.id("modalPhoto").src = student.hinh || "images/no-photo.png";
        Utils.id("modalName").innerText = student.hoten;
        Utils.id("modalInfo").innerHTML = `
            <div class="info-row"><span>Mã số</span><b>${student.maso}</b></div>
            <div class="info-row"><span>Lớp</span><b>${student.lop}</b></div>
            <div class="info-row"><span>Khối</span><b>${student.khoi}</b></div>
            <div class="info-row"><span>Trạng thái</span><b>${student.trangthai}</b></div>`;

        Utils.show(Utils.id("studentModal"));
    }

    function closeModal() {
        // Sửa thành Utils.hide
        Utils.hide(Utils.id("studentModal"));
    }

    return { renderList, openModal, closeModal };
})();
