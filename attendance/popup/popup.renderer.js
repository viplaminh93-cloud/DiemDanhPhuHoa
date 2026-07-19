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
        // Nếu data có chứa thông tin học sinh (khi success là true hoặc có object student)
        const s = data.student || data; 
    
        Renderer.image("overlayPhoto", s.photo || s.hinh || "/QuanLyTNTT/icons/avatar.png");
        Renderer.text("overlayName", s.hoten || "Không tìm thấy tên");
        Renderer.text("overlayClass", s.lop || "");
        Renderer.text("overlayCode", s.maso || "");
        Renderer.text("overlayTime", data.time || Utils.formatTime());
        
        // Nếu có lỗi, bạn có thể muốn hiện message lỗi ở đâu đó
        if (!data.success && data.message) {
            Renderer.text("overlayName", data.message); // Ghi đè tên bằng thông báo lỗi
        }
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
