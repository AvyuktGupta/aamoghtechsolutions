import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50kb' }));

app.use(
  cors({
    origin(origin, callback) {
      const configured = process.env.CLIENT_ORIGIN;
      if (configured) return callback(null, origin === configured);

      if (!origin) return callback(null, true);

      const isLocalhost =
        /^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);
      return callback(null, isLocalhost);
    },
    methods: ['POST'],
  })
);

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
      return res.status(400).json({ ok: false, error: 'Missing fields' });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.CONTACT_TO || gmailUser;

    if (!gmailUser || !gmailAppPassword) {
      return res.status(500).json({ ok: false, error: 'Server email is not configured' });
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

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Contact email failed:', err);
    const details = process.env.NODE_ENV === 'production' ? undefined : String(err?.message || err);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send email',
      ...(details ? { details } : {}),
    });
  }
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Contact API listening on http://localhost:${port}`);
});

