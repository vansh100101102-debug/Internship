import express from 'express'
import upload from '../config/cloudinary.js'
import { getCertificates, verifyCertificate, createCertificate, updateCertificate, deleteCertificate } from '../controllers/certificateControllers.js'
import adminAuth from '../middleware/adminAuth.js'

const certificateRouter = express.Router()

// Public
certificateRouter.get('/', getCertificates)
certificateRouter.get('/verify/:certificateNumber', verifyCertificate)

// Admin only with file upload
certificateRouter.post('/', adminAuth, upload.any(), createCertificate)
certificateRouter.put('/:id', adminAuth, upload.any(), updateCertificate)
certificateRouter.delete('/:id', adminAuth, deleteCertificate)

export default certificateRouter
