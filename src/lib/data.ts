import { getCollection, getEntry } from 'astro:content';
export async function loadData() {
  const site = (await getEntry('settings', 'site'))!.data as any;
  const programs = (await getCollection('programs')).sort((a, b) => a.data.order - b.data.order);
  const events = (await getCollection('events')).sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const gala = events.find(e => e.data.featured) ?? events[0];
  const testimonials = (await getCollection('testimonials')).sort((a, b) => a.data.order - b.data.order);
  const news = (await getCollection('news')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 3);
  return { site, programs, events, gala, testimonials, news };
}
export const fmtDate = (d: Date) => `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
export const statusLabel: Record<string, [string, string]> = { open: ['pill-open', 'Còn chỗ'], soon: ['pill-soon', 'Sắp mở'], confirm: ['pill-soon', 'Xác nhận chỗ'], closed: ['pill-closed', 'Đã đóng'] };
