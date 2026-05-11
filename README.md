# The University of the Streets

**AI, SMEs & The Future of Nigerian Business**

A landing/marketing website for Dr. Daniel Ochi's book *"The University of the Streets"*  a practical guide for Nigerian SME owners, startup founders, and business leaders on how to grow, scale, and build a trans-generational enterprise using AI-driven strategies.

Built with [Next.js 16](https://nextjs.org/) (App Router), React 19, and Tailwind CSS 4.

---

## Features

- **Landing Page** — Full marketing funnel with hero section, author bio, book introduction, benefits grid, target audience, pricing, and checkout.
- **Book Detail Page** — `/book` — Book cover display, key features, purchase options.
- **Checkout Page** — `/checkout` — Format selection (Hardcopy ₦10,000 / Softcopy ₦7,500), quantity selector, total calculation, and Stripe-ready checkout flow.
- **WhatsApp Direct Ordering** — One-click WhatsApp DM with a pre-filled message about the book for users who have questions before purchasing.
- **SEO Optimized** — Full metadata (Open Graph, Twitter Cards), JSON-LD structured data (Book, Person, Organization, Product), auto-generated sitemap, and robots.txt.
- **Dark Theme** — Premium dark green/gold aesthetic with Tailwind CSS.
- **Responsive** — Mobile-first design, works on all screen sizes.

## Tech Stack

| Tech | Version |
|------|---------|
| [Next.js](https://nextjs.org/) | 16.2.6 (App Router) |
| [React](https://react.dev/) | 19 |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2 |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 |
| [shadcn/ui](https://ui.shadcn.com/) | Radix UI components |
| [Lucide Icons](https://lucide.dev/) | Icon library |

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 22)
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/university-of-the-streets.git
cd university-of-the-streets
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with SEO metadata + JSON-LD
│   ├── page.tsx             # Landing page
│   ├── sitemap.ts           # Auto-generated sitemap.xml
│   ├── book/
│   │   └── page.tsx         # Book detail page
│   └── checkout/
│       └── page.tsx         # Checkout page
├── components/
│   ├── footer.tsx
│   ├── navigation.tsx
│   ├── theme-provider.tsx
│   └── ui/                  # shadcn/ui components
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── sirdan.jpeg          # Author photo
│   ├── university-of-the-street.png  # Book cover
│   ├── robots.txt
│   └── placeholder*.png     # Placeholder assets
└── styles/
    └── globals.css
```

## Deployment

This project is optimized for [Vercel](https://vercel.com/). Deploy with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Post-Deployment (SEO)

1. Add your Google Search Console verification code in `app/layout.tsx` (look for `verification.google: ''`).
2. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.
3. Test Rich Results with Google's [Rich Results Test](https://search.google.com/test/rich-results).

## License

All rights reserved. © 2026 The University of the Streets Legacy.
