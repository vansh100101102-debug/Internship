import certificateModel from "../models/certificateModel.js"
import { uploadFileToCloudinary, deleteFileFromStorage } from "../config/cloudinary.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Helper to ensure a certificate's file is uploaded to Cloudinary.
 * If the file is still stored locally in uploads/ and Cloudinary is configured,
 * it will automatically upload the local file to Cloudinary, delete the local file,
 * and update the database with the Cloudinary secure URL.
 */
const ensureCloudinaryUrl = async (cert) => {
  if (!cert || !cert.certificateFile) return cert
  // Already a Cloudinary URL or external HTTP URL
  if (cert.certificateFile.startsWith("http://") || cert.certificateFile.startsWith("https://")) {
    return cert
  }
  // Local file staged on disk
  const localFilePath = path.join(__dirname, "..", cert.certificateFile)
  if (fs.existsSync(localFilePath)) {
    try {
      const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
      if (uploadRes.success && uploadRes.url) {
        cert.certificateFile = uploadRes.url
        await certificateModel.findByIdAndUpdate(cert._id, { certificateFile: uploadRes.url })
      }
    } catch (err) {
      console.warn("Notice: Auto Cloudinary upload failed:", err.message)
    }
  }
  return cert
}

// Get all certificates (public for verification & admin listing)
export const getCertificates = async (req, res) => {
  try {
    const certs = await certificateModel.find().sort({ createdAt: -1 })
    // Ensure any local files get synced to Cloudinary if credentials are ready
    for (let i = 0; i < certs.length; i++) {
      if (certs[i].certificateFile && !certs[i].certificateFile.startsWith("http")) {
        await ensureCloudinaryUrl(certs[i])
      }
    }
    res.json({ success: true, data: certs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Verify certificate (public)
export const verifyCertificate = async (req, res) => {
  const { certificateNumber } = req.params
  try {
    const cert = await certificateModel.findOne({
      certificateNumber: { $regex: new RegExp(`^${certificateNumber}$`, "i") },
    })
    if (!cert) {
      return res.json({ success: false, message: "Certificate not found" })
    }
    // Automatically promote local file to Cloudinary link if ready
    if (cert.certificateFile && !cert.certificateFile.startsWith("http")) {
      await ensureCloudinaryUrl(cert)
    }
    res.json({ success: true, data: cert })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Create certificate (admin only)
export const createCertificate = async (req, res) => {
  const {
    certificateNumber,
    internName,
    course,
    issueDate,
    completionDate,
    duration,
    certificateUrl,
    certificateFile: bodyCertFile,
  } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)
  let certificateFile = certificateUrl || bodyCertFile || ""

  if (!certificateNumber || !internName || !course) {
    return res.json({ success: false, message: "Certificate number, intern name, and course are required" })
  }
  try {
    const existing = await certificateModel.findOne({ certificateNumber })
    if (existing) {
      return res.json({ success: false, message: "Certificate number already exists" })
    }

    if (uploadedFile) {
      // 1. Staged in local disk first
      const localFilePath = path.join(__dirname, "..", "uploads", uploadedFile.filename)
      // 2. Upload to Cloudinary; if success, auto-deletes local file; if fails, retains local copy
      const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
      console.log("createCertificate uploadRes:", JSON.stringify(uploadRes))
      certificateFile = uploadRes.success && uploadRes.url ? uploadRes.url : `uploads/${uploadedFile.filename}`
    }

    const cert = new certificateModel({
      certificateNumber,
      internName,
      course,
      issueDate: issueDate || "",
      completionDate: completionDate || "",
      duration: duration || "",
      certificateFile,
    })
    await cert.save()
    res.json({ success: true, data: cert, message: "Certificate created successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update certificate (admin only)
export const updateCertificate = async (req, res) => {
  const { id } = req.params
  const {
    certificateNumber,
    internName,
    course,
    issueDate,
    completionDate,
    status,
    duration,
    certificateUrl,
    certificateFile: bodyCertFile,
  } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)

  try {
    const existingCert = await certificateModel.findById(id)
    if (!existingCert) {
      return res.json({ success: false, message: "Certificate not found" })
    }

    let certificateFile = certificateUrl || bodyCertFile || existingCert.certificateFile

    if (uploadedFile) {
      // Delete old file if exists (from Cloudinary or local disk)
      if (existingCert.certificateFile) {
        await deleteFileFromStorage(existingCert.certificateFile)
      }
      const localFilePath = path.join(__dirname, "..", "uploads", uploadedFile.filename)
      const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
      certificateFile = uploadRes.success && uploadRes.url ? uploadRes.url : `uploads/${uploadedFile.filename}`
    }

    const cert = await certificateModel.findByIdAndUpdate(
      id,
      { certificateNumber, internName, course, issueDate, completionDate, status, duration, certificateFile },
      { new: true }
    )
    res.json({ success: true, data: cert, message: "Certificate updated successfully" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Delete certificate (admin only)
export const deleteCertificate = async (req, res) => {
  const { id } = req.params
  try {
    const cert = await certificateModel.findById(id)
    if (!cert) {
      return res.json({ success: false, message: "Certificate not found" })
    }
    if (cert.certificateFile) {
      await deleteFileFromStorage(cert.certificateFile)
    }
    await certificateModel.findByIdAndDelete(id)
    res.json({ success: true, message: "Certificate deleted" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Sync all legacy local certificates to Cloudinary (admin only)
export const syncCertificatesToCloudinary = async (req, res) => {
  try {
    const localCerts = await certificateModel.find({
      certificateFile: { $regex: /^uploads\// },
    })

    if (localCerts.length === 0) {
      return res.json({ success: true, message: "All certificates are already hosted on Cloudinary.", syncedCount: 0 })
    }

    let syncedCount = 0
    const errors = []

    for (const cert of localCerts) {
      const localFilePath = path.join(__dirname, "..", cert.certificateFile)
      if (fs.existsSync(localFilePath)) {
        const uploadRes = await uploadFileToCloudinary(localFilePath, "zetawa_certificates")
        if (uploadRes.success && uploadRes.url) {
          cert.certificateFile = uploadRes.url
          await certificateModel.findByIdAndUpdate(cert._id, { certificateFile: uploadRes.url })
          syncedCount++
        } else {
          errors.push({ number: cert.certificateNumber, error: uploadRes.error || uploadRes.message })
        }
      }
    }

    res.json({
      success: true,
      message: `Successfully synced ${syncedCount} certificate(s) directly to Cloudinary.`,
      syncedCount,
      errors,
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
