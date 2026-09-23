import latestUpdateModel from "../models/latestUpdateModel.js"
import upload from "../config/cloudinary.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get all latest updates
export const getLatestUpdates = async (req, res) => {
  try {
    const updates = await latestUpdateModel.find().sort({ createdAt: -1 })
    res.json({ success: true, data: updates })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Create latest update (admin only)
export const createLatestUpdate = async (req, res) => {
  const { title, date, description } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)
  const file = uploadedFile ? `uploads/${uploadedFile.filename}` : ''
  if (!title || !date) {
    return res.json({ success: false, message: 'Title and date are required' })
  }
  try {
    const update = new latestUpdateModel({ title, date, description, file })
    await update.save()
    res.json({ success: true, data: update, message: 'Latest update created' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update latest update (admin only)
export const updateLatestUpdate = async (req, res) => {
  const { id } = req.params
  const { title, date, description } = req.body
  const existingUpdate = await latestUpdateModel.findById(id)
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)
  const file = uploadedFile ? `uploads/${uploadedFile.filename}` : existingUpdate?.file || ''
  try {
    if (uploadedFile && existingUpdate?.file) {
      const oldFilePath = path.join(__dirname, '..', existingUpdate.file)
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath)
    }
    const update = await latestUpdateModel.findByIdAndUpdate(
      id,
      { title, date, description, file },
      { new: true }
    )
    if (!update) {
      return res.json({ success: false, message: 'Latest update not found' })
    }
    res.json({ success: true, data: update, message: 'Latest update updated' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Delete latest update (admin only)
export const deleteLatestUpdate = async (req, res) => {
  const { id } = req.params
  try {
    const update = await latestUpdateModel.findById(id)
    if (!update) {
      return res.json({ success: false, message: 'Latest update not found' })
    }
    if (update.file) {
      const filePath = path.join(__dirname, '..', update.file)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
    await latestUpdateModel.findByIdAndDelete(id)
    res.json({ success: true, message: 'Latest update deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
