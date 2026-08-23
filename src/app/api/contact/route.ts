import { NextResponse } from 'next/server';

const RECAPTCHA_ACTION = 'contact_submit';
const MIN_RECAPTCHA_SCORE = 0.5;

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  token?: unknown;
};

type ReCaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
};

function isValidText(value: unknown, maxLength: number, required = true): value is string {
  return (
    typeof value === 'string' &&
    value.trim().length <= maxLength &&
    (!required || value.trim().length > 0)
  );
}

export async function POST(request: Request) {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const appsScriptUrl =
    process.env.APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  if (!recaptchaSecret || !appsScriptUrl) {
    console.error('Contact form environment variables are not configured.');
    return NextResponse.json(
      { error: 'The contact form is temporarily unavailable.' },
      { status: 503 }
    );
  }

  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  if (
    !isValidText(body.name, 100) ||
    !isValidText(body.email, 254) ||
    !isValidText(body.subject, 150, false) ||
    !isValidText(body.message, 5000) ||
    !isValidText(body.token, 4096)
  ) {
    return NextResponse.json({ error: 'Please check the form fields and try again.' }, { status: 400 });
  }

  const email = body.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const verificationResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: body.token,
        }),
        cache: 'no-store',
      }
    );

    if (!verificationResponse.ok) {
      throw new Error(`reCAPTCHA verification returned ${verificationResponse.status}.`);
    }

    const verification = (await verificationResponse.json()) as ReCaptchaResponse;
    if (
      !verification.success ||
      verification.action !== RECAPTCHA_ACTION ||
      typeof verification.score !== 'number' ||
      verification.score < MIN_RECAPTCHA_SCORE
    ) {
      return NextResponse.json(
        { error: 'Captcha verification failed. Please try again.' },
        { status: 403 }
      );
    }

    const deliveryResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name.trim(),
        email,
        subject: body.subject.trim(),
        message: body.message.trim(),
      }),
      cache: 'no-store',
    });

    if (!deliveryResponse.ok) {
      throw new Error(`Contact delivery returned ${deliveryResponse.status}.`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please try again.' },
      { status: 502 }
    );
  }
}