const { Resend } = require("resend");

module.exports = async (req, res) => {
try {
const resend = "re_M4RbtNZ4_PBssFKXPwqbMFTxyPUaoLPhz";

```
if (req.method !== "POST") {
  return res.status(405).json({
    error: "Method not allowed",
  });
}

const { name, email, phone, service, message } = req.body;

const data = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "aimentorstdi@gmail.com",
  subject: `New Message from ${name}`,
  html: `
    <h2>New Contact Form Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || ""}</p>
    <p><strong>Service:</strong> ${service || ""}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});

return res.status(200).json({
  success: true,
  data,
});
```

} catch (error) {
console.error("ERROR:", error);

```
return res.status(500).json({
  error: error.message,
});
```

}
};
