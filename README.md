
### **Đề thi: Phát triển ứng dụng LCDP hỗ trợ cộng đồng ứng phó khẩn cấp (OLP 2024)**

---

## **1️⃣ Yêu cầu bài toán**
Phát triển **một ứng dụng hỗ trợ cộng đồng trong tình huống khẩn cấp** như thiên tai, lũ lụt, đại dịch. Ứng dụng phải được phát triển trên **nền tảng LCDP mã nguồn mở** (Low-Code Development Platform) và đảm bảo:  
- **Phát hành mã nguồn mở**: Ứng dụng phải được đóng gói và đăng tải lên kho mã nguồn (GitHub) để có thể tái sử dụng.  
- **Tích hợp công nghệ thứ 3**: Khuyến khích sử dụng các API của bên thứ 3 như bản đồ (Google Maps), gửi thông báo (Twilio) hoặc các dịch vụ AI.  
- **Tính khả dụng cao**: Ứng dụng cần hoạt động trên **web hoặc mobile** và phải sẵn sàng phục vụ cộng đồng trong trường hợp khẩn cấp.  

---

## **2️⃣ Ý tưởng tổng quát**
**Ý tưởng chính**: **Ứng dụng cảnh báo khẩn cấp và sơ tán an toàn**  
> Ứng dụng này sẽ giúp người dân nhận thông báo khẩn cấp, tìm kiếm nơi trú ẩn an toàn và liên lạc với tình nguyện viên trong tình huống khẩn cấp (thiên tai, dịch bệnh, bão lũ, lũ quét).  

---

## **3️⃣ Tính năng chính của ứng dụng**
| **Chức năng chính**       | **Mô tả chi tiết**                                      | **Công nghệ thực hiện**               |
|--------------------------|-----------------------------------------------------|-------------------------------------|
| **Gửi cảnh báo khẩn cấp**  | Quản trị viên (admin) tạo thông báo và gửi SMS, thông báo trên ứng dụng cho người dùng. | **MongoDB + Twilio API**             |
| **Bản đồ khu vực sơ tán** | Hiển thị bản đồ các điểm trú ẩn gần nhất và chỉ đường đến nơi an toàn. | **Google Maps API + MongoDB**       |
| **Quản lý nơi trú ẩn**     | Lưu trữ, quản lý thông tin các điểm trú ẩn (tọa độ, sức chứa, trạng thái hoạt động). | **MongoDB (collection: shelters)** |
| **Tìm kiếm nơi trú ẩn gần nhất** | Tìm nơi trú ẩn gần vị trí người dùng và chỉ đường đến đó. | **Google Maps API**                 |
| **Gửi thông báo SMS**     | Gửi SMS cho người dân trong khu vực nguy hiểm.         | **Twilio API**                      |
| **Quản lý người dùng**     | Đăng ký thông tin người dân, tình nguyện viên và quản lý tài khoản admin. | **MongoDB (collection: users)**     |
| **Trang quản trị (Admin)** | Quản lý thông báo, khu trú ẩn, theo dõi hoạt động của ứng dụng. | **Appsmith (giao diện quản trị)**   |

---

## **4️⃣ Công cụ và công nghệ**
| **Công cụ / Nền tảng**    | **Mô tả**                                               |
|-------------------------|------------------------------------------------------|
| **Appsmith**              | Nền tảng LCDP chính để xây dựng giao diện ứng dụng.    |
| **MongoDB**               | Lưu trữ thông tin về người dùng, cảnh báo, trú ẩn.     |
| **Google Maps API**       | Hiển thị bản đồ, tìm kiếm và chỉ đường đến nơi trú ẩn. |
| **Twilio API**            | Gửi SMS thông báo khẩn cấp cho người dân.              |
| **GitHub**                | Lưu trữ mã nguồn, phát hành phiên bản ứng dụng.        |

> 🔥 **Tại sao chọn Appsmith?**
- **Phát triển nhanh**: Kéo thả giao diện trực quan, tích hợp dữ liệu nhanh chóng.  
- **Dễ kết nối với API**: Kết nối trực tiếp với MongoDB, Twilio và Google Maps API.  
- **Phát hành dễ dàng**: Có thể đóng gói và phát hành trên GitHub để cài đặt lại trên máy chủ khác.  

---

## **5️⃣ Kiến trúc hệ thống**
**Phân cấp người dùng:**  
1. **Người dùng (cộng đồng, người dân)**  
   - Sử dụng ứng dụng để nhận cảnh báo, tìm nơi trú ẩn, nhận chỉ đường.  

2. **Quản trị viên (Admin)**  
   - Tạo và gửi thông báo khẩn cấp.  
   - Quản lý thông tin về nơi trú ẩn, danh sách tình nguyện viên và tình trạng khẩn cấp.  

3. **Hệ thống backend (Server)**
   - Lưu trữ dữ liệu về người dùng, tình nguyện viên, thông báo khẩn cấp (dùng **MongoDB**).  
   - Tích hợp API của bên thứ 3: **Google Maps, Twilio**.  

> 🔥 **Luồng hoạt động hệ thống:**  
1. **Quản trị viên** gửi thông báo khẩn cấp (lưu trong **MongoDB** và gửi SMS qua **Twilio API**).  
2. **Người dân** nhận cảnh báo qua **SMS** hoặc **thông báo trong ứng dụng**.  
3. Người dùng có thể **tìm nơi trú ẩn an toàn** gần nhất thông qua bản đồ (**Google Maps API**).  

---

## **6️⃣ Giao diện người dùng (UI/UX)**
### **1. Giao diện người dùng (User)**
- **Màn hình chính**: Hiển thị các thông báo khẩn cấp và tùy chọn tìm kiếm nơi trú ẩn gần nhất.  
- **Bản đồ trú ẩn**: Hiển thị các khu vực trú ẩn an toàn trên bản đồ và chỉ đường đến nơi trú ẩn gần nhất.  
- **Thông tin người dùng**: Người dân có thể đăng ký hoặc cập nhật thông tin của họ.  

### **2. Giao diện quản trị viên (Admin)**
- **Quản lý cảnh báo**: Gửi tin nhắn cảnh báo khẩn cấp.  
- **Quản lý trú ẩn**: Thêm, chỉnh sửa và xóa thông tin về nơi trú ẩn.  
- **Báo cáo hoạt động**: Thống kê tình trạng sử dụng ứng dụng.  

---

## **7️⃣ Cơ sở dữ liệu MongoDB**
**Danh sách các collections (bảng)**
| **Collection**       | **Mô tả**                      |
|---------------------|---------------------------------|
| **users**           | Lưu thông tin người dùng (tên, vai trò, số điện thoại, vị trí). |
| **alerts**          | Lưu thông tin về cảnh báo khẩn cấp (nội dung, thời gian, vị trí). |
| **shelters**        | Lưu danh sách địa điểm trú ẩn (tên, địa chỉ, sức chứa, tọa độ). |
| **admin_logs**      | Lưu lại hoạt động của quản trị viên (thêm, sửa, xóa, gửi thông báo). |

---

## **8️⃣ Triển khai và đóng gói**
### **Bước 1: Đóng gói ứng dụng**
1. Đóng gói mã nguồn ứng dụng, cơ sở dữ liệu và tài liệu hướng dẫn.  
2. Tạo tệp README.md trên **GitHub** với hướng dẫn cài đặt và triển khai.  
3. Tạo phiên bản ứng dụng bằng **GitHub Release** để tải về và cài đặt.  

### **Bước 2: Hướng dẫn triển khai**
1. **Tạo tài khoản MongoDB Atlas** và cấu hình cơ sở dữ liệu.  
2. **Tích hợp Google Maps API** và **Twilio API**.  
3. **Kết nối Appsmith với MongoDB** thông qua URL kết nối.  
4. **Chạy ứng dụng trên server** (có thể triển khai trên **Heroku, AWS, DigitalOcean**).  

---

## **9️⃣ Lộ trình thực hiện**
| **Thời gian**  | **Công việc**                      |
|-----------------|------------------------------------|
| **Ngày 1**     | Phân tích yêu cầu, chọn ý tưởng, vẽ mockup. |
| **Ngày 2-3**   | Phát triển ứng dụng với Appsmith (UI, logic, cơ sở dữ liệu). |
| **Ngày 4**     | Tích hợp Google Maps API, Twilio API, MongoDB. |
| **Ngày 5**     | Kiểm thử ứng dụng và sửa lỗi.       |
| **Ngày 6**     | Đóng gói và phát hành trên GitHub.  |

---

## **🔍 Tổng kết**
- **Ý tưởng**: Ứng dụng cảnh báo khẩn cấp và sơ tán an toàn.  
- **Nền tảng**: **Appsmith + MongoDB + Twilio + Google Maps API**.  
- **Chức năng chính**: Cảnh báo khẩn cấp, tìm nơi trú ẩn, bản đồ, quản lý người dùng.  
- **Phát hành**: Đóng gói mã nguồn trên **GitHub**, hỗ trợ tái triển khai trên bất kỳ máy chủ nào.  

---