# VNHV homepage mock-ups — Astro + CMS trial

Ba hướng thiết kế trang chủ cho **Trường Việt Ngữ Hùng Vương** (vnhv.org, Houston), dựng bằng [Astro](https://astro.build) và đọc nội dung từ file trong `src/content/`. Cả ba hướng dùng chung một bộ dữ liệu — sửa học phí, ngày khai giảng, chương trình, sự kiện, chia sẻ, tin tức ở một chỗ, ba trang đổi theo.

| Hướng | Trang | Ý tưởng |
|---|---|---|
| A — Evolutionary Refresh | `/a` | Cấu trúc quen thuộc, logo vàng, navy thay đen |
| B — Conversion-Focused *(đề xuất)* | `/b` | Ghi danh / vé gala / ủng hộ lên trước; xanh tre cho hành động chính |
| C — Bold Modern Rebuild | `/c` | Chữ Lora cỡ lớn, nền navy đậm, dải hành trình 40 năm |

Kế hoạch đầy đủ: [`public/docs/vnhv-rebuild-plan.pdf`](public/docs/vnhv-rebuild-plan.pdf) · [Markdown](public/docs/vnhv-rebuild-plan.md).

## Chạy tại máy

```bash
npm install
npm run dev          # http://localhost:4321/vnhv-mockups/
```

## Nội dung nằm ở đâu

```
src/content/settings/site.json   # tên, liên lạc, học phí, số liệu, lời hiệu trưởng, timeline
src/content/programs/*.md        # 3 chương trình
src/content/events/*.md          # sự kiện (gala 40 năm)
src/content/testimonials/*.md    # chia sẻ học sinh
src/content/news/*.md            # tin tức / thông báo
public/uploads/                  # ảnh (logo, ảnh hero, poster…)
```

Sửa file trực tiếp (GitHub web, VS Code…) rồi push → GitHub Actions build và đưa lên Pages trong ~1 phút. Hoặc dùng một trong hai CMS dưới đây.

## Thử Decap CMS  (`/cms/`)

Decap là giao diện web tĩnh, cấu hình ở `public/cms/config.yml`. Ở chế độ thử nghiệm nó ghi thẳng vào file trên máy:

```bash
npm run dev     # cửa sổ 1
npm run cms     # cửa sổ 2 — decap-server (proxy ghi file cục bộ, cổng 8081)
```

Mở http://localhost:4321/vnhv-mockups/decap (chuyển tới `/cms/index.html`) → chọn **Cài đặt trường**, **Chương trình học**, **Sự kiện**… → Lưu → file trong `src/content/` thay đổi, trang dev tự cập nhật.

Để thầy cô dùng thật trên GitHub Pages, Decap cần một dịch vụ OAuth để đăng nhập GitHub (GitHub Pages không có sẵn): dùng **Netlify** (bật Identity + Git Gateway, đăng nhập bằng email) hoặc một OAuth proxy nhỏ trên Cloudflare Workers. Khi đó bỏ dòng `local_backend: true` trong `config.yml`.

## Thử Tina CMS  (`/admin/`)

Tina có giao diện chỉnh sửa ngay trên trang (visual editing) và schema ở `tina/config.ts`. Chế độ local không cần tài khoản:

```bash
npm run tina    # cửa sổ 1 — Tina GraphQL server (cổng 4001) + build trang admin
npm run dev     # cửa sổ 2
```

Chờ dòng “Tina Dev Server is running…” rồi mở http://localhost:4321/vnhv-mockups/tina (chuyển tới `/admin/index.html`) → **Enter Edit Mode** → sửa và Lưu → ghi vào file cục bộ.

Để dùng thật cần tài khoản [TinaCloud](https://tina.io) (miễn phí đến 2 người dùng): tạo project, lấy `TINA_PUBLIC_CLIENT_ID` và `TINA_TOKEN`, thêm vào GitHub Secrets, đổi lệnh build trong workflow thành `npm run tina:build`.

## Deploy

`.github/workflows/deploy.yml` build Astro và đưa `dist/` lên GitHub Pages mỗi lần push `main`. Trong repo: **Settings → Pages → Source: GitHub Actions**.

## Licence

Code (HTML/CSS/JS/Astro) theo MIT — xem `LICENSE`. Tên trường, logo, ảnh và trích dẫn học sinh thuộc về Trường Việt Ngữ Hùng Vương, không nằm trong licence này.
