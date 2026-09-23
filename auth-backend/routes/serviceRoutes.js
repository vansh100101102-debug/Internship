import express from 'express';
import { 
  getServices, 
  getServiceById,
  createService, 
  updateService, 
  deleteService, 
  resetDefaultServices,
  resetDefaultServices as seedServices
} from '../controllers/serviceControllers.js';
import adminAuth from '../middleware/adminAuth.js';

const serviceRouter = express.Router();

// Public
serviceRouter.get('/', getServices);
serviceRouter.get('/:id', getServiceById);

// Admin / Utility
serviceRouter.post('/reset-defaults', resetDefaultServices);
serviceRouter.post('/seed', seedServices);
serviceRouter.post('/', adminAuth, createService);
serviceRouter.put('/:id', adminAuth, updateService);
serviceRouter.delete('/:id', adminAuth, deleteService);

export default serviceRouter;
