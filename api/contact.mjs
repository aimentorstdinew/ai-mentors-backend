import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
try {

```
const result = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "aimentorstdi@gmail.com",
  subject: "Static Test Email",
  html: `
    <h1>Resend Working Successfully 🚀</h1>

    <p>Name: Nitin</p>

    <p>Email: test@gmail.com</p>

    <p>Message: This is a static test email.</p>
  `,
});

return res.status(200).json({
  success: true,
  result,
});
```

} catch (error) {
return res.status(500).json({
error: error.message,
});
}
}
