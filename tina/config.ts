import { defineConfig } from 'tinacms';

// Tina CMS — thử nghiệm cho VNHV mock-ups.
// Chạy thử tại máy: `npm run tina` → mở http://localhost:4321/admin/index.html
// Khi dùng thật cần tài khoản TinaCloud (clientId + token) hoặc self-host; xem README.
const str = (name: string, label: string, extra: any = {}) => ({ type: 'string' as const, name, label, ...extra });
const num = (name: string, label: string) => ({ type: 'number' as const, name, label });

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: 'admin', publicFolder: 'public', basePath: 'vnhv-mockups' },
  media: { tina: { mediaRoot: 'uploads', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'settings', label: 'Cài đặt trường', path: 'src/content/settings', format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          str('name', 'Tên trường'), str('nameEn', 'Tên tiếng Anh'), str('tagline', 'Khẩu hiệu'),
          { type: 'image', name: 'logo', label: 'Logo' },
          { type: 'image', name: 'heroImage', label: 'Ảnh hero trang chủ' },
          str('phone', 'Điện thoại'), str('phoneTel', 'Điện thoại (tel:)'), str('email', 'Email'),
          str('hours', 'Giờ học'), str('campus', 'Cơ sở'), str('room', 'Toà nhà / phòng'), str('address', 'Địa chỉ'),
          str('parking', 'Đậu xe'), str('poBox', 'Hộp thư'), str('ein', 'EIN'), str('facebook', 'Facebook'), num('founded', 'Năm thành lập'),
          { type: 'object', name: 'stats', label: 'Số liệu', fields: [num('students', 'Học sinh'), num('teachers', 'Thầy cô'), num('classes', 'Lớp học'), num('years', 'Năm hoạt động')] },
          { type: 'object', name: 'registration', label: 'Ghi danh', fields: [
            str('year', 'Niên khóa'), { type: 'boolean', name: 'open', label: 'Đang mở ghi danh' },
            num('earlyPrice', 'Học phí sớm ($)'), str('earlyDeadline', 'Hạn sớm'), num('latePrice', 'Học phí sau ($)'), str('lateWindow', 'Khoảng sau'),
            str('openingDay', 'Khai giảng'), str('openingDayLong', 'Khai giảng (chữ)'), str('openingDayEn', 'Khai giảng (EN)') ] },
          str('principalQuote', 'Lời thầy Hiệu trưởng', { ui: { component: 'textarea' } }), str('principalName', 'Tên thầy Hiệu trưởng'),
          str('messageVi', 'Thông điệp (VI)', { ui: { component: 'textarea' } }), str('messageEn', 'Thông điệp (EN)', { ui: { component: 'textarea' } }),
          { type: 'object', name: 'timeline', label: 'Hành trình 40 năm', list: true, ui: { itemProps: (i: any) => ({ label: i?.year }) }, fields: [str('year', 'Năm'), str('text', 'Mô tả', { ui: { component: 'textarea' } })] },
        ],
      },
      {
        name: 'programs', label: 'Chương trình học', path: 'src/content/programs', format: 'md',
        fields: [
          str('title', 'Tên chương trình', { isTitle: true, required: true }), num('order', 'Thứ tự'), str('ages', 'Nhãn tuổi/lớp'), str('meta', 'Mô tả ngắn'),
          str('status', 'Trạng thái', { options: [{ value: 'open', label: 'Còn chỗ' }, { value: 'soon', label: 'Sắp mở' }, { value: 'confirm', label: 'Xác nhận chỗ' }, { value: 'closed', label: 'Đã đóng' }] }),
          { type: 'image', name: 'image', label: 'Ảnh' },
          str('bullets', 'Điểm chính', { list: true }),
          { type: 'rich-text', name: 'body', label: 'Đoạn giới thiệu', isBody: true },
        ],
      },
      {
        name: 'events', label: 'Sự kiện', path: 'src/content/events', format: 'md',
        fields: [
          str('title', 'Tên sự kiện', { isTitle: true, required: true }), str('theme', 'Chủ đề'),
          { type: 'datetime', name: 'date', label: 'Ngày', ui: { dateFormat: 'DD/MM/YYYY' } },
          str('dateText', 'Ngày (chữ)'), str('timeText', 'Giờ'), str('venue', 'Địa điểm'), str('address', 'Địa chỉ'), str('prices', 'Giá vé'),
          str('ticketUrl', 'Link mua vé (Zeffy)'), str('contactEmail', 'Email liên lạc'), { type: 'boolean', name: 'featured', label: 'Nổi bật trên trang chủ' },
          { type: 'image', name: 'image', label: 'Poster' },
          { type: 'rich-text', name: 'body', label: 'Mô tả', isBody: true },
        ],
      },
      {
        name: 'testimonials', label: 'Chia sẻ của học sinh', path: 'src/content/testimonials', format: 'md',
        fields: [
          str('name', 'Tên', { isTitle: true, required: true }), str('grade', 'Lớp'), num('order', 'Thứ tự'),
          { type: 'boolean', name: 'placeholder', label: 'Chỉ là chỗ giữ' },
          { type: 'rich-text', name: 'body', label: 'Trích dẫn', isBody: true },
        ],
      },
      {
        name: 'news', label: 'Tin tức & thông báo', path: 'src/content/news', format: 'md',
        fields: [
          str('title', 'Tiêu đề', { isTitle: true, required: true }),
          { type: 'datetime', name: 'date', label: 'Ngày', ui: { dateFormat: 'DD/MM/YYYY' } },
          str('category', 'Loại', { options: ['Tin tức', 'Thông báo', 'Sinh hoạt'] }),
          { type: 'rich-text', name: 'body', label: 'Nội dung', isBody: true },
        ],
      },
    ],
  },
});
