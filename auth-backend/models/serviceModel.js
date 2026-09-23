import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  tagline: { type: String, default: '', trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    default: 'engineering',
    enum: ['engineering', 'intelligence', 'design', 'security', 'advisory', 'cloud', 'other']
  },
  icon: { type: String, default: 'Code2' },
  highlight: { type: String, default: 'Enterprise Grade' },
  capabilities: { type: [String], default: [] },
  techStack: { type: [String], default: [] },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const serviceModel = mongoose.models.service || mongoose.model("service", serviceSchema);

export default serviceModel;
