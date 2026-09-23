import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Code2, 
  Smartphone, 
  Cpu, 
  Palette, 
  Cloud, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Briefcase, 
  ArrowRight,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useAppContext } from "../context/AppContext";
import AuthModal from "./AuthModal";

const SERVICES_OPTIONS = [
  {
    id: "web-saas",
    icon: Code2,
    title: "Full-Stack Web & SaaS",
    tagline: "React, Next.js, Node.js, Python, scalable APIs & databases."
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Cross-platform iOS & Android apps with smooth native UX."
  },
  {
    id: "ai-automation",
    icon: Cpu,
    title: "AI & Smart Automation",
    tagline: "Custom LLM agents, RAG retrieval & workflow automation."
  },
  {
    id: "ui-ux",
    icon: Palette,
    title: "UI/UX & Design Systems",
    tagline: "Figma component libraries, prototypes & high-conversion UI."
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud, DevOps & Infra",
    tagline: "AWS, GCP, Docker, Kubernetes, CI/CD & zero-downtime scale."
  },
  {
    id: "dedicated-squad",
    icon: Users,
    title: "Dedicated Developer Squad",
    tagline: "Embedded senior engineers for fast sprint execution."
  }
];

const BUDGET_OPTIONS = [
  { id: "under-2.5k", label: "< $2,500 (MVP Prototype / Audit)" },
  { id: "2.5k-7.5k", label: "$2,500 – $7,500 (Core Feature Build)" },
  { id: "7.5k-20k", label: "$7,500 – $20,000 (Complete Production System)" },
  { id: "20k-plus", label: "$20,000+ (Full Platform / Multi-Month Scale)" },
  { id: "flexible", label: "Flexible / Milestone Sprints" }
];

const TIMELINE_OPTIONS = [
  { id: "urgent", label: "Urgent (< 2 weeks)" },
  { id: "1-month", label: "Within 1 Month" },
  { id: "2-3-months", label: "2 – 3 Months" },
  { id: "exploring", label: "Flexible / Planning Stage" }
];

const Hireforms = () => {
  const { isAuth, user } = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "",
    lastName: user?.name ? user.name.split(" ").slice(1).join(" ") : "",
    email: user?.email || "",
    phone: "",
    company: "",
    website: "",
    projectTitle: "",
    projectType: "Web Application",
    projectDescription: "",
    reference: "",
    additionalInfo: ""
  });

  const [selectedServices, setSelectedServices] = useState(["Full-Stack Web & SaaS"]);
  const [selectedBudget, setSelectedBudget] = useState("$2,500 – $7,500 (Core Feature Build)");
  const [selectedTimeline, setSelectedTimeline] = useState("Within 1 Month");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceTitle) => {
    setSelectedServices(prev => 
      prev.includes(serviceTitle)
        ? (prev.length > 1 ? prev.filter(t => t !== serviceTitle) : prev)
        : [...prev, serviceTitle]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Please select at least one service category.");
      return;
    }

    if (!formData.email.trim() || !formData.projectDescription.trim()) {
      alert("Please provide your email and project overview.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      clientName: `${formData.firstName} ${formData.lastName}`.trim() || (user?.name || "Client"),
      services: selectedServices,
      budget: selectedBudget,
      timeline: selectedTimeline,
      userId: user?._id || user?.id || ""
    };

    try {
      const res = await fetch("/api/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || data.error || "Failed to submit consultation form");
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (error) {
      console.error("Hire form submit error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      color: "#f8fafc",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    }}>
      <Nav />

      {/* Auth Modal overlay if needed */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onSuccess={() => setShowAuthModal(false)} 
      />

      {/* Main Container */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "7rem 1.5rem 5rem"
      }}>

        {isSubmitted ? (
          /* Success Screen */
          <div style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            padding: "3.5rem 2rem",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}>
            <div style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              border: "1px solid rgba(16, 185, 129, 0.3)"
            }}>
              <CheckCircle2 size={40} />
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "rgba(126, 58, 65, 0.25)",
              color: "#fca5a5",
              padding: "4px 14px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1rem"
            }}>
              <Sparkles size={14} /> Discovery Request Received
            </div>

            <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
              We have Received Your Project Blueprint!
            </h1>

            <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Thank you, <strong style={{ color: "white" }}>{formData.firstName || "Client"}</strong>. Our technical lead and sprint architects are reviewing your specifications. We will reach out to you at <strong style={{ color: "#fca5a5" }}>{formData.email}</strong> within 24 hours with an initial architectural roadmap and estimate.
            </p>

            <div style={{
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "1.5rem",
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
              textAlign: "left"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Selected Disciplines:</span>
                <span style={{ color: "#f8fafc", fontSize: "0.85rem", fontWeight: 600 }}>{selectedServices.join(", ")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Budget Range:</span>
                <span style={{ color: "#f8fafc", fontSize: "0.85rem", fontWeight: 600 }}>{selectedBudget}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Target Timeline:</span>
                <span style={{ color: "#f8fafc", fontSize: "0.85rem", fontWeight: 600 }}>{selectedTimeline}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/profile"
                style={{
                  backgroundColor: "#7e3a41",
                  color: "white",
                  padding: "0.9rem 2rem",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 15px rgba(126, 58, 65, 0.4)"
                }}
              >
                Track in Client Portal <ArrowRight size={16} />
              </Link>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: "", lastName: "", email: "", phone: "",
                    company: "", website: "", projectTitle: "",
                    projectType: "Web Application", projectDescription: "",
                    reference: "", additionalInfo: ""
                  });
                }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: "#e2e8f0",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "0.9rem 1.8rem",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.95rem"
                }}
              >
                Submit Another Project
              </button>
            </div>
          </div>
        ) : (
          /* Project Consultation Form */
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "rgba(126, 58, 65, 0.25)",
                color: "#fca5a5",
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "1rem",
                border: "1px solid rgba(126, 58, 65, 0.4)"
              }}>
                <Sparkles size={14} /> STARTUP &amp; PRODUCT DISCOVERY
              </div>

              <h1 style={{ fontSize: "2.8rem", fontWeight: 800, color: "white", marginBottom: "1rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                Let us Build Something High-Impact Together
              </h1>

              <p style={{ color: "#94a3b8", fontSize: "1.15rem", maxWidth: "700px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
                Tell us about your startup, product vision, or technical requirements. We will analyze your scope and return with an architectural plan and sprint estimate within 24 hours.
              </p>

              {/* Trust badges */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "0.75rem 1.5rem",
                borderRadius: "50px",
                flexWrap: "wrap",
                justifyContent: "center"
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#cbd5e1" }}>
                  <Clock size={15} style={{ color: "#fca5a5" }} /> 24-Hour Response
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#cbd5e1" }}>
                  <ShieldCheck size={15} style={{ color: "#10b981" }} /> Strict NDA Protection
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: "#cbd5e1" }}>
                  <DollarSign size={15} style={{ color: "#38bdf8" }} /> Milestone-Based Pricing
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "3rem 2.5rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
            }}>

              {/* Step 1: Select Disciplines */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    backgroundColor: "#7e3a41",
                    color: "white",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>1</span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white", margin: 0 }}>
                    What disciplines or services do you need?
                  </h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 1.25rem 2rem" }}>
                  Select all that apply to your product roadmap.
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1rem"
                }}>
                  {SERVICES_OPTIONS.map((srv) => {
                    const IconComp = srv.icon;
                    const isSelected = selectedServices.includes(srv.title);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => handleServiceToggle(srv.title)}
                        style={{
                          backgroundColor: isSelected ? "rgba(126, 58, 65, 0.25)" : "rgba(255, 255, 255, 0.03)",
                          border: isSelected ? "1.5px solid #7e3a41" : "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "16px",
                          padding: "1.25rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "1rem"
                        }}
                      >
                        <div style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "10px",
                          backgroundColor: isSelected ? "rgba(126, 58, 65, 0.4)" : "rgba(255, 255, 255, 0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isSelected ? "#fca5a5" : "#94a3b8",
                          flexShrink: 0
                        }}>
                          <IconComp size={22} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                            <h4 style={{ margin: 0, fontSize: "0.98rem", fontWeight: 700, color: isSelected ? "white" : "#e2e8f0" }}>
                              {srv.title}
                            </h4>
                            {isSelected && <CheckCircle2 size={16} style={{ color: "#10b981" }} />}
                          </div>
                          <p style={{ margin: 0, fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.4 }}>
                            {srv.tagline}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Contact Information */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    backgroundColor: "#7e3a41",
                    color: "white",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>2</span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white", margin: 0 }}>
                    About you and your business
                  </h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 1.25rem 2rem" }}>
                  Where should we send your project proposal and sprint timeline?
                </p>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "1.25rem"
                }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>First Name *</label>
                    <input
                      style={formInputGlass}
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Last Name</label>
                    <input
                      style={formInputGlass}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Morgan"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Work Email *</label>
                    <input
                      style={formInputGlass}
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@startup.com"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Phone / WhatsApp</label>
                    <input
                      style={formInputGlass}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Company / Startup Name</label>
                    <input
                      style={formInputGlass}
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Labs"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Existing Website / App Link</label>
                    <input
                      style={formInputGlass}
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Project Scope & Vision */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    backgroundColor: "#7e3a41",
                    color: "white",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>3</span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white", margin: 0 }}>
                    Tell us about the project
                  </h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 1.25rem 2rem" }}>
                  Give us as much context as possible to help us scope accurately.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Project Title / Working Name</label>
                    <input
                      style={formInputGlass}
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. AI-Powered Customer Onboarding SaaS"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Project Overview &amp; Key Goals *</label>
                    <textarea
                      style={{ ...formInputGlass, minHeight: "110px", resize: "vertical" }}
                      required
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Describe what you want to build, the core problem it solves, target users, and any key feature requirements..."
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "6px" }}>Figma, Wireframes, or Reference URLs (Optional)</label>
                    <input
                      style={formInputGlass}
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                      placeholder="Paste link to Figma prototype, GitHub repo, or inspiration product"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Budget & Timeline */}
              <div style={{ marginBottom: "3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{
                    backgroundColor: "#7e3a41",
                    color: "white",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}>4</span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white", margin: 0 }}>
                    Estimated Budget &amp; Target Timeline
                  </h3>
                </div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 1.25rem 2rem" }}>
                  This helps us architect the right scope, team size, and milestone schedule.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                  {/* Budget Options */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc", marginBottom: "8px" }}>
                      Estimated Budget Range
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {BUDGET_OPTIONS.map((b) => {
                        const isSelected = selectedBudget === b.label;
                        return (
                          <div
                            key={b.id}
                            onClick={() => setSelectedBudget(b.label)}
                            style={{
                              backgroundColor: isSelected ? "rgba(126, 58, 65, 0.25)" : "rgba(255, 255, 255, 0.03)",
                              border: isSelected ? "1.5px solid #7e3a41" : "1px solid rgba(255, 255, 255, 0.08)",
                              padding: "10px 14px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontSize: "0.85rem",
                              color: isSelected ? "white" : "#cbd5e1",
                              fontWeight: isSelected ? 700 : 500
                            }}
                          >
                            <span>{b.label}</span>
                            {isSelected && <CheckCircle2 size={16} style={{ color: "#10b981" }} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline Options */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc", marginBottom: "8px" }}>
                      Desired Launch Timeline
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {TIMELINE_OPTIONS.map((t) => {
                        const isSelected = selectedTimeline === t.label;
                        return (
                          <div
                            key={t.id}
                            onClick={() => setSelectedTimeline(t.label)}
                            style={{
                              backgroundColor: isSelected ? "rgba(126, 58, 65, 0.25)" : "rgba(255, 255, 255, 0.03)",
                              border: isSelected ? "1.5px solid #7e3a41" : "1px solid rgba(255, 255, 255, 0.08)",
                              padding: "10px 14px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontSize: "0.85rem",
                              color: isSelected ? "white" : "#cbd5e1",
                              fontWeight: isSelected ? 700 : 500
                            }}
                          >
                            <span>{t.label}</span>
                            {isSelected && <CheckCircle2 size={16} style={{ color: "#10b981" }} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: "center", paddingTop: "1.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#7e3a41",
                    color: "white",
                    border: "none",
                    padding: "1.1rem 3rem",
                    borderRadius: "50px",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    boxShadow: "0 8px 25px rgba(126, 58, 65, 0.4)",
                    transition: "all 0.25s ease",
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onMouseOver={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "#90424a";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = "#7e3a41";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {isSubmitting ? (
                    "Submitting Project Scope..."
                  ) : (
                    <>
                      <Send size={18} /> Submit Consultation Request
                    </>
                  )}
                </button>

                <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: "1rem" }}>
                  🔒 Your information is confidential and protected by standard mutual NDA terms.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

const formInputGlass = {
  width: "100%",
  padding: "0.85rem 1rem",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "10px",
  color: "white",
  fontSize: "0.92rem",
  outline: "none",
  transition: "border-color 0.2s"
};

export default Hireforms;
