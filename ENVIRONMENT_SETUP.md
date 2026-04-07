# 🛠️ Environment Setup

Hướng dẫn chi tiết để thiết lập môi trường phát triển cho dự án Portfolio.

## 1. Yêu cầu hệ thống

- **Node.js**: Phiên bản 16.x trở lên (Khuyến nghị 18.x hoặc 20.x LTS).
- **Trình quản lý gói**: npm (đi kèm Node.js) hoặc Yarn.
- **Trình duyệt**: Các trình duyệt hiện đại (Chrome, Edge, Firefox, Safari).

## 2. Các bước cài đặt

### Bước 1: Clone dự án

```bash
git clone https://github.com/Mimhthuan113/portfolio.git
cd portfolio
```

### Bước 2: Cài đặt Dependencies

```bash
npm install
```

### Bước 3: Cấu hình Environment Variables (Nếu có)

Hiện tại dự án chưa sử dụng `.env`. Toàn bộ cấu hình được quản lý tập trung tại `src/config/`.

## 3. Lệnh vận hành quan trọng

| Lệnh              | Chức năng                                   |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Chạy dev server tại `http://localhost:5173` |
| `npm run build`   | Build code production vào thư mục `dist/`   |
| `npm run preview` | Preview bản build sau khi chạy build        |
| `npm run lint`    | Kiểm tra lỗi code theo chuẩn ESLint         |

## 4. Công cụ hỗ trợ khuyến nghị

- **VS Code** với các plugin:
  - **Volar**: Support Vue 3 tốt nhất.
  - **ESLint**: Hiển thị lỗi ngay khi code.
  - **Prettier**: Tự động format code khi save.
