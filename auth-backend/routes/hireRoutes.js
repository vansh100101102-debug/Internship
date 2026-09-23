import express from "express";
import HireRequest from "../models/HireForm.js";

const router = express.Router();

// 1️⃣ Save hire form data (Client submission)
router.post("/", async (req, res) => {
  try {
    const { 
      firstName, lastName, clientName, email, phone, company, companyName, 
      website, services, projectTitle, projectType, projectDescription, 
      budget, timeline, reference, additionalInfo, userId 
    } = req.body;

    if (!email || !projectDescription) {
      return res.status(400).json({ success: false, message: "Email and project description are required" });
    }

    const resolvedName = clientName || `${firstName || ''} ${lastName || ''}`.trim() || 'Client';

    const hireData = new HireRequest({
      userId: userId || '',
      clientName: resolvedName,
      firstName: firstName || '',
      lastName: lastName || '',
      email: email.trim().toLowerCase(),
      phone: phone || '',
      company: company || companyName || '',
      companyName: companyName || company || '',
      website: website || '',
      services: Array.isArray(services) ? services : (services ? [services] : []),
      projectTitle: projectTitle || `${projectType || 'Custom'} Project`,
      projectType: projectType || 'Web Application',
      projectDescription: projectDescription.trim(),
      budget: budget || '',
      timeline: timeline || '',
      reference: reference || '',
      additionalInfo: additionalInfo || '',
      status: "Pending Review"
    });

    await hireData.save();

    res.status(201).json({ success: true, message: "Project inquiry submitted successfully", data: hireData });
  } catch (error) {
    console.error("❌ Error saving hire form:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// For backwards compatibility
router.post("/hire", async (req, res) => {
  try {
    const hireData = new HireRequest(req.body);
    await hireData.save();
    res.status(201).json({ success: true, message: "Hire request saved", data: hireData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2️⃣ Get user's own project requests (Client Portal)
router.get("/my-requests", async (req, res) => {
  try {
    const { email, userId } = req.query;
    let query = {};
    if (email) {
      query.email = email.trim().toLowerCase();
    } else if (userId) {
      query.userId = userId;
    } else {
      return res.json({ success: true, data: [] });
    }

    const requests = await HireRequest.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3️⃣ Get all hire requests (Admin)
router.get("/", async (req, res) => {
  try {
    const data = await HireRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/hire", async (req, res) => {
  try {
    const data = await HireRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4️⃣ Update status & admin progress notes (Admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, estimatedCompletion } = req.body;

    const updateObj = {};
    if (status) updateObj.status = status;
    if (adminNotes !== undefined) updateObj.adminNotes = adminNotes;
    if (estimatedCompletion !== undefined) updateObj.estimatedCompletion = estimatedCompletion;

    const updated = await HireRequest.findByIdAndUpdate(id, updateObj, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.json({ success: true, message: "Inquiry updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5️⃣ Delete hire request (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HireRequest.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
