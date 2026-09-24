import { v2 as cloudinary } from "cloudinary"
import multer from "multer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure local uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Helper to dynamically check and configure Cloudinary credentials
export const isCloudinaryReady = () => {
  // Dynamically re-read .env from disk so changes take effect immediately without server restart
  dotenv.config({ path: path.join(__dirname, "..", ".env"), override: true })

  // 1. Check for CLOUDINARY_URL (format: cloudinary://<api_key>:<api_secret>@drxr2ghdj)
  const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim()
  if (cloudinaryUrl && cloudinaryUrl.startsWith("cloudinary://")) {
    const match = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@([^/?#]+)/)
    if (match) {
      const [, api_key, api_secret, cloud_name] = match
      if (
        api_key &&
        api_secret &&
        cloud_name &&
        !api_key.includes("<") &&
        !api_secret.includes("<") &&
        !api_key.includes("your_api_key")
      ) {
        cloudinary.config({
          cloud_name,
          api_key,
          api_secret,
          secure: true,
        })
        return true
      }
    }
  }

  // 2. Check for individual variables (defaults cloud_name to drxr2ghdj if not specified)
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim() || "drxr2ghdj"
  const api_key = process.env.CLOUDINARY_API_KEY?.trim()
  const api_secret = process.env.CLOUDINARY_API_SECRET?.trim()

  if (
    cloud_name &&
    api_key &&
    api_secret &&
    !api_key.includes("<") &&
    !api_secret.includes("<") &&
    !api_key.includes("your_api_key")
  ) {
    cloudinary.config({
      cloud_name,
      api_key,
      api_secret,
      secure: true,
    })
    return true
  }
  return false
}


// Initial config check
isCloudinaryReady()

// 2. Multer Disk Storage: Staged locally on disk first
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/
  const extname = allowedTypes.test(file.originalname.split('.').pop().toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  }
  cb(new Error("Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed"))
}

export const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter,
})

/**
 * Uploads a local file to Cloudinary.
 * - If upload succeeds: deletes the local file from disk and returns the secure Cloudinary URL.
 * - If upload fails or credentials are missing: retains the local file on disk so it can be re-uploaded or served directly.
 *
 * @param {string} localFilePath - Absolute or relative path to the local file
 * @param {string} folder - Target Cloudinary folder (e.g. 'zetawa_certificates')
 * @returns {Promise<{ success: boolean, url: string, isCloudinary: boolean, error?: string }>}
 */
export const uploadFileToCloudinary = async (localFilePath, folder = "zetawa_documents") => {
  if (!localFilePath) {
    return { success: false, url: "", isCloudinary: false, error: "No local file path provided" }
  }

  // Resolve absolute path if relative provided
  const absolutePath = path.isAbsolute(localFilePath)
    ? localFilePath
    : path.join(__dirname, "..", localFilePath)

  if (!fs.existsSync(absolutePath)) {
    return { success: false, url: "", isCloudinary: false, error: "Local file does not exist on disk" }
  }

  const relativeLocalPath = path
    .relative(path.join(__dirname, ".."), absolutePath)
    .replace(/\\/g, "/")

  const isConfigured = isCloudinaryReady()

  if (!isConfigured) {
    // Cloudinary credentials not provided; retain local file safely
    return {
      success: false,
      url: relativeLocalPath,
      isCloudinary: false,
      message: "Cloudinary credentials not set in .env. File safely stored in local disk.",
    }
  }

  try {
    // Upload to Cloudinary with auto resource type (handles PDF, images, docs)
    let result
    try {
      result = await cloudinary.uploader.upload(absolutePath, {
        folder: folder,
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
      })
    } catch (autoErr) {
      console.warn("Notice: auto resource_type upload returned, trying raw resource_type:", autoErr.message)
      result = await cloudinary.uploader.upload(absolutePath, {
        folder: folder,
        resource_type: "raw",
        use_filename: true,
        unique_filename: true,
      })
    }

    // On SUCCESS: Delete local file from disk
    try {
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath)
      }
    } catch (unlinkErr) {
      console.warn("Notice: Could not delete local temp file after Cloudinary upload:", unlinkErr.message)
    }

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      isCloudinary: true,
    }
  } catch (err) {
    // On ERROR: Keep local file on disk so it can be re-uploaded and accessed safely
    console.error("Cloudinary upload failed. Local copy preserved for retry:", err.message)
    return {
      success: false,
      url: relativeLocalPath,
      isCloudinary: false,
      error: err.message,
    }
  }
}

/**
 * Removes a file from either Cloudinary (if URL) or local disk (if relative path).
 * @param {string} fileUrlOrPath
 */
export const deleteFileFromStorage = async (fileUrlOrPath) => {
  if (!fileUrlOrPath) return
  try {
    if (fileUrlOrPath.startsWith("http://") || fileUrlOrPath.startsWith("https://")) {
      // Delete from Cloudinary
      // Format: https://res.cloudinary.com/<cloud>/raw/upload/v<ver>/<folder>/<name>.<ext>
      const urlParts = fileUrlOrPath.split("/")
      const filename = urlParts.pop()
      const folder = urlParts.pop()
      const publicId = `${folder}/${filename.split(".")[0]}`

      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" }).catch(async () => {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
      })
    } else {
      // Delete from local disk
      const localPath = path.join(__dirname, "..", fileUrlOrPath)
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath)
      }
    }
  } catch (err) {
    console.warn("Notice: Error while removing file from storage:", err.message)
  }
}

export default upload

