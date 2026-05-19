import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // HANDLE PREFLIGHT
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

    // SUPPORT BOTH FORMS
    const {
  name,
  firstName,
  lastName,
  fullName,
  email,
  phone,
  mobile,
  service,
  selectedService,
  message,
  projectDetails,
  details
} = req.body || {};

const finalName =
  name ||
  fullName ||
  `${firstName || ""} ${lastName || ""}`.trim();

const finalPhone =
  phone ||
  mobile ||
  "";

const finalService =
  service ||
  selectedService ||
  "";

const finalMessage =
  message ||
  projectDetails ||
  details ||
  "";

    // SEND EMAIL
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "aimentorstdi@gmail.com",
      subject: `New Contact Form from ${finalName || "Unknown"}`,
      html: `
        <h1>New Contact Form Message</h1>
        <p><strong>Name:</strong> ${finalName || ""}</p>
        <p><strong>Email:</strong> ${email || ""}</p>
        <p><strong>Phone:</strong> ${phone || ""}</p>
        <p><strong>Service:</strong> ${service || ""}</p>
        <p><strong>Message:</strong></p>
        <p>${finalMessage || ""}</p>
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
