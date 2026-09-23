import express from 'express'
import { getCareers, createCareer, updateCareer, deleteCareer } from '../controllers/careerControllers.js'
import adminAuth from '../middleware/adminAuth.js'

const careerRouter = express.Router()

// Public
careerRouter.get('/', getCareers)

// Admin only
careerRouter.post('/', adminAuth, createCareer)
careerRouter.put('/:id', adminAuth, updateCareer)
careerRouter.delete('/:id', adminAuth, deleteCareer)

export default careerRouter
