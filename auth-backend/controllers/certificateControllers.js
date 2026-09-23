import certificateModel from "../models/certificateModel.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get all certificates (public for verification)
export const getCertificates = async (req, res) => {
  try {
    const certs = await certificateModel.find().sort({ createdAt: -1 })
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
      certificateNumber: { $regex: new RegExp(`^${certificateNumber}$`, 'i') }
    })
    if (!cert) {
      return res.json({ success: false, message: 'Certificate not found' })
    }
    res.json({ success: true, data: cert })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Create certificate (admin only)
export const createCertificate = async (req, res) => {
  const { certificateNumber, internName, course, issueDate, completionDate, duration } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)
  const certificateFile = uploadedFile ? `uploads/${uploadedFile.filename}` : ''

  if (!certificateNumber || !internName || !course) {
    return res.json({ success: false, message: 'Certificate number, intern name, and course are required' })
  }
  try {
    const existing = await certificateModel.findOne({ certificateNumber })
    if (existing) {
      return res.json({ success: false, message: 'Certificate number already exists' })
    }
    const cert = new certificateModel({
      certificateNumber, internName, course,
      issueDate: issueDate || '',
      completionDate: completionDate || '',
      duration: duration || '',
      certificateFile,
    })
    await cert.save()
    res.json({ success: true, data: cert, message: 'Certificate created' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update certificate (admin only)
export const updateCertificate = async (req, res) => {
  const { id } = req.params
  const { certificateNumber, internName, course, issueDate, completionDate, status, duration } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)
  const certificateFile = uploadedFile ? `uploads/${uploadedFile.filename}` : (await certificateModel.findById(id))?.certificateFile || ''

  try {
    const cert = await certificateModel.findByIdAndUpdate(
      id,
      { certificateNumber, internName, course, issueDate, completionDate, status, duration, certificateFile },
      { new: true }
    )
    if (!cert) {
      return res.json({ success: false, message: 'Certificate not found' })
    }
    res.json({ success: true, data: cert, message: 'Certificate updated' })
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
      return res.json({ success: false, message: 'Certificate not found' })
    }
    if (cert.certificateFile) {
      const filePath = path.join(__dirname, '..', cert.certificateFile)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await certificateModel.findByIdAndDelete(id)
    res.json({ success: true, message: 'Certificate deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
