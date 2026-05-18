const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
if (req.method !== "POST") {
return res.status(405).json({
error: "Method not allowed",
});
}

try {
const {
firstName,
lastName,
name,
email,
phone,
service,
message,
} = req.body;

```
const displayName =
  name ||
  `${firstName || ""} ${lastName || ""}`.trim() ||
  "Unknown";

const response = await resend.emails.send({
  from: "Contact <onboarding@resend.dev>",
  to: "aimentorstdi@gmail.com",
  reply_to: email,
  subject: `New Contact Form from ${displayName}`,
  html: `
    <h2>New Message</h2>
    <p><strong>Name:</strong> ${displayName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || ""}</p>
    <p><strong>Service:</strong> ${service || ""}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});

return res.status(200).json({
  success: true,
  response,
});
```

} catch (err) {
console.error(err);

```
return res.status(500).json({
  error: err.message,
});
```

}
};
