"use strict";

/**
 * POPUP SERVICE
 * Quản lý logic hiển thị và đóng popup kết quả
 */
const PopupService = (() => {
    let showing = false;

    // Hiển thị popup với dữ liệu trả về
    function show(data) {
        Debug.write("DEBUG POPUP DATA:", data);
        showing = true;
        PopupRenderer.reset();
        PopupRenderer.renderTitle(data);
        PopupRenderer.renderStudent(data);
        PopupRenderer.renderHint();
        PopupRenderer.show();
    }

    // Đóng popup
    async function close() {
        if (!showing) return;
        
        showing = false;
        PopupRenderer.hide();
        await Utils.sleep(150);
        
        // Gọi lại controller để xử lý logic sau khi đóng
        AttendanceController.closePopup();
    }

    // Kiểm tra trạng thái hiển thị
    function isShowing() {
        return showing;
    }

    // Lắng nghe sự kiện click đóng trên overlay
    const overlay = Utils.id("overlay");
    if (overlay) {
        overlay.addEventListener("click", close);
    }

    return { show, close, isShowing };
})();
