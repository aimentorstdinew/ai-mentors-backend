const { Resend } = require("resend");

module.exports = async (req, res) => {
try {
const resend = new Resend(process.env.RESEND_API_KEY);

```
const result = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "aimentorstdi@gmail.com",
  subject: "Test Email",
  html: "<h1>Hello from Vercel + Resend</h1>"
});

return res.status(200).json({
  success: true,
  result
});
```

} catch (error) {
console.error(error);

```
return res.status(500).json({
  error: error.message,
  full: error
});
```

}
};
