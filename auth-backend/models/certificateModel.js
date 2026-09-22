import mongoose from "mongoose"

const certificateSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  internName: { type: String, required: true },
  course: { type: String, required: true },
  issueDate: { type: String, required: true },
  completionDate: { type: String, required: true },
  status: { type: String, default: 'Valid' },
  duration: { type: String, default: '' },
  certificateFile: { type: String, default: '' },
}, { timestamps: true })

const certificateModel = mongoose.models.certificate || mongoose.model('certificate', certificateSchema)

export default certificateModel
