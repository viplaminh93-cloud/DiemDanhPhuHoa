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



/**
 * Render danh sách thiếu nhi ra giao diện
 * @param {Array} list - Danh sách đối tượng thiếu nhi
 */
function renderList(list) {
    const container = Utils.id("studentList");
    container.innerHTML = ""; // Xóa danh sách cũ

    list.forEach(student => {
        const card = create("div");
        card.className = "student-card";
        // Màu viền dựa trên thuộc tính mauKhoi hoặc mặc định
        card.style.borderLeft = 8px solid ${student.mauKhoi || "#1565C0"};
        
        card.innerHTML = 
            <img class="student-photo" src="${student.hinh || 'images/avatar.png'}">
            <div class="student-info">
                <div class="student-name">${student.hoten}</div>
                <div class="student-row">Mã số: ${student.maso}</div>
                <div class="student-row">Lớp: ${student.malop}</div>
                <div class="student-row">${student.trangthai}</div>
            </div>
        ;

        card.addEventListener("click", () => openModal(student));
        container.appendChild(card);
    });
}

/**
 * Hiển thị Modal chi tiết thông tin thiếu nhi
 * @param {Object} student - Đối tượng thiếu nhi cần xem
 */
function openModal(student) {
    // Cập nhật ảnh và tên
    Utils.id("modalPhoto").src = student.hinh || "images/no-photo.png";
    Utils.id("modalName").innerText = student.hoten;

    // Cập nhật thông tin chi tiết
    Utils.id("modalInfo").innerHTML = 
        <div class="info-row"><span>Mã số</span><b>${student.maso}</b></div>
        <div class="info-row"><span>Lớp</span><b>${student.lop}</b></div>
        <div class="info-row"><span>Khối</span><b>${student.khoi}</b></div>
        <div class="info-row"><span>Trạng thái</span><b>${student.trangthai}</b></div>
    ;

    Renderer.show(Utils.id("studentModal")); // Hiển thị modal
}

    //======================================
    // CLOSE MODAL
    //======================================

    function closeModal(){

        Renderer.hide(

            Utils.id("studentModal")

        );

    }

/*    //======================================
    // PUBLIC
    //======================================

    return{

        renderList,

        openModal,

        closeModal

    };

})(); */
