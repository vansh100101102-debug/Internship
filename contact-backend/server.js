const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =======================
   CORS CONFIG (FINAL)
   ======================= */
app.use(
  cors({
    origin: [
      "https://www.zetawa.com",
      "https://zetawa.com",
      "https://zetawa-dark.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

/* =======================
   BODY PARSER
   ======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   ROOT CHECK
   ======================= */
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

/* =======================
   EMAIL ROUTING
   ======================= */
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
app.post("/contact", async (req, res) => {
  const { name, email, phone, inquiryType, message } = req.body;

  if (!name || !email || !inquiryType || !message) {
    return res.status(400).json({
      message:
        "Missing required fields: name, email, inquiryType, and message"
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const targetEmail = getTargetEmail(inquiryType);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
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
      routedTo: targetEmail
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      message: "Failed to send message",
      error: error.message
    });
  }
});

/* =======================
   HEALTH CHECK
   ======================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

/* =======================
   ADMIN LOGIN
   ======================= */
app.post("/admin/login", (req, res) => {
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

/* =======================
   START SERVER
   ======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
