# Sanity Photon - Studio

This is the Sanity Studio configuration for the Sanity Photon e-commerce starter. It's customized to integrate with Shopify and provide a visual editing experience for your e-commerce content.

## Features

- **Product & Collection Management**: Edit and organize Shopify products with additional content
- **Page Builder**: Create custom editorial pages with a flexible section-based approach
- **Visual Editing**: Preview content changes in real-time with the Visual Editing feature
- **SEO Tools**: Manage SEO metadata and social sharing previews
- **Media Management**: Organize and optimize images for your products and content
- **Type Safety**: Full TypeScript implementation with automatic type generation

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A Sanity account
- A Shopify store (for commerce integration)

### Environment Setup

Copy the `.env.example` file to `.env` and fill in the values:

```
SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_PREVIEW_URL="" #Optional - defaults to http://localhost:3000
SANITY_STUDIO_STUDIO_HOST="" #Optional
```

### Running the Studio

Run the development server with:

```bash
npm run dev
```

Or, for just the studio:

```bash
npm run dev:studio
```

Visit [http://localhost:3333](http://localhost:3333) to access Sanity Studio.

## Structure

- `/src` - Studio source code
  - `/schemas` - Content schemas defining the data structure
  - `/components` - Custom input components and previews
  - `/desk` - Desk structure customization
  - `/plugins` - Studio plugin configurations

## Customization

### Content Schema

The content schema defines the structure of your data. To modify:

1. Edit or add schema files in the `/src/schemas` directory
2. Import and register your schemas in the main schema index file
3. Restart the studio to see your changes

### Desk Structure

Customize how content is organized in the studio by modifying the desk structure in `/src/desk`.

### Plugins

Add or configure Sanity plugins in `sanity.config.ts`.

## Shopify Integration

The studio is set up to work with the Shopify integration, which syncs:

- Products
- Collections
- Variants

You can extend these with additional editorial content through the studio interface.

## Deployment

Deploy Sanity Studio using the Sanity CLI:

```bash
npx sanity deploy
```

This will deploy your studio to a `[projectId].sanity.studio` URL.

## Learn More

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Studio Customization](https://www.sanity.io/docs/studio-customization)

## Related

- Main project: [Sanity Photon](https://github.com/soufDev/sanity-photon)
- [Next.js Storefront](https://github.com/soufDev/sanity-photon/tree/main/storefront)