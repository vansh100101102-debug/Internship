import latestUpdateRouter from "./routes/latestUpdateRoutes.js"
import careerRouter from "./routes/careerRoutes.js"
import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import pressReleaseRouter from "./routes/pressReleaseRoutes.js"
import certificateRouter from "./routes/certificateRoutes.js"
import contactRouter from "./routes/contactRoutes.js"
import reviewRouter from "./routes/reviewRoutes.js"
import hireRouter from "./routes/hireRoutes.js"
import serviceRouter from "./routes/serviceRoutes.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, "uploads")))

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178',
  'http://localhost:3000',
  'https://zetawa.com',
  'https://www.zetawa.com',
  'https://zetawa-dark.vercel.app',
  'https://zetawa.netlify.app'
]

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl, or same-origin proxy)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(null, true)
  },
  credentials: true
}))

// Root health check
app.get('/', (req, res) => res.send("Zetawa Unified Backend API is running ✅"))

// Feature Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/press-releases', pressReleaseRouter)
app.use('/api/certificates', certificateRouter)
app.use('/api/latest-updates', latestUpdateRouter)
app.use('/api/careers', careerRouter)
app.use('/api/services', serviceRouter)

// Contact & Admin routes
app.use('/api/contact', contactRouter)
app.use('/', contactRouter)

// Feedback / Reviews routes
app.use('/api/reviews', reviewRouter)

// Hire routes
app.use('/api/hire', hireRouter)
app.use('/api', hireRouter) // Compatibility for /api/hire

app.listen(port, () => console.log(`🚀 Zetawa Unified Server running on PORT: ${port}`))
