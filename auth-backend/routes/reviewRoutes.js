import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// POST a new review
router.post("/", async (req, res) => {
  try {
    const { name, company, rating, comment } = req.body;
    const review = new Review({ name, company, rating, comment });
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error adding review" });
  }
});

export default router;
