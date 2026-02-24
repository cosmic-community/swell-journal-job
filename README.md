# 🏄 Swell Journal — Surf Blog

![Swell Journal](https://imgix.cosmicjs.com/ea0b2af0-11d6-11f1-9b1d-01a3fa4a4153-photo-1502933691298-84fc14542831-1771975016693.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern surf blog powered by [Cosmic](https://www.cosmicjs.com) and built with Next.js 16. Browse surf travel stories, technique tutorials, and gear reviews from passionate surf writers — all content managed through the Cosmic dashboard.

## Features

- 🏄 **Dynamic Blog Posts** — Markdown content rendered with beautiful typography
- 🏷️ **Category Filtering** — Browse by Surf Travel, Technique, or Gear Reviews
- ✍️ **Author Profiles** — Dedicated pages for each writer with bio and post history
- 🎨 **Ocean-Inspired Design** — Warm sandy tones, deep blues, and immersive imagery
- ⚡ **Server-Side Rendering** — Lightning-fast with Next.js App Router
- 📱 **Fully Responsive** — Perfect experience on mobile, tablet, and desktop
- 🔍 **SEO Optimised** — Dynamic metadata for every page
- 🖼️ **Image Optimisation** — Served via Cosmic's imgix CDN

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=699e3093a0a8ab98f1d5513e&clone_repository=699e326374dec690d5a5c023)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "A surf blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'A surf blog with posts, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the surf blog bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd swell-journal

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching all posts with author and category data

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a single post by slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'chasing-swells-in-mentawai' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching categories

```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This project uses three content types from your Cosmic bucket:

| Type | Fields | Description |
|------|--------|-------------|
| **Posts** 🏄 | content (markdown), featured_image, author, category | Blog articles |
| **Authors** ✍️ | name, bio, profile_photo | Content writers |
| **Categories** 🏷️ | name, description | Post categories |

Content is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with `depth(1)` to resolve connected objects (authors & categories) in a single request.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables and deploy

<!-- README_END -->