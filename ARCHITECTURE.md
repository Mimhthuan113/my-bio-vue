# 🏗️ Architecture Overview

Tài liệu này mô tả kiến trúc kỹ thuật của dự án Winter Portfolio.

## 1. Core Stack

- **Framework**: Vue 3 (Composition API)
- **Task Runner**: Vite
- **Styling**: Vanilla CSS + Bootstrap 5 (cho layout & icons)
- **Audio API**: YouTube IFrame API

## 2. Design Patterns

### 🧩 Single Source of Truth

Toàn bộ dữ liệu cá nhân được tách khỏi logic component và lưu trữ tại `src/config/profile.js`. Điều này giúp việc cập nhật thông tin cực kỳ nhanh chóng mà không cần can thiệp vào logic Vue.

### 🌉 Component Communication

- **Event-driven**: `SplashScreen` phát ra sự kiện `enter` khi user click. `App.vue` bắt sự kiện này để kích hoạt luồng ứng dụng chính.
- **Props-based**: Trạng thái `entered` từ `App.vue` được truyền xuống `AudioToggle` (dưới tên `shouldPlay`) để kích hoạt nhạc nền, đảm bảo tuân thủ chính sách autoplay của trình duyệt.

## 3. Visual Effects Rendering Pipeline

- **Canvas Rendering**: `Mouse Trail` sử dụng Canvas 2D để đạt hiệu năng cao (60 FPS) mà không gây nặng DOM.
- **CSS Animations**: `Snowfall` và `Aurora Bokeh` ưu tiên sử dụng CSS animations (GPU accelerated) để tiết kiệm tài nguyên CPU.
- **3D Transform**: Hiệu ứng Tilt trên Card được tính toán dựa trên tọa độ chuột và áp dụng thông qua inline styles với CSS transitions để mượt mà.

## 4. Audio Management

Sử dụng YouTube IFrame API ẩn để phát nhạc. Logic điều khiển (Play/Pause/Mute) được đóng gói hoàn toàn trong component `AudioToggle.vue`.
