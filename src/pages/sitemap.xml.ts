import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ site }) => {
  const base = (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? site?.toString() ?? 'https://arclight.example';
  const urls = ['', 'services', 'case-studies', 'about', 'contact'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base.replace(/\/$/, '')}/${u}</loc>
    <changefreq>monthly</changefreq>
    <priority>${u === '' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
