import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import pressReleaseRouter from "./routes/pressReleaseRoutes.js"
import certificateRouter from "./routes/certificateRoutes.js"

connectDB()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
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

app.get('/', (req, res) => res.send("Auth API working"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/press-releases', pressReleaseRouter)
app.use('/api/certificates', certificateRouter)

app.listen(port, () => console.log(`Auth server started on PORT: ${port}`))
