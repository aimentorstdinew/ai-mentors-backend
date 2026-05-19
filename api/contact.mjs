import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // PREFLIGHT REQUEST
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // HEALTH CHECK
    if (req.method === "GET") {
      return res.status(200).json({
        success: true,
        message: "API is running"
      });
    }

    // ONLY ALLOW POST
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed"
      });
    }

    const { name, email, phone, service, message } = req.body || {};

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "aimentorstdi@gmail.com",
      subject: `New Contact Form from ${name || "Unknown"}`,
      html: `
        <h1>New Contact Form Message</h1>
        <p><strong>Name:</strong> ${name || ""}</p>
        <p><strong>Email:</strong> ${email || ""}</p>
        <p><strong>Phone:</strong> ${phone || ""}</p>
        <p><strong>Service:</strong> ${service || ""}</p>
        <p><strong>Message:</strong></p>
        <p>${message || ""}</p>
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
