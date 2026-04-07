# 📝 Coding Conventions

Để dự án luôn chuyên nghiệp và dễ bảo trì, hãy tuân thủ các quy tắc sau:

## 1. Naming Standards

### Components

- **Format**: PascalCase
- **Ví dụ**: `AudioToggle.vue`, `AvatarGlow.vue`
- **Tên**: Phải mang tính mô tả chức năng (Noun).

### Variables & Functions

- **Format**: camelCase
- **Ví dụ**: `isMuted`, `onEnter`, `profileConfig`.

### Assets

- **Format**: kebab-case hoặc snake_case
- **Ví dụ**: `avatar.png`, `winter-background.jpg`.

## 2. Vue Best Practices

- Sử dụng **Script Setup** cho tất cả components.
- Luôn sử dụng **Scoped CSS** để tránh xung đột style.
- Khai báo props rõ ràng (Sử dụng `defineProps`).
- Không thao tác trực tiếp với DOM ngoại trừ trường hợp bất khả kháng (Canvas, Third-party libs).

## 3. Formatting

- **Indent**: 2 spaces.
- **Semicolon**: Không dùng (Standard style).
- **Quotes**: Single quotes (`'`).
- **Trailing comma**: Không dùng.

Tất cả đã được cấu hình tự động trong `.prettierrc` và `.eslintrc.json`.

## 4. Git Commit Messages

Tuân theo chuẩn **Conventional Commits**:

- `feat`: Tính năng mới.
- `fix`: Sửa lỗi.
- `docs`: Cập nhật tài liệu.
- `style`: Thay đổi về formatting (không ảnh hưởng logic).
- `refactor`: Tái cấu trúc code.
- `chore`: Các thay đổi lặt vặt (build tools, lib update).

**Ví dụ**: `feat: update background music to Son Tung M-TP`
