import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://zetawa.com",          // your main domain
      "https://www.zetawa.com",      // www domain
      "https://zetawa.netlify.app",  // your Netlify frontend URL
      "http://localhost:3000"        // local development
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(express.json());

connectDB();

// routes , review
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on: http://localhost:${PORT}`));
