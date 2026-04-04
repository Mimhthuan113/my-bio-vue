# 🛠️ Environment Setup & Deployment

Hướng dẫn thiết lập môi trường và triển khai ứng dụng.

## 💻 Môi trường phát triển (Local)

### 1. Cấu hình Editor

Khuyến khích sử dụng **VS Code** với các Extensions sau:

- **Vue - Official** (Volar)
- **Prettier - Code formatter**
- **ESLint**

Project đã đi kèm file `.editorconfig` và `.prettierrc` để tự động định dạng code khi lưu.

### 2. Các lệnh quan trọng

- `npm run dev`: Chạy dev server tại `localhost:5173`.
- `npm run build`: Build project cho production (output tại folder `dist/`).
- `npm run preview`: Chạy thử bản build production tại local.

---

## 🚀 Triển khai (Deployment)

Dự án này là một Single Page Application (SPA) tĩnh, có thể triển khai dễ dàng trên các nền tảng sau:

### Vercel (Khuyến khích)

1. Kết nối repo GitHub với Vercel.
2. Vercel sẽ tự nhận diện Vite project.
3. Nhấn **Deploy**.

### GitHub Pages

1. Cập nhật `base` trong `vite.config.js` nếu deploy vào subfolder.
2. Sử dụng command:
   ```bash
   npm run build
   ```
3. Đẩy nội dung folder `dist/` lên branch `gh-pages`.

### Nginx (Standalone Server)

Nếu deploy lên server riêng, hãy copy toàn bộ nội dung folder `dist/` sau khi build vào thư mục web root của Nginx (thường là `/var/www/html`).
Cấu hình `.conf`:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
