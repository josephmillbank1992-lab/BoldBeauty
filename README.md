# Bold Beauty

A responsive, dependency-free, static website for Jade’s Bold Beauty in Lowton. Based on the approved black-and-white homepage concept.

## Work locally
Requires Node.js 20 or newer.
- `npm run build` generates `dist/`.
- `npm run check` validates generated pages, links, assets and structured data.
- Serve `dist/` with any static HTTP server.

Edit shared business details, treatment descriptions, qualifications and supplied review excerpts in `src/data.mjs`. Layouts are in `scripts/build.mjs`; styles and the accessible mobile menu are in `public/`.

## Content and imagery
The logo is Jade’s supplied logo, resized without redesign. The lash photograph is Jade’s supplied treatment image, rotated for correct display and exported to WebP. Lip and skin panels use original line illustrations until further client photographs are available. Review excerpts come from supplied Google review screenshots. No review count is hardcoded. Prices and availability remain authoritative on Booksy.

## Review before launch
- Confirm the treatment wording, business address, eight years of experience and qualifications with Jade.
- Obtain any remaining treatment photographs, opening hours, privacy contact details and policies. Do not invent missing details.
- Confirm domain ownership and chosen canonical domain. No custom domain is connected by this build.
- Preview pages are deliberately noindex/nofollow in HTML, robots.txt and Vercel headers. Before public launch, remove all three restrictions, add canonical and absolute social metadata, generate a sitemap for the confirmed domain and verify the live domain in Search Console.
- Privacy notice is a factual draft describing this build; Jade should approve business-specific processing details before launch.
- No analytics, advertising, custom forms, accounts or booking database are included. Bookings stay on Booksy.
