import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const getTargetEmail = (inquiryType) => {
  const emailRouting = {
    "Sales Inquiry": "sales@zetawa.com",
    "General Inquiry": "support@zetawa.com",
    "Technical Support": "hr@zetawa.com",
    "Career Opportunities": "hr@zetawa.com",
    "Partnership": "hr@zetawa.com",
    "Media Inquiry": "hr@zetawa.com"
  };

  return emailRouting[inquiryType] || "support@zetawa.com";
};

/* =======================
   CONTACT FORM API
   ======================= */
const handleContactForm = async (req, res) => {
  const { name, email, phone, inquiryType, message } = req.body;

  if (!name || !email || !inquiryType || !message) {
    return res.status(400).json({
      message: "Missing required fields: name, email, inquiryType, and message"
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || process.env.EMAIL,
        pass: process.env.EMAIL_PASS || process.env.PASSWORD
      }
    });

    const targetEmail = getTargetEmail(inquiryType);

    await transporter.sendMail({
      from: process.env.EMAIL_USER || process.env.EMAIL,
      to: targetEmail,
      subject: `New ${inquiryType} from ${name}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Routed to:</strong> ${targetEmail}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });

    res.status(200).json({
      message: "Message sent successfully!",
      routedTo: targetEmail,
      sentTo: targetEmail
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      message: "Failed to send message",
      error: error.message
    });
  }
};

router.post("/", handleContactForm);
router.post("/contact", handleContactForm);

/* =======================
   HEALTH CHECK
   ======================= */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

/* =======================
   ADMIN LOGIN
   ======================= */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USER = process.env.ADMIN_USER || "tabrezalam";
  const ADMIN_PASS = process.env.ADMIN_PASS || "tabrezalam123";

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing credentials" });
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res
      .status(200)
      .json({ success: true, message: "Login successful" });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
});

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USER = process.env.ADMIN_USER || "tabrezalam";
  const ADMIN_PASS = process.env.ADMIN_PASS || "tabrezalam123";

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing credentials" });
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res
      .status(200)
      .json({ success: true, message: "Login successful" });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
});

export default router;
