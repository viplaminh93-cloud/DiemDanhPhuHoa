"use strict";

/**
 * POPUP RENDERER
 * Quản lý hiển thị thông tin kết quả điểm danh lên màn hình overlay
 */
const PopupRenderer = (() => {

    // Reset giao diện overlay
    function reset() {
        const overlay = Utils.id("overlay");
        if (overlay) overlay.className = "hidden";
    }

    // Hiển thị tiêu đề trạng thái
    function renderTitle(data) {
        let title = "❌ KHÔNG TÌM THẤY";
        if (data.success) title = "✅ ĐIỂM DANH THÀNH CÔNG";
        else if (data.offline) title = "📴 ĐÃ LƯU OFFLINE";
        else if (data.duplicate) title = "⚠️ ĐÃ ĐIỂM DANH";
        
        Renderer.text("overlayTitle", title);
    }

    // Render thông tin học sinh
    function renderStudent(data) {
        Renderer.image("overlayPhoto", data.photo || "../icons/avatar.png");
        Renderer.text("overlayName", data.hoten || "Không thấy tên");
        Renderer.text("overlayKhoi", data.khoi || "");
        Renderer.text("overlayClass", data.lop || "");
        Renderer.text("overlayCode", data.maso || "Không có mã số");
        Renderer.text("overlayTime", data.time || Utils.formatTime());
    }

    // Hiển thị lời nhắc
    function renderHint() {
        Renderer.text("overlayHint", "Chạm để tiếp tục");
    }

    // Thao tác hiển thị/ẩn overlay
    function show() { Renderer.show("overlay"); }
    function hide() { Renderer.hide("overlay"); }

    return { reset, renderTitle, renderStudent, renderHint, show, hide };
})();
