import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase.ts';
import { sendEmail } from '../../lib/email.ts';

export const prerender = false;

const escape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const form = await request.formData();
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const company = String(form.get('company') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();

    if (!name || !email || !message) {
      return redirect('/contact?err=missing', 303);
    }

    // Store in Supabase
    const { error: dbErr } = await supabase.from('arc_contact_submissions').insert({
      name,
      email,
      company: company || null,
      message,
    });
    if (dbErr) {
      console.error('[contact] supabase insert error', dbErr);
    }

    // Send via Resend to hello@arclight.example
    const html = `
      <div style="font-family: Georgia, serif; color: #0a1f3a; max-width: 600px;">
        <h2 style="color:#0a1f3a; border-bottom:2px solid #c9a961; padding-bottom:8px;">New Arclight enquiry</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escape(email)}">${escape(email)}</a></p>
        ${company ? `<p><strong>Company:</strong> ${escape(company)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap; background:#f3f6fb; padding:16px; border-left:3px solid #c9a961;">${escape(message)}</p>
        <p style="color:#666; font-size:12px; margin-top:24px;">Sent from the arclight.example contact form.</p>
      </div>
    `;

    const result = await sendEmail({
      to: 'hello@arclight.example',
      subject: `New enquiry — ${name}${company ? ` (${company})` : ''}`,
      html,
      replyTo: email,
    });

    if ('ok' in result && result.ok === false) {
      console.error('[contact] email send failed', result);
    }

    return redirect('/contact?sent=1', 303);
  } catch (err) {
    console.error('[contact] unexpected error', err);
    return redirect('/contact?err=1', 303);
  }
};
