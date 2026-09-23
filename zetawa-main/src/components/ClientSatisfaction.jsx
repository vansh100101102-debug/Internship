import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav";
import Footer from "./Footer";

const BACKEND_URL = "/api/reviews";


export default function ClientSatisfaction() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    rating: "5",
    comment: "",
  });

  // Fetch all feedbacks on load
  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  // Submit new feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name && formData.comment) {
      try {
        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newReview = await response.json();
          setFeedbacks((prev) => [newReview, ...prev]); // show immediately
          setFormData({
            name: "",
            company: "",
            rating: "5",
            comment: "",
          });

          const successMsg = document.getElementById("successMessage");
          successMsg.style.display = "block";
          setTimeout(() => {
            successMsg.style.display = "none";
          }, 3000);
        } else {
          alert("Error submitting feedback");
        }
      } catch (err) {
        console.error("Error submitting review:", err);
      }
    }
  };

  return (
    <>
      <Nav />

      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold text-success">
          Client Satisfaction
        </h2>

        {/* Submit Form */}
        <div className="card p-4 shadow-lg border-0 mb-5">
          <h4 className="fw-bold text-primary mb-3">Submit Your Feedback</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Company (optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Rating</label>
              <select
                className="form-select"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              >
                <option value="5">⭐️⭐️⭐️⭐️⭐️ Excellent</option>
                <option value="4">⭐️⭐️⭐️⭐️ Good</option>
                <option value="3">⭐️⭐️⭐️ Average</option>
                <option value="2">⭐️⭐️ Poor</option>
                <option value="1">⭐️ Very Poor</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Comment</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write your feedback..."
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-success fw-bold w-100">
              Submit Feedback
            </button>
          </form>

          <div
            id="successMessage"
            className="alert alert-success text-center fw-bold mt-3"
            style={{ display: "none" }}
          >
            ✅ Feedback submitted successfully!
          </div>
        </div>

        {/* Feedback Display */}
        <div className="card p-4 shadow-lg border-0">
          <h4 className="fw-bold text-primary mb-3">What People Say</h4>
          {feedbacks.length === 0 ? (
            <p className="text-center text-muted">No feedback yet.</p>
          ) : (
            feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="border-bottom mb-3 pb-3"
                style={{ wordBreak: "break-word" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold text-dark mb-0">{fb.name}</h5>
                  <span className="text-warning">
                    {"⭐".repeat(fb.rating)}
                  </span>
                </div>
                {fb.company && (
                  <p className="text-muted mb-1">{fb.company}</p>
                )}
                <p className="mb-1">{fb.comment}</p>
                <small className="text-secondary">
                  {new Date(fb.date).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
