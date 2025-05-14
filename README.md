# Sanity Photon

This is a simple starter for a headless shopify, sanity and a next.js e-commerce website.

It's ideal for small shops that want a truly custom experience for their customer.

- The Next.js pages are statically generated for the sake of resilience, speed and cost. You can create as many editorial pages as you want, and customize parts of your collection and product pages.
- Styling is intentionally kept minimal for better control, i.e. no need to look into tailwind strings to find the class you need to remove to match your design. You can bring in Tailwind, or use what I prefer, SCSS modules.
- Sanity brings in a page builder with visual editing of your content. Sanity also helps manage SEO and OG previews.
- Shopify powers the commerce experience with SKU, payment, shipping and more.
- Kyslely is wired up for a simple email list keeping.

With the Sanity live API and the Shopify-Sanity sync, all data is cached and fine-grained revalidation is set up automatically for you. No webhooks needed.

## TODO

- [ ] Preview for sanity sections
- [ ] Write tutorial
- [ ] Shoot video tutorial
- [ ] Add redirect/rewrites

### extra

- [ ] Set up i18n
- [ ] Add PLP filters
