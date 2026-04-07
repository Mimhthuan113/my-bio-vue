# 📁 Folder Structure

Cấu trúc dự án được tổ chức theo chuẩn **Scalable Component Pattern**.

```text
portfolio/
├── .vscode/             # Cấu hình riêng cho VS Code
├── public/              # Tài sản tĩnh truyền trực tiếp (favicon, avatar)
├── src/
│   ├── assets/          # CSS toàn cục, font, hình ảnh xử lý qua Vite
│   │   ├── css/
│   │   └── images/
│   ├── components/      # UI Components
│   │   ├── common/      # Các component dùng chung (Badge, Card, Link)
│   │   ├── effects/     # Các hiệu ứng visual (Snow, Bokeh, Audio)
│   │   └── layout/      # Các thành phần cấu trúc (SplashScreen)
│   ├── config/          # Centralized configuration (Source of truth)
│   │   ├── profile.js   # Dữ liệu người dùng
│   │   └── ui.js        # Hằng số giao diện
│   ├── hooks/           # Vue Composables (Logic sủa dụng lại)
│   ├── App.vue          # Root component
│   └── main.js          # Điểm đầu vào dự án
├── .editorconfig        # Đồng bộ cấu hình editor
├── .eslintrc.json       # Kiểm soát chất lượng code
├── .prettierrc          # Tự động định dạng code
├── package.json         # Scripts và dependencies
└── vite.config.js       # Cấu hình Vite
```

### Chi tiết các thư mục:

- **`src/config/`**: Đây là nơi quan suất nhất để thay đổi nội dung trang web mà không cần sửa code logic.
- **`src/components/effects/`**: Chứa các logic AI/Visual nặng như Canvas Trail hoặc Snowfall.
- **`src/components/common/`**: Chứa các "Atomic components" nhỏ nhất.
