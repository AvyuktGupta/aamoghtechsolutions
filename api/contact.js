import nodemailer from 'nodemailer';

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body =
      typeof req.body === 'string' && req.body.length > 0
        ? JSON.parse(req.body)
        : req.body || {};

    const { name, email, message } = body;

    if (
      !isNonEmptyString(name) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(message)
    ) {
      return res.status(400).json({ ok: false, error: 'Missing fields' });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.CONTACT_TO || gmailUser;

    if (!gmailUser || !gmailAppPassword) {
      return res
        .status(500)
        .json({ ok: false, error: 'Server email is not configured' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanMessage = String(message).trim();

    await transporter.sendMail({
      from: `"ContactUSAamogh" <${gmailUser}>`,
      to: toEmail,
      replyTo: cleanEmail,
      subject: `Contact form: ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nMessage: ${cleanMessage}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact email failed:', err);
    const details =
      process.env.NODE_ENV === 'production'
        ? undefined
        : String(err?.message || err);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send email',
      ...(details ? { details } : {}),
    });
  }
}
