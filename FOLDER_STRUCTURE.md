# 📁 Folder Structure

Cấu trúc thư mục của dự án được thiết kế theo hướng module hóa và dễ mở rộng.

```text
portfolio/
├── .vscode/               # Cấu hình VS Code cho project
├── public/                # Static assets (images, icons)
│   └── avatar.png         # Hình đại diện
├── src/
│   ├── assets/            # Global styles and assets
│   │   └── style.css      # Core theme styles
│   ├── components/        # Vue components
│   │   ├── AudioToggle.vue    # Điều khiển nhạc nền
│   │   ├── AvatarGlow.vue     # Avatar với hiệu ứng lấp lánh
│   │   ├── HelloWorld.vue     # Component mẫu (mặc định)
│   │   ├── InfoCard.vue       # Nội dung giới thiệu chi tiết
│   │   ├── SnowfallEffect.vue # Hiệu ứng tuyết rơi
│   │   ├── SocialLinks.vue    # Danh sách liên kết xã hội
│   │   ├── SplashScreen.vue   # Màn hình chào khi mới vào
│   │   ├── TechBadges.vue     # Các tag công nghệ
│   │   └── TypingText.vue     # Hiệu ứng gõ chữ
│   ├── config/            # Hệ thống cấu hình
│   │   └── profile.js     # Chứa toàn bộ data profile
│   ├── App.vue            # Component gốc điều phối chính
│   └── main.js            # Entry point của ứng dụng
├── .editorconfig          # Định dạng code chuẩn editor
├── .prettierrc            # Cấu hình Prettier
├── index.html             # HTML template chính
├── package.json           # Quản lý dependency & scripts
└── vite.config.js         # Cấu hình Vite
```

---

### Quy tắc đặt tên

- **Components**: PascalCase (ví dụ: `AudioToggle.vue`).
- **Configs/Scripts**: camelCase (ví dụ: `profile.js`).
- **Assets**: kebab-case.
