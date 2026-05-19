import { Resend } from "resend";

export default async function handler(req, res) {
try {
const resend = new Resend(process.env.RESEND_API_KEY);

```
return res.status(200).json({
  success: true,
  message: "OK"
});
```

} catch (error) {
return res.status(500).json({
error: error.message
});
}
}
