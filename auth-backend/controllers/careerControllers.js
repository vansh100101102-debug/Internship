import careerModel from "../models/careerModel.js"

// Get all careers (public)
export const getCareers = async (req, res) => {
  try {
    const careers = await careerModel.find().sort({ createdAt: -1 })
    res.json({ success: true, data: careers })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Create career (admin only)
export const createCareer = async (req, res) => {
  const { title, department, location, type, experience, description, applyLink } = req.body
  if (!title) {
    return res.json({ success: false, message: 'Job role is required' })
  }
  try {
    const career = new careerModel({ title, department, location, type, experience, description, applyLink })
    await career.save()
    res.json({ success: true, data: career, message: 'Career opportunity created' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update career (admin only)
export const updateCareer = async (req, res) => {
  const { id } = req.params
  const { title, department, location, type, experience, description, applyLink } = req.body
  try {
    const career = await careerModel.findByIdAndUpdate(
      id,
      { title, department, location, type, experience, description, applyLink },
      { new: true }
    )
    if (!career) {
      return res.json({ success: false, message: 'Career opportunity not found' })
    }
    res.json({ success: true, data: career, message: 'Career opportunity updated' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Delete career (admin only)
export const deleteCareer = async (req, res) => {
  const { id } = req.params
  try {
    const career = await careerModel.findById(id)
    if (!career) {
      return res.json({ success: false, message: 'Career opportunity not found' })
    }
    await careerModel.findByIdAndDelete(id)
    res.json({ success: true, message: 'Career opportunity deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
