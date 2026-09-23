import mongoose from "mongoose"

const latestUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, default: '' },
  file: { type: String, default: '' },
}, { timestamps: true })

const latestUpdateModel = mongoose.models.latestUpdate || mongoose.model('latestUpdate', latestUpdateSchema)

export default latestUpdateModel
