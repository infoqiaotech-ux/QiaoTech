import { NextRequest, NextResponse } from "next/server";

// ─── Contact Form API Route ────────────────────────────────────────────────────
//
// This API route handles form submissions from the contact section.
//
// TO ACTIVATE EMAIL SENDING:
// 1. Install Resend: npm install resend
//    Sign up at https://resend.com and get your API key.
//    Add RESEND_API_KEY=re_xxxxxxxx to your .env.local file.
//    Uncomment the Resend implementation below.
//
// 2. OR use EmailJS directly in the client (see ContactSection.tsx comments).
//
// 3. OR use Formspree (no backend needed) — see ContactSection.tsx comments.
//
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ── Option 1: Resend Email Service ──────────────────────────────────────
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY); // Add key to .env.local
    //
    // await resend.emails.send({
    //   from: "QIAO TECH Website <no-reply@qiaotech.in>",
    //   to: ["somnath@qiaotech.in"],                        // ← Change to real email
    //   replyTo: email,
    //   subject: `New Inquiry from ${name} — ${projectType}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Project Type:</strong> ${projectType}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, "<br>")}</p>
    //   `,
    // });
    // ────────────────────────────────────────────────────────────────────────

    // ── Option 2: Nodemailer (SMTP/Gmail) ───────────────────────────────────
    // import nodemailer from "nodemailer";
    // const transporter = nodemailer.createTransporter({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.GMAIL_USER,     // Add to .env.local
    //     pass: process.env.GMAIL_APP_PASS, // Use App Password, not account password
    //   },
    // });
    // await transporter.sendMail({
    //   from: `"QIAO TECH Website" <${process.env.GMAIL_USER}>`,
    //   to: "somnath@qiaotech.in",
    //   replyTo: email,
    //   subject: `New Inquiry: ${name} — ${projectType}`,
    //   text: `Name: ${name}\nEmail: ${email}\nProject: ${projectType}\n\n${message}`,
    // });
    // ────────────────────────────────────────────────────────────────────────

    // Demo response (remove when real service is wired up)
    console.log("Form submission received:", { name, email, projectType, message });

    return NextResponse.json(
      { success: true, message: "Your requirement has been transmitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
