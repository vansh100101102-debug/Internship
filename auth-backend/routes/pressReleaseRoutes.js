import express from 'express'
import { getPressReleases, createPressRelease, updatePressRelease, deletePressRelease } from '../controllers/pressReleaseControllers.js'
import adminAuth from '../middleware/adminAuth.js'

const pressReleaseRouter = express.Router()

// Public
pressReleaseRouter.get('/', getPressReleases)

// Admin only
pressReleaseRouter.post('/', adminAuth, createPressRelease)
pressReleaseRouter.put('/:id', adminAuth, updatePressRelease)
pressReleaseRouter.delete('/:id', adminAuth, deletePressRelease)

export default pressReleaseRouter
