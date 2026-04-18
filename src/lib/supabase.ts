import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

if (!url || !key) {
  console.warn('[supabase] Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(url ?? '', key ?? '', {
  auth: { persistSession: false },
});

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string | null;
  icon: string | null;
  sort_order: number;
};

export type CaseStudy = {
  id: string;
  slug: string;
  client: string;
  industry: string | null;
  title: string;
  summary: string;
  outcome: string | null;
  sort_order: number;
};

export type ContentItem = {
  id: string;
  slug: string;
  title: string;
  body: string | null;
  published_at: string | null;
  seo_description: string | null;
};
