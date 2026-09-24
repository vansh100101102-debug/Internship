import latestUpdateModel from "../models/latestUpdateModel.js"
import { uploadFileToCloudinary, deleteFileFromStorage } from "../config/cloudinary.js"
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
  let file = ''

  if (!title || !date) {
    return res.json({ success: false, message: 'Title and date are required' })
  }
  try {
    if (uploadedFile) {
      // 1. Staged in local disk first
      const localFilePath = path.join(__dirname, '..', 'uploads', uploadedFile.filename)
      // 2. Upload to Cloudinary; if success, deletes local file; if fail, retains local copy
      const uploadRes = await uploadFileToCloudinary(localFilePath, 'zetawa_updates')
      file = uploadRes.url || `uploads/${uploadedFile.filename}`
    }

    const update = new latestUpdateModel({ title, date, description, file })
    await update.save()
    res.json({ success: true, data: update, message: 'Latest update created successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update latest update (admin only)
export const updateLatestUpdate = async (req, res) => {
  const { id } = req.params
  const { title, date, description } = req.body
  const uploadedFile = req.file || (Array.isArray(req.files) ? req.files[0] : null)

  try {
    const existingUpdate = await latestUpdateModel.findById(id)
    if (!existingUpdate) {
      return res.json({ success: false, message: 'Latest update not found' })
    }

    let file = existingUpdate.file

    if (uploadedFile) {
      // Remove old file from Cloudinary or local disk
      if (existingUpdate.file) {
        await deleteFileFromStorage(existingUpdate.file)
      }
      const localFilePath = path.join(__dirname, '..', 'uploads', uploadedFile.filename)
      const uploadRes = await uploadFileToCloudinary(localFilePath, 'zetawa_updates')
      file = uploadRes.url || `uploads/${uploadedFile.filename}`
    }

    const update = await latestUpdateModel.findByIdAndUpdate(
      id,
      { title, date, description, file },
      { new: true }
    )
    res.json({ success: true, data: update, message: 'Latest update updated successfully' })
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
      await deleteFileFromStorage(update.file)
    }
    await latestUpdateModel.findByIdAndDelete(id)
    res.json({ success: true, message: 'Latest update deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

