# PROJECT RULES

## Hệ thống

Điểm danh QR Giáo xứ Phú Hòa

---

# MỤC TIÊU

Ưu tiên của dự án theo thứ tự:

1. Không mất dữ liệu.
2. Không điểm danh sai.
3. Không điểm danh trùng.
4. Chạy ổn định.
5. Dễ bảo trì.
6. Dễ mở rộng.
7. Giao diện đẹp.

Nếu có xung đột giữa giao diện và độ ổn định, luôn ưu tiên độ ổn định.

---

# QUY TẮC 1

## Một file chỉ làm một việc.

Ví dụ:

attendance.js

↓

Chỉ điểm danh.

Không được viết:

* popup
* camera
* pwa
* css

---

# QUY TẮC 2

Không viết cùng một đoạn code hai lần.

Nếu từ hai nơi trở lên cùng sử dụng một logic:

↓

Tạo thành hàm.

---

# QUY TẮC 3

Không gọi API trực tiếp nhiều nơi.

Mọi request đều đi qua:

callAPI()

---

# QUY TẮC 4

Không sử dụng "magic number".

Sai

21600

Đúng

CONFIG.CACHE_TIME

---

# QUY TẮC 5

Không hard-code.

Sai

"Điểm danh"

Đúng

CONFIG.TEXT.DIEM_DANH

(nếu có nhiều nơi dùng)

---

# QUY TẮC 6

Mọi function đều có comment.

Ví dụ

==================================

Điểm danh học sinh

==================================

---

# QUY TẮC 7

Tên function

camelCase.

Ví dụ

startCamera()

guiDiemDanh()

capNhatTong()

dongBoQueue()

---

# QUY TẮC 8

Tên biến

camelCase.

Không dùng:

a

b

c

x

y

trừ vòng lặp ngắn.

---

# QUY TẮC 9

Không viết file quá lớn.

Giới hạn:

250~300 dòng.

Nếu vượt:

↓

Tách file.

---

# QUY TẮC 10

Không sửa file khác nếu không cần.

Ví dụ:

Sửa popup

↓

Chỉ popup.js.

Không sửa camera.js.

---

# QUY TẮC 11

Mọi thay đổi lớn đều cập nhật:

README.md

CHANGELOG.md

---

# QUY TẮC 12

Mỗi phiên làm việc chỉ tập trung một mục tiêu.

Ví dụ

Hôm nay

↓

Offline Queue.

Không vừa sửa Queue vừa sửa Camera.

---

# QUY TẮC 13

Không tối ưu quá sớm.

Thứ tự:

Đúng

↓

Ổn định

↓

Nhanh

↓

Đẹp

---

# QUY TẮC 14

Mọi lỗi đều phải tái hiện được trước khi sửa.

Không đoán.

Không vá.

---

# QUY TẮC 15

Không thêm tính năng nếu nền tảng chưa ổn định.

Ưu tiên:

Camera

↓

Attendance

↓

Offline

↓

PWA

↓

UI

↓

Animation

---

# QUY TẮC 16

Mỗi version đều phải kiểm tra:

□ Camera

□ QR

□ Attendance

□ Duplicate

□ Offline

□ Queue

□ Popup

□ PWA

□ Install

□ Service Worker

□ Dashboard

□ Cache

□ Drive

---

# QUY TẮC 17

Không xóa code cũ trước khi code mới chạy ổn định.

Luôn kiểm thử.

Sau đó mới dọn dẹp.

---

# QUY TẮC 18

Sau mỗi giai đoạn lớn sẽ có một phiên "Code Cleanup".

Bao gồm:

* Xóa code thừa.
* Chuẩn hóa comment.
* Chuẩn hóa tên hàm.
* Chuẩn hóa log.
* Chuẩn hóa try/catch.
* Chuẩn hóa fetch.
* Chuẩn hóa cache.
* Chuẩn hóa folder.

---

# QUY TẮC 19

Mọi thay đổi phải giữ khả năng mở rộng.

Không viết giải pháp chỉ phù hợp với một trường hợp nếu có thể thiết kế để dùng lại.

---

# QUY TẮC 20

Mục tiêu cuối cùng.

Không phải viết nhiều code.

Mà là tạo ra một hệ thống:

* Dễ hiểu.
* Dễ sửa.
* Dễ bàn giao.
* Dễ mở rộng.
* Có thể sử dụng nhiều năm.
