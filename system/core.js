"use strict";

/**
 * CORE MODULE
 * Quản lý trạng thái toàn cục của ứng dụng (State, Getter, Setter, Reset).
 */
const Core = (() => {

    // Trạng thái ứng dụng
    const state = {
        loaiDiemDanh: "",
        tongHomNay: 0,
        scanner: null,
        dangXuLy: false,
        syncing: false
    };

    // Lấy giá trị state
    const get = (key) => state[key];

    // Cập nhật giá trị state
    const set = (key, value) => { state[key] = value; };

    // Reset về trạng thái ban đầu
    const reset = () => {
        state.loaiDiemDanh = "";
        state.tongHomNay = 0;
        state.scanner = null;
        state.dangXuLy = false;
        state.syncing = false;
    };

    return { get, set, reset };
})();
