"use strict";

/**
 * RENDERER MODULE
 * Quản lý các thao tác DOM cơ bản (Text, HTML, Image, Show/Hide, Class)
 */
const Renderer = (() => {

    // Helper kiểm tra phần tử tồn tại
    const getEl = (id) => Utils.id(id);

    // Cập nhật nội dung
    function text(id, val = "") { const el = getEl(id); if (el) el.innerText = val; }
    function html(id, val = "") { const el = getEl(id); if (el) el.innerHTML = val; }
    function image(id, src = "") { const el = getEl(id); if (el) el.src = src; }
    function value(id, val = "") { const el = getEl(id); if (el) el.value = val; }

    // Thao tác hiển thị (Show/Hide)
    function show(id) { Utils.show(getEl(id)); }
    function hide(id) { Utils.hide(getEl(id)); }
    function toggle(id) { Utils.toggle(getEl(id)); }

    // Thao tác Class
    function addClass(id, cls) { const el = getEl(id); if (el) el.classList.add(cls); }
    function removeClass(id, cls) { const el = getEl(id); if (el) el.classList.remove(cls); }
    function hasClass(id, cls) { const el = getEl(id); return el ? el.classList.contains(cls) : false; }

    // Khác
    function clear(id) { html(id, ""); }

    return { text, html, image, value, show, hide, toggle, addClass, removeClass, hasClass, clear };
})();
