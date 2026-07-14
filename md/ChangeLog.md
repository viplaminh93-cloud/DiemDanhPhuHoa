# CHANGELOG

Tất cả các thay đổi lớn của hệ thống đều được ghi tại đây.

---

# Version 1.0.0

## Khởi tạo dự án

### Backend

* Xây dựng Google Apps Script.
* Quản lý học sinh.
* Quản lý lớp học.
* Điểm danh QR.
* Đồng bộ QR.
* Đồng bộ ảnh.
* Dashboard kiểm tra dữ liệu.
* Cache học sinh.
* Cache điểm danh.
* Menu quản trị.

---

### Frontend

* Giao diện điểm danh.
* Quét QR bằng Camera.
* Popup kết quả.
* Hiển thị ảnh học sinh.
* Hiển thị lớp.
* Hiển thị khối.
* Hiển thị tổng số điểm danh.

---

### PWA

* Manifest.
* Service Worker.
* Cài đặt ứng dụng.
* Splash Screen.
* Offline Queue.

---

# Version 1.1.0 (Đang phát triển)

## Chuẩn hóa cấu trúc

### Frontend

* Chia app.js thành nhiều module.
* Tách camera.js.
* Tách attendance.js.
* Tách popup.js.
* Tách offline.js.
* Tách pwa.js.
* Thêm api.js.
* Thêm utils.js.

---

### Backend

* Chuẩn hóa AttendanceService.
* Chuẩn hóa StudentService.
* Chuẩn hóa QRService.
* Chuẩn hóa ImageService.
* Chuẩn hóa CheckService.
* Chuẩn hóa Config.
* Chuẩn hóa Cache.

---

### Tối ưu

* Giảm số lần gọi API.
* Chuẩn hóa fetch().
* Chuẩn hóa xử lý lỗi.
* Chuẩn hóa Queue.
* Chuẩn hóa Cache.
* Chuẩn hóa Log.

---

# Version 1.2.0 (Kế hoạch)

## Trải nghiệm người dùng

* Âm thanh khi quét.
* Rung khi quét.
* Hiệu ứng popup.
* Loading.
* Hiệu ứng chuyển trang.

---

## Báo cáo

* Thống kê theo ngày.
* Thống kê theo lớp.
* Thống kê theo khối.
* Xuất Excel.
* Xuất PDF.

---

# Version 1.3.0 (Kế hoạch)

## Quản trị

* Nhiều tài khoản quản trị.
* Phân quyền.
* Nhật ký thao tác.
* Sao lưu dữ liệu.
* Khôi phục dữ liệu.

---

# Version 2.0.0 (Định hướng)

## Hệ sinh thái

* Quản lý Thiếu Nhi.
* Quản lý Giáo lý viên.
* Quản lý Lớp học.
* Quản lý Phụ huynh.
* Quản lý Sinh hoạt.
* Quản lý Trại.
* Quản lý Thánh lễ.
* Quản lý Thông báo.

---

## Ghi chú

Mỗi khi hoàn thành một chức năng lớn:

1. Cập nhật CHANGELOG.
2. Cập nhật README nếu có thay đổi cấu trúc.
3. Kiểm tra checklist trước khi triển khai.
