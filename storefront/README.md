# Sanity Photon - Storefront

This is the Next.js storefront application for the Sanity Photon e-commerce starter. It's built with the Next.js App Router and connects to both Sanity Studio for content and Shopify for commerce functionality.

## Features

- **App Router Architecture**: Modern, efficient routing with built-in layouts
- **Static Generation**: Fast load times and SEO benefits with static page generation
- **Dynamic Cart**: Client-side cart functionality using Shopify's Storefront API
- **Visual Editing**: Sanity Visual Editing support for content previews
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach with clean CSS modules

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Sanity account and project
- A Shopify store with Storefront API access
- (Optional) Klaviyo account for email list management

### Environment Setup

Copy the `.env.example` file to `.env.local` and fill in the values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="yyyy-mm-dd"
NEXT_PUBLIC_SANITY_STUDIO_URL="" #Optional, defaults to http://localhost:3333

SANITY_API_READ_TOKEN="your-sanity-token"

SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-shopify-token"
SHOPIFY_STORE_ID="your-store-id"
SHOPIFY_STORE_DOMAIN="your-store-id.myshopify.com"
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-store-id.myshopify.com"

KLAVIYO_PRIVATE_API_KEY="your-klaviyo-key" #Optional
```

### Running the Development Server

Run the development server with:

```bash
npm run dev
```

Or, for just the storefront:

```bash
npm run dev:storefront
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

## Structure

- `/app` - App Router routes and page components
  - `/[slug]` - Dynamic editorial pages
  - `/collections` - Collection listing and detail pages
  - `/products` - Product detail pages
  - `/studio` - Embedded Sanity Studio
  - `/_cart` - Client-side cart components
- `/components` - Reusable UI components
- `/sanity` - Sanity client, queries, and types
- `/shopify` - Shopify client and types
- `/styles` - Global styles and CSS modules
- `/utils` - Helper functions

## Customization

### Styling

The project uses CSS Modules for component styling. Global styles are in `/styles/globals.css`.

To customize:
- Edit component-specific styles in their `.module.css` files
- Add global styles to `/styles/globals.css`
- Or integrate Tailwind CSS following Next.js documentation

### Adding New Routes

1. Create a new directory in the `/app` folder
2. Add a `page.tsx` file for the route content
3. Optionally add a `layout.tsx` for route-specific layouts

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `.next` folder.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)

## Related

- Main project: [Sanity Photon](https://github.com/soufDev/sanity-photon)
- [Sanity Studio](https://github.com/soufDev/sanity-photon/tree/main/studio)