import express from 'express'
import { getLatestUpdates, createLatestUpdate, updateLatestUpdate, deleteLatestUpdate } from '../controllers/latestUpdateControllers.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../config/cloudinary.js'

const latestUpdateRouter = express.Router()

// Public
latestUpdateRouter.get('/', getLatestUpdates)

// Admin only with file upload
latestUpdateRouter.post('/', adminAuth, upload.single('file'), createLatestUpdate)
latestUpdateRouter.put('/:id', adminAuth, upload.single('file'), updateLatestUpdate)
latestUpdateRouter.delete('/:id', adminAuth, deleteLatestUpdate)

export default latestUpdateRouter
