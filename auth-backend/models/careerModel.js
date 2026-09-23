import mongoose from "mongoose"

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, default: '' },
  location: { type: String, default: '' },
  type: { type: String, default: '' },
  experience: { type: String, default: '' },
  description: { type: String, default: '' },
  applyLink: { type: String, default: '' },
}, { timestamps: true })

const careerModel = mongoose.models.career || mongoose.model('career', careerSchema)

export default careerModel
