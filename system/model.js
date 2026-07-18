"use strict";

/**
 * MODEL MODULE
 * Quản lý cấu trúc dữ liệu Student và các hàm Getter/Validator.
 */
const Model = (() => {

    // Khởi tạo đối tượng Student chuẩn hóa
    function createStudent(data = {}) {
        return {
            success: Boolean(data.success),
            duplicate: Boolean(data.duplicate),
            offline: Boolean(data.offline),
            maso: data.maso || "",
            hoten: data.hoten || "",
            lop: data.lop || "",
            khoi: data.khoi || "",
            loai: data.loai || "",
            thoigian: data.thoigian || "",
            hinh: data.hinh || "",
            message: data.message || ""
        };
    }

    // Kiểm tra dữ liệu hợp lệ
    const isValid = (st) => st && st.success;

    // Getters
    const getName = (st) => st.hoten;
    const getCode = (st) => st.maso;
    const getClass = (st) => st.lop;
    const getKhoi = (st) => st.khoi;
    const getPhoto = (st) => st.hinh;
    const getTime = (st) => st.thoigian;
    const getMessage = (st) => st.message;

    return { 
        createStudent, isValid, 
        getName, getCode, getClass, getKhoi, 
        getPhoto, getTime, getMessage 
    };
})();
