# Friends Cake

Premium frontend storefront for Friends Cake — a demo e-commerce experience built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

This is a frontend-only demonstration. No backend, payments, or live inventory are connected.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Routes

- `/` — Home, with the scroll-driven cake
- `/categories` — Category index
- `/shop` — All products (`?collection=new` or `?collection=bestsellers`)
- `/category/[slug]` — Category listing
- `/product/[slug]` — Product detail and cake configurator
- `/frenchies-request` — Frenchies request form
- `/b2b` — Business inquiry
- `/cart` — Cart
- `/checkout` — Demo checkout and confirmation
- `/account` — Account placeholder
- `/privacy` · `/terms`

## What works

- Navigation, search, mobile drawer
- Product browsing, filters, sorting, load more
- Custom cake options with live demo pricing
- Cart add / update / remove, persisted in `localStorage`
- Demo checkout validation and a local order reference
- Frenchies, B2B, and newsletter forms with demo success states
- Scroll-tied cake movement on desktop (position, scale, slight rotation). Mobile uses a static hero cake. This is not 3D.

## Editable demo data

Replace values in:

- `data/site.ts` — currency, contact, navigation, announcement
- `data/products.ts` — catalogue and prices
- `data/categories.ts`
- `data/frenchies.ts`
- `data/b2b.ts`

Brand assets live in `public/brand/`. Product photography is Unsplash demo imagery in `public/images/`.

## Still required from the business

- Confirmed catalogue, prices, and currency
- Studio photography (and a transparent cake or 3D asset if the scroll piece should evolve)
- Real contact details and policies
- Backend for cart, checkout, forms, and newsletter
- Payment provider
- Confirmed Frenchies programme and B2B services
