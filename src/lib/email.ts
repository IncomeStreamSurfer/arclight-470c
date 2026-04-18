const RESEND_API_KEY = import.meta.env.RESEND_API_KEY as string | undefined;

export type SendEmailOpts = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  from?: string;
};

export async function sendEmail(opts: SendEmailOpts) {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY is not set, skipping send');
    return { skipped: true };
  }

  const body = {
    from: opts.from ?? 'Arclight Advisory <onboarding@resend.dev>',
    to: Array.isArray(opts.to) ? opts.to : [opts.to],
    subject: opts.subject,
    html: opts.html,
    reply_to: opts.replyTo,
  };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[email] Resend failed', res.status, text);
    return { ok: false, status: res.status, error: text };
  }
  return { ok: true, data: await res.json() };
}
