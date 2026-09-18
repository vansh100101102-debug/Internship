import certificateModel from "../models/certificateModel.js"

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
  const driveLink = req.file ? req.file.path : (req.body.driveLink || '')

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
      driveLink: driveLink,
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
  const driveLink = req.file ? req.file.path : (req.body.driveLink || '')

  try {
    const cert = await certificateModel.findByIdAndUpdate(
      id,
      { certificateNumber, internName, course, issueDate, completionDate, status, duration, driveLink },
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
    const cert = await certificateModel.findByIdAndDelete(id)
    if (!cert) {
      return res.json({ success: false, message: 'Certificate not found' })
    }
    res.json({ success: true, message: 'Certificate deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
