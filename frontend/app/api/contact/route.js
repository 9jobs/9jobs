import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, message } = await request.json();

    let gmailPass = process.env.GMAIL_PASS;

    // Manual fallback if environment variables haven't reloaded
    if (!gmailPass) {
      try {
        const envPath = path.join(process.cwd(), '../.env');
        if (fs.existsSync(envPath)) {
          const envContent = fs.readFileSync(envPath, 'utf8');
          const match = envContent.match(/^GMAIL_PASS=(.*)$/m);
          if (match && match[1]) {
            gmailPass = match[1].trim();
          }
        }
      } catch (e) {
        console.error('Error reading .env manually:', e);
      }
    }

    if (!gmailPass) {
      throw new Error('GMAIL_PASS is not defined. Please restart your npm run dev command.');
    }

    // Configure the transporter with explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: '9jobsapplicationservice@gmail.com',
        pass: gmailPass,
      },
    });

    const mailOptions = {
      from: '"9Jobs Contact Form" <9jobsapplicationservice@gmail.com>',
      to: '9jobsapplicationservice@gmail.com',
      replyTo: email,
      subject: `New Contact Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #d9ff5f; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold; margin-bottom: 10px;">Message:</p>
            <p style="margin: 0; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">This message was sent via the 9Jobs contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: 'Form submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email Error:', error);
    // Return a more user-friendly error but log the technical one
    return NextResponse.json({ 
      error: `Failed to send message. Please check if the credentials in .env are correct. (Error: ${error.message})` 
    }, { status: 500 });
  }
}
