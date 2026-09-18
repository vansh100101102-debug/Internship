import mongoose from "mongoose"

const pressReleaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, default: 'Official Announcement' },
  source: { type: String, default: 'LinkedIn' },
  linkedinUrl: { type: String, default: '' },
  year: { type: String, required: true },
  content: { type: String, default: '' },
}, { timestamps: true })

const pressReleaseModel = mongoose.models.pressrelease || mongoose.model('pressrelease', pressReleaseSchema)

export default pressReleaseModel
