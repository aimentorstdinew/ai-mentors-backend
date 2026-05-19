import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    // Browser test
    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        message: "API is running"
      });
    }

    // Only allow POST
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed"
      });
    }

    const body = req.body || {};

    const {
      name,
      email,
      phone,
      service,
      message
    } = body;

    // Test static fallback values
    const finalName = name || "Nitin Verma";
    const finalEmail = email || "test@gmail.com";
    const finalPhone = phone || "9876543210";
    const finalService = service || "Web Development";
    const finalMessage = message || "This is a test email from contact form.";

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "aimentorstdi@gmail.com",
      subject: `New Contact Form from ${finalName}`,
      html: `
        <h1>New Contact Form Message</h1>
        <p><strong>Name:</strong> ${finalName}</p>
        <p><strong>Email:</strong> ${finalEmail}</p>
        <p><strong>Phone:</strong> ${finalPhone}</p>
        <p><strong>Service:</strong> ${finalService}</p>
        <p><strong>Message:</strong></p>
        <p>${finalMessage}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
