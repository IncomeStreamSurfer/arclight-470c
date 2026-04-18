# Arclight Advisory

Boutique strategy consultancy website — built with Astro 6, Tailwind v4, Supabase, and Resend, deployed on Vercel.

## What was built

- **Home** — hero, three-practice teaser, selected case studies, CTA
- **Services** — three full practices (Corporate Strategy, Growth & Transformation, M&A) pulled from Supabase
- **Case Studies** — four placeholder engagements pulled from Supabase
- **About** — story, principles, three principals
- **Contact** — form → stored in Supabase (`arc_contact_submissions`) + emailed to `hello@arclight.example` via Resend
- Design: navy (#0A1F3A) + gold (#C9A961), Playfair Display headings, Inter body
- SEO: per-page metadata, Open Graph, JSON-LD (ProfessionalService + ItemList on /services), dynamic sitemap.xml and robots.txt

## Stack

- Astro 6 (server output, @astrojs/vercel adapter)
- Tailwind v4 via @tailwindcss/vite
- Supabase (content, services, case studies, contact submissions)
- Resend REST API (contact form)

## Database tables

- `arc_content` — generic content / blog (used by Harbor for future article publishing)
- `arc_services` — three practices, seeded
- `arc_case_studies` — four case studies, seeded
- `arc_contact_submissions` — form entries

## Environment variables

See `.env.example`. All are set in Vercel.

## Next steps (manual)

- **Custom domain** — add `arclight.com` (or your real domain) in Vercel and point DNS.
- **Resend domain** — right now emails send from `onboarding@resend.dev`. To send from `hello@arclight.com`, verify the domain at https://resend.com/domains and update `src/lib/email.ts` `from` address.
- **Real content** — replace the four placeholder case studies in the `arc_case_studies` table with actual engagements.
- **Images** — the site currently uses no hero imagery; drop brand imagery into `/public` and reference from `src/layouts/BaseLayout.astro` for Open Graph.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview prod build
```
