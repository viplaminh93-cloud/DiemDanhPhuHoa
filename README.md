# HỆ THỐNG ĐIỂM DANH QR - GIÁO XỨ PHÚ HÒA

## Mục tiêu

Hệ thống dùng để điểm danh Thiếu Nhi Thánh Thể bằng mã QR.

Ưu tiên của dự án:

1. Chính xác.
2. Ổn định.
3. Dễ bảo trì.
4. Hoạt động tốt trên điện thoại.
5. Có thể mở rộng trong tương lai.

---

# Kiến trúc

Dự án gồm 2 phần:

## 1. Frontend (GitHub Pages / PWA)

Hiển thị giao diện.

Thực hiện:

* Quét QR.
* Hiển thị kết quả.
* Đồng bộ offline.
* Cài đặt thành ứng dụng (PWA).

---

## 2. Backend (Google Apps Script)

Xử lý:

* Điểm danh.
* Quản lý học sinh.
* Đồng bộ ảnh.
* Đồng bộ QR.
* Kiểm tra dữ liệu.
* Trả dữ liệu cho Frontend.

---

# Cấu trúc thư mục

```
Frontend

index.html

manifest.json

service-worker.js

css/
    style.css

js/
    app.js
    api.js
    attendance.js
    camera.js
    popup.js
    offline.js
    pwa.js
    utils.js

images/
    logo.png
    icon-192.png
    icon-512.png
```

---

```
Apps Script

Code.gs

API.gs

Config.gs

Menu.gs

AttendanceService.gs

StudentService.gs

QRService.gs

ImageService.gs

CheckService.gs

ClassService.gs

Utils.gs

Cache.gs
```

---

# Chức năng từng file

## app.js

Chỉ chứa:

* API_URL
* APP_VERSION
* Global Variables
* Khởi động App

Không viết nghiệp vụ tại đây.

---

## camera.js

Quản lý:

* Camera.
* Quét QR.
* Resume.
* Stop.
* Back Home.

---

## attendance.js

Quản lý:

* Chọn loại điểm danh.
* Gửi dữ liệu.
* Nhận kết quả.
* Cập nhật tổng.

---

## popup.js

Quản lý:

* Popup thành công.
* Popup lỗi.
* Popup trùng.
* Popup offline.

---

## offline.js

Quản lý:

* Queue.
* LocalStorage.
* Đồng bộ lại khi có mạng.

---

## pwa.js

Quản lý:

* Service Worker.
* Install App.
* Splash.
* Version.

---

## style.css

Chỉ chứa giao diện.

Không viết JavaScript.

---

# Backend

## AttendanceService.gs

Quản lý:

* attendance()
* getTodayCount()
* lịch sử điểm danh

---

## StudentService.gs

Quản lý:

* getStudent()
* cập nhật học sinh
* tìm học sinh

---

## QRService.gs

Quản lý:

* tạo QR
* đồng bộ QR
* cập nhật QR

---

## ImageService.gs

Quản lý:

* đồng bộ ảnh
* kiểm tra ảnh

---

## CheckService.gs

Quản lý:

* kiểm tra dữ liệu
* tạo báo cáo

---

## Config.gs

Chỉ khai báo:

* Sheet
* Cột
* Màu
* Năm học
* Folder
* Cache Time
* QR Size

---

# Quy tắc lập trình

## Một file chỉ làm một việc.

Không trộn nhiều chức năng.

---

## Không viết trùng.

Nếu nhiều nơi cùng dùng:

Tạo một hàm.

---

## Không dùng số trực tiếp.

Ví dụ:

Sai

21600

Đúng

CONFIG.CACHE_TIME

---

## Không gọi API trực tiếp nhiều nơi.

Tất cả đều đi qua:

callAPI()

---

## Không sửa dữ liệu trực tiếp.

Luôn thông qua Service.

---

# Quy trình cập nhật

## Frontend

Sửa

↓

Commit

↓

Push GitHub

↓

Kiểm tra GitHub Pages

↓

Kiểm tra PWA

---

## Backend

Sửa Apps Script

↓

Deploy New Version

↓

Update Web App

↓

Kiểm tra API

↓

Kiểm tra Frontend

---

# Thứ tự ưu tiên

1. Không mất dữ liệu.
2. Không điểm danh trùng.
3. Không lỗi camera.
4. Không lỗi offline.
5. PWA hoạt động.
6. Giao diện đẹp.
7. Tính năng mới.

---

# Checklist trước khi đưa vào sử dụng

□ Camera hoạt động.

□ Điểm danh thành công.

□ Điểm danh trùng.

□ Học sinh không tồn tại.

□ Offline Queue.

□ Đồng bộ lại.

□ Tổng số hôm nay.

□ Popup.

□ Logo.

□ PWA.

□ Install App.

□ Service Worker.

□ Manifest.

□ Đồng bộ QR.

□ Đồng bộ ảnh.

□ Dashboard.

□ Báo cáo.

□ Kiểm tra dữ liệu.

---

# CHANGELOG

## v1.0

* Hoàn thiện hệ thống điểm danh QR.
* Hỗ trợ PWA.
* Hỗ trợ Offline Queue.
* Đồng bộ QR.
* Đồng bộ ảnh.
* Dashboard kiểm tra dữ liệu.

---

Tài liệu này sẽ được cập nhật mỗi khi hệ thống có thay đổi lớn.
