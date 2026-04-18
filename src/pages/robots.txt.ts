import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = () => {
  const base = (import.meta.env.PUBLIC_SITE_URL as string | undefined) ?? 'https://arclight.example';
  const body = `User-agent: *
Allow: /

Sitemap: ${base.replace(/\/$/, '')}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
