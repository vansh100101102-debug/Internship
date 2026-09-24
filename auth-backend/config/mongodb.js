import "dotenv/config"
import mongoose from "mongoose"

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Auth Database connected")
  })

  let url = (process.env.MONGODB_URL || "").trim()
  if (url && !url.includes("mern-auth") && !url.includes("?")) {
    url = url.endsWith("/") ? `${url}mern-auth` : `${url}/mern-auth`
  }

  await mongoose.connect(url, { dbName: "mern-auth" })
}

export default connectDB
