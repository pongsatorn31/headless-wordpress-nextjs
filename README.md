# Headless WordPress with Next.js

A modern headless WordPress starter built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- Static Generation and ISR for fast page loads with automatic revalidation
- Tailwind CSS for utility-first styling
- Responsive mobile-first design
- SEO optimized with metadata support and Open Graph
- Full TypeScript support with typed API responses
- Deploy anywhere - works with Vercel, Netlify, or any hosting

## Quick Start

```bash
git clone https://github.com/yourusername/headless-wordpress-nextjs.git
cd headless-wordpress-nextjs

npm install

cp .env.example .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://your-wordpress-site.com
```

### WordPress Requirements

Your WordPress site needs:
- REST API enabled (enabled by default)
- Pretty permalinks enabled
- (Optional) JWT Authentication for protected content

## Project Structure

```
headless-wordpress-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   ├── about/
│   │   └── page.tsx        # About page
│   └── posts/
│       ├── page.tsx        # Blog listing
│       └── [slug]/
│           └── page.tsx    # Single post
├── components/
│   ├── header.tsx          # Site header
│   ├── footer.tsx          # Site footer
│   └── post-card.tsx       # Blog post card
├── lib/
│   └── wordpress.ts        # WordPress API client
└── .env.example            # Environment template
```

## API Functions

The `lib/wordpress.ts` provides typed functions for fetching WordPress data:

```typescript
import { getPosts, getPostBySlug, getPages } from '@/lib/wordpress';

const posts = await getPosts(10);
const post = await getPostBySlug('hello-world');
const pages = await getPages();
```

## Customization

### Adding New Pages

Create a new folder in `app/` with a `page.tsx` file:

```tsx
export default function ContactPage() {
  return <div>Contact form here</div>;
}
```

### Styling

This starter uses Tailwind CSS. Modify `app/globals.css` for global styles or extend the theme in `tailwind.config.ts`.

## Deployment

### Production Build

```bash
npm run build
npm start
```

The application runs on port 3000 by default. Use a reverse proxy (nginx, Caddy) or deploy to any Node.js hosting platform.

### Environment Variables

Set `NEXT_PUBLIC_WORDPRESS_URL` in your hosting environment.

## License

MIT License - free to use for personal or commercial projects.
