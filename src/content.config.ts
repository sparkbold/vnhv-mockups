import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({ title: z.string(), order: z.number(), ages: z.string(), meta: z.string(), status: z.enum(['open','soon','confirm','closed']).default('open'), image: z.string().optional(), bullets: z.array(z.string()).default([]) }),
});
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({ title: z.string(), theme: z.string().optional(), date: z.coerce.date(), dateText: z.string(), timeText: z.string(), venue: z.string(), address: z.string(), prices: z.string().optional(), ticketUrl: z.string().optional(), contactEmail: z.string().optional(), featured: z.boolean().default(false), image: z.string().optional() }),
});
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({ name: z.string(), grade: z.string(), order: z.number().default(99), placeholder: z.boolean().default(false) }),
});
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({ title: z.string(), date: z.coerce.date(), category: z.string().default('Tin tức') }),
});
const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/settings' }),
  schema: z.any(),
});
export const collections = { programs, events, testimonials, news, settings };
