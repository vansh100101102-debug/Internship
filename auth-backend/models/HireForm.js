import mongoose from "mongoose";

const HireFormSchema = new mongoose.Schema({
  userId: { type: String, default: "" },
  clientName: { type: String, default: "" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, required: true, trim: true },
  phone: { type: String, default: "" },
  company: { type: String, default: "" },
  companyName: { type: String, default: "" },
  website: { type: String, default: "" },
  services: { type: [String], default: [] },
  projectTitle: { type: String, default: "" },
  projectType: { type: String, default: "Web Application" },
  projectDescription: { type: String, required: true },
  budget: { type: String, default: "" },
  timeline: { type: String, default: "" },
  reference: { type: String, default: "" },
  additionalInfo: { type: String, default: "" },
  status: {
    type: String,
    enum: ["Pending Review", "In Discussion", "Proposal Sent", "In Development", "Completed", "Archived", "Pending"],
    default: "Pending Review"
  },
  adminNotes: {
    type: String,
    default: ""
  },
  estimatedCompletion: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.models.HireRequest || mongoose.model("HireRequest", HireFormSchema);
