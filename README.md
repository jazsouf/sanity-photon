# Sanity Photon 💡

## A headless Shopify + Sanity + Next.js E-commerce Starter

Sanity Photon is a minimal starter kit for building custom e-commerce experiences with a headless architecture. It combines the power of Shopify for commerce operations, Sanity for content management, and Next.js for a fast, SEO-friendly storefront.

![Sanity Photon](https://raw.githubusercontent.com/jazsouf/sanity-photon/main/sanity-photon-banner.png)

## Features ✨

- **Next.js App Router** - Statically generated pages for speed, SEO, and cost-efficiency
- **Sanity Studio** - Visual editing with real-time preview for all your content
- **Shopify Integration** - Leveraging Shopify's commerce infrastructure for products, payments, shipping, etc.
- **Page Builder** - Create and customize editorial, collection, and product pages
- **Real-time Updates** - Sanity Live API and Shopify-Sanity sync with automatic fine-grained revalidation
- **Klaviyo Integration** - Email list management for your marketing needs
- **Minimal Styling** - Intentionally lightweight CSS for maximum customization flexibility
- **TypeScript** - Full type safety throughout the codebase

## Getting Started 🛠️

### Prerequisites

- Node.js 18.17 or later
- Shopify Partner account with a store
- Sanity account
- (Optional) Klaviyo account for email marketing

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/soufDev/sanity-photon.git
   cd sanity-photon
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` files in both `studio` and `storefront` directories to create `.env` files
   - Fill in the required values (see Configuration section below)

4. Start the development environment:
   ```
   npm run dev
   ```

This will start both the Sanity Studio (http://localhost:3333) and the Next.js storefront (http://localhost:3000).

## Configuration 🔧

### Sanity Configuration

1. Create a new Sanity project at [sanity.io/manage](https://sanity.io/manage)
2. Get your Project ID from the project dashboard
3. Create an API token with read permissions
4. Add these to the respective `.env` files:

```
# studio/.env
SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"

# storefront/.env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01" # Use current or future date
SANITY_API_READ_TOKEN="your-read-token"
```

### Shopify Configuration

1. Set up a Shopify store (or use an existing one)
2. Create a custom app in your Shopify Admin (Apps > Develop apps > Create an app)
3. Set up the Storefront API permissions
4. Generate a Storefront API token
5. Add Shopify variables to `storefront/.env`:

```
SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-token"
SHOPIFY_STORE_ID="your-store-id"
SHOPIFY_STORE_DOMAIN="your-store-id.myshopify.com"
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-store-id.myshopify.com"
```

### Klaviyo Configuration (Optional)

If you want to use Klaviyo for email list management:

1. Create a Klaviyo account and get your Public API Key
2. Add to `storefront/.env`:

```
KLAVIYO_PRIVATE_API_KEY="your-klaviyo-api-key"
```

## Architecture 🏗️

### Project Structure

- `/studio` - Sanity Studio configuration and schemas
- `/storefront` - Next.js frontend application
  - `/app` - Routes and application components
  - `/components` - Reusable UI components
  - `/sanity` - Sanity client and queries
  - `/shopify` - Shopify integration logic

### Data Flow

1. **Products & Collections**: Managed in Shopify, synced to Sanity
2. **Content**: Managed in Sanity Studio
3. **Cart & Checkout**: Handled by Shopify Storefront API
4. **Front-end**: Next.js consumes data from Sanity's API, which includes the synced Shopify data

## Customization 🎨

### Styling

The project uses CSS Modules for styling. You can:

- Continue using the CSS Modules approach
- Integrate Tailwind CSS
- Add any other styling solution you prefer

### Content Structure

Modify the Sanity schema in `/studio/src/schemas` to adapt the content model to your needs.

### Components

Customize UI components in `/storefront/components` to match your brand's design.

## Deployment 🚀

### Sanity Studio

Deploy Sanity Studio to Sanity's hosting with:

```
cd studio
npx sanity deploy
```

### Next.js Storefront

The storefront can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting:

```
# For Vercel
vercel

# For production
vercel --prod
```

### Future Enhancements

- [ ] Internationalization (i18n) support
- [ ] Product listing page (PLP) filters
- [ ] Redirect/rewrites functionality

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements 🙏

- [Shopify](https://www.shopify.com/)
- [Sanity](https://www.sanity.io/)
- [Next.js](https://nextjs.org/)
- [Klaviyo](https://www.klaviyo.com/)

---

Created with love by [Soufiane El Jazouli](https://github.com/soufDev)
