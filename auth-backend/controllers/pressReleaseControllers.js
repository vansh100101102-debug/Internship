import pressReleaseModel from "../models/pressReleaseModel.js"

// Get all press releases
export const getPressReleases = async (req, res) => {
  try {
    const { year } = req.query
    const filter = year ? { year } : {}
    const releases = await pressReleaseModel.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, data: releases })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Create press release (admin only)
export const createPressRelease = async (req, res) => {
  const { title, date, type, source, linkedinUrl, year, content } = req.body
  if (!title || !date || !year) {
    return res.json({ success: false, message: 'Title, date, and year are required' })
  }
  try {
    const release = new pressReleaseModel({ title, date, type, source, linkedinUrl, year, content })
    await release.save()
    res.json({ success: true, data: release, message: 'Press release created' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Update press release (admin only)
export const updatePressRelease = async (req, res) => {
  const { id } = req.params
  const { title, date, type, source, linkedinUrl, year, content } = req.body
  try {
    const release = await pressReleaseModel.findByIdAndUpdate(
      id,
      { title, date, type, source, linkedinUrl, year, content },
      { new: true }
    )
    if (!release) {
      return res.json({ success: false, message: 'Press release not found' })
    }
    res.json({ success: true, data: release, message: 'Press release updated' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Delete press release (admin only)
export const deletePressRelease = async (req, res) => {
  const { id } = req.params
  try {
    const release = await pressReleaseModel.findByIdAndDelete(id)
    if (!release) {
      return res.json({ success: false, message: 'Press release not found' })
    }
    res.json({ success: true, message: 'Press release deleted' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
