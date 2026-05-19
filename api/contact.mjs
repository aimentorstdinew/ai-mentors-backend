import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
try {
return res.status(200).json({
success: true,
message: "Resend working"
});
} catch (error) {
return res.status(500).json({
error: error.message
});
}
}
