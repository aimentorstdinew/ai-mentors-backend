module.exports = async (req, res) => {
try {
return res.status(200).json({
success: true,
env: process.env.RESEND_API_KEY ? "KEY_EXISTS" : "NO_KEY",
body: req.body
});
} catch (error) {
return res.status(500).json({
error: error.message
});
}
};
