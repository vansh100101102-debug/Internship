import { useState, useEffect } from "react"
import { Newspaper, Award, Plus, Trash2, Edit3, Save, X, Bell, Briefcase } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Nav from "./Nav"
import Footer from "./Footer"
import axios from "axios"
axios.defaults.withCredentials = true

const API_URL = ""

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("press-releases")
  const [pressReleases, setPressReleases] = useState([])
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const { user } = useAppContext()

  // Press release form fields matching backend model exactly
  const [prForm, setPrForm] = useState({
    title: "", date: "", type: "Official Announcement",
    source: "LinkedIn", linkedinUrl: "", year: "FY2025", content: ""
  })
  const [certForm, setCertForm] = useState({
    certificateNumber: "", internName: "", course: "",
    issueDate: "", completionDate: "", duration: ""
  })
  const [certFile, setCertFile] = useState(null)
  const [luFile, setLuFile] = useState(null)
  const [latestUpdates, setLatestUpdates] = useState([])
  const [careers, setCareers] = useState([])

  // Default form objects (defined outside JSX to avoid {{}} in attributes)
  const DEFAULT_PR_FORM = { title: "", date: "", type: "Official Announcement", source: "LinkedIn", linkedinUrl: "", year: "FY2025", content: "" }
  const DEFAULT_LU_FORM = { title: "", date: "", description: "", file: "" }
  const DEFAULT_CAREER_FORM = { title: "", department: "", location: "", type: "", experience: "", description: "", applyLink: "" }
  const [luForm, setLuForm] = useState({ ...DEFAULT_LU_FORM })
  const [careerForm, setCareerForm] = useState({ ...DEFAULT_CAREER_FORM })

  // Field-level change handlers to avoid {{}} in JSX expression attributes
  const handleChange = (form, field, value) => {
    if (form === 'pr') setPrForm(prev => ({...prev, [field]: value}))
    else if (form === 'cert') setCertForm(prev => ({...prev, [field]: value}))
    else if (form === 'lu') setLuForm(prev => ({...prev, [field]: value}))
    else if (form === 'career') setCareerForm(prev => ({...prev, [field]: value}))
  }

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [prRes, certRes, luRes, careerRes] = await Promise.all([
        axios.get(`${API_URL}/api/press-releases`),
        axios.get(`${API_URL}/api/certificates`),
        axios.get(`${API_URL}/api/latest-updates`),
        axios.get(`${API_URL}/api/careers`)
      ])
      if (prRes.data.success) setPressReleases(prRes.data.data)
      if (certRes.data.success) setCertificates(certRes.data.data)
      if (luRes.data.success) setLatestUpdates(luRes.data.data)
      if (careerRes.data.success) setCareers(careerRes.data.data)
    } catch (err) {
      console.error("Failed to fetch:", err)
    } finally {
      setLoading(false)
    }
  }

  // Press Release CRUD
  const handlePrSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/press-releases/${editingId}`, prForm)
      } else {
        await axios.post(`${API_URL}/api/press-releases`, prForm)
      }
      setEditingId(null); setShowAddForm(false); fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving press release")
    }
  }

  const handlePrEdit = (release) => {
    setEditingId(release._id)
    setPrForm({
      title: release.title, date: release.date, type: release.type,
      source: release.source, linkedinUrl: release.linkedinUrl || "",
      year: release.year, content: release.content || ""
    })
    setShowAddForm(true)
  }

  const handlePrDelete = async (id) => {
    if (!confirm("Delete this press release?")) return
    try {
      await axios.delete(`${API_URL}/api/press-releases/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting press release")
    }
  }

  // Certificate CRUD
  const handleCertSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("certificateNumber", certForm.certificateNumber)
      formData.append("internName", certForm.internName)
      formData.append("course", certForm.course)
      formData.append("issueDate", certForm.issueDate)
      formData.append("completionDate", certForm.completionDate)
formData.append("duration", certForm.duration)
      if (certFile) formData.append("certificateFile", certFile)
      if (editingId) {
        await axios.put(`${API_URL}/api/certificates/${editingId}`, formData)
      } else {
        await axios.post(`${API_URL}/api/certificates`, formData)
      }
      setEditingId(null); setShowAddForm(false); setCertFile(null)
      setCertForm({ certificateNumber: "", internName: "", course: "", issueDate: "", completionDate: "", duration: "" })
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving certificate")
    }
  }

  const handleCertEdit = (cert) => {
    setEditingId(cert._id)
    setCertForm({ certificateNumber: cert.certificateNumber, internName: cert.internName, course: cert.course, issueDate: cert.issueDate, completionDate: cert.completionDate, duration: cert.duration })
    setCertFile(null); setShowAddForm(true)
  }

  const handleCertDelete = async (id) => {
    if (!confirm("Delete this certificate?")) return
    try {
      await axios.delete(`${API_URL}/api/certificates/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting certificate")
    }
  }

  // Latest Updates CRUD
  const handleLuSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", luForm.title)
      formData.append("date", luForm.date)
      formData.append("description", luForm.description)
      if (luFile) formData.append("file", luFile)
      if (editingId) {
        await axios.put(`${API_URL}/api/latest-updates/${editingId}`, formData)
      } else {
        await axios.post(`${API_URL}/api/latest-updates`, formData)
      }
      setEditingId(null); setShowAddForm(false); setLuFile(null); fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving latest update")
    }
  }

  const handleLuEdit = (update) => {
    setEditingId(update._id)
    setLuForm({ title: update.title, date: update.date, description: update.description || '', file: update.file || '' })
    setLuFile(null); setShowAddForm(true)
  }

  const handleLuDelete = async (id) => {
    if (!confirm("Delete this latest update?")) return
    try {
      await axios.delete(`${API_URL}/api/latest-updates/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting latest update")
    }
  }

  // Career CRUD
  const handleCareerSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/careers/${editingId}`, careerForm)
      } else {
        await axios.post(`${API_URL}/api/careers`, careerForm)
      }
      setEditingId(null); setShowAddForm(false); fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error saving career opportunity")
    }
  }

  const handleCareerEdit = (career) => {
    setEditingId(career._id)
    setCareerForm({ title: career.title, department: career.department || '', location: career.location || '', type: career.type || '', experience: career.experience || '', description: career.description || '', applyLink: career.applyLink || '' })
    setShowAddForm(true)
  }

  const handleCareerDelete = async (id) => {
    if (!confirm("Delete this career opportunity?")) return
    try {
      await axios.delete(`${API_URL}/api/careers/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting career opportunity")
    }
  }

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", border: "1.5px solid #e0d9db",
    borderRadius: "8px", fontSize: "0.95rem", outline: "none", background: "white",
  }
  const labelStyle = {
    display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4a4a4a",
    marginBottom: "0.5rem",
  }
  const btnPrimary = {
    background: "linear-gradient(135deg, #7e3a41, #6a3139)",
    color: "white", border: "none", borderRadius: "8px",
    padding: "0.75rem 1.5rem", fontWeight: 600, cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f2f3" }}>
      <Nav />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ color: "#2d2d2d", fontSize: "1.8rem", marginBottom: "0.25rem" }}>Admin Dashboard</h1>
            <p style={{ color: "#777" }}>Welcome, {user?.name}</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {[
            { id: "press-releases", label: "Press Releases", icon: Newspaper },
            { id: "certificates", label: "Certificates", icon: Award },
            { id: "latest-updates", label: "Latest Updates", icon: Bell },
            { id: "careers", label: "Careers", icon: Briefcase },
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditingId(null); setShowAddForm(false); }}
              style={{
                padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: 600, cursor: "pointer",
                background: activeTab === tab.id ? "#7e3a41" : "white",
                color: activeTab === tab.id ? "white" : "#555",
                display: "flex", alignItems: "center", gap: "0.4rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#777" }}>Loading...</div>
        ) : (
          <>
            {/* ============ PRESS RELEASES TAB ============ */}
            {activeTab === "press-releases" && (
              <div>
                {/* Add/Edit Form */}
                {showAddForm && (
                  <form onSubmit={handlePrSubmit} style={{
                    background: "white", borderRadius: "12px", padding: "1.5rem",
                    marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                  }}>
                    <h3 style={{ marginBottom: "1.25rem", color: "#2d2d2d" }}>
                      {editingId ? "Edit Press Release" : "Add New Press Release"}
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      {/* Title */}
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Title *</label>
                        <input style={inputStyle} placeholder="Enter press release title" required
                          value={prForm.title} onChange={(e) => handleChange("pr", "title", e.target.value)} />
                      </div>

                      {/* Date */}
                      <div>
                        <label style={labelStyle}>Date *</label>
                        <input style={inputStyle} type="date" required
                          value={prForm.date} onChange={(e) => handleChange("pr", "date", e.target.value)} />
                      </div>

                      {/* Year */}
                      <div>
                        <label style={labelStyle}>Year *</label>
                        <input style={inputStyle} placeholder="e.g. FY2025" required
                          value={prForm.year} onChange={(e) => handleChange("pr", "year", e.target.value)} />
                      </div>

                      {/* Type */}
                      <div>
                        <label style={labelStyle}>Type</label>
                        <select style={inputStyle} value={prForm.type} onChange={(e) => handleChange("pr", "type", e.target.value)}>
                          <option value="Official Announcement">Official Announcement</option>
                          <option value="Industry News">Industry News</option>
                          <option value="Company Update">Company Update</option>
                          <option value="Milestone">Milestone</option>
                        </select>
                      </div>

                      {/* Source */}
                      <div>
                        <label style={labelStyle}>Source</label>
                        <select style={inputStyle} value={prForm.source} onChange={(e) => handleChange("pr", "source", e.target.value)}>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Website">Website</option>
                          <option value="Email">Email</option>
                        </select>
                      </div>

                      {/* LinkedIn URL */}
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>LinkedIn URL</label>
                        <input style={inputStyle} placeholder="https://linkedin.com/..."
                          value={prForm.linkedinUrl} onChange={(e) => handleChange("pr", "linkedinUrl", e.target.value)} />
                      </div>

                      {/* Content */}
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Content</label>
                        <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                          placeholder="Enter press release content"
                          value={prForm.content} onChange={(e) => handleChange("pr", "content", e.target.value)} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="submit" style={btnPrimary}><Save size={16} /> {editingId ? "Update" : "Save"}</button>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        style={{ ...btnPrimary, background: "transparent", color: "#777", border: "1px solid #ddd" }}>
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Press Releases List */}
                <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9fa" }}>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Title</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Date</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Type</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Source</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Year</th>
                        <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pressReleases.length === 0 ? (
                        <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#999" }}>No press releases yet</td></tr>
                      ) : pressReleases.map(pr => (
                        <tr key={pr._id} style={{ borderTop: "1px solid #f0f0f0" }}>
                          <td style={{ padding: "1rem", fontWeight: 600, color: "#7e3a41" }}>{pr.title}</td>
                          <td style={{ padding: "1rem" }}>{pr.date}</td>
                          <td style={{ padding: "1rem" }}>{pr.type}</td>
                          <td style={{ padding: "1rem" }}>{pr.source}</td>
                          <td style={{ padding: "1rem" }}>{pr.year}</td>
                          <td style={{ padding: "1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                              <button onClick={() => handlePrEdit(pr)} style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff" }} title="Edit"><Edit3 size={16} /></button>
                              <button onClick={() => handlePrDelete(pr._id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc3545" }} title="Delete"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Button */}
                {!showAddForm && (
                  <div style={{ marginTop: "1rem", textAlign: "right" }}>
                    <button onClick={() => { setShowAddForm(true); setEditingId(null); setPrForm(DEFAULT_PR_FORM); }}
                      style={btnPrimary}>
                      <Plus size={18} /> Add New Press Release
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============ CERTIFICATES TAB ============ */}
            {activeTab === "certificates" && (
              <div>
                <h2 style={{ color: "#2d2d2d", marginBottom: "1rem" }}>Enrolled Participants</h2>

                {!showAddForm && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <button onClick={() => setShowAddForm(true)} style={btnPrimary}>
                      <Plus size={18} /> Add New Certificate
                    </button>
                  </div>
                )}

                <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9fa" }}>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Certificate #</th>
                        <th style={{ padding: "1rem", fontWeight: 500 }}>Intern Name</th>
                        <th style={{ padding: "1rem", color: "#666" }}>Course</th>
                        <th style={{ padding: "1rem", color: "#666" }}>Duration</th>
                        <th style={{ padding: "1rem", color: "#666" }}>Issue Date</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Certificate File</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificates.length === 0 ? (
                        <tr><td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "#999" }}>No certificates yet</td></tr>
                      ) : certificates.map(cert => (
                        <tr key={cert._id} style={{ borderTop: "1px solid #f0f0f0" }}>
                          <td style={{ padding: "1rem", fontWeight: 600, color: "#7e3a41" }}>{cert.certificateNumber}</td>
                          <td style={{ padding: "1rem", fontWeight: 500 }}>{cert.internName}</td>
                          <td style={{ padding: "1rem", color: "#666" }}>{cert.course}</td>
                          <td style={{ padding: "1rem", color: "#666" }}>{cert.duration}</td>
                          <td style={{ padding: "1rem" }}>{cert.issueDate}</td>
                          <td style={{ padding: "1rem" }}>
                            {cert.certificateFile ? (
                              <a href={`/${cert.certificateFile}`} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none", fontSize: "0.85rem" }}>
                                View Certificate
                              </a>
                            ) : (
                              <span style={{ color: "#999", fontSize: "0.85rem" }}>No file</span>
                            )}
                          </td>
                          <td style={{ padding: "1rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button onClick={() => handleCertEdit(cert)} style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff" }}><Edit3 size={16} /></button>
                              <button onClick={() => handleCertDelete(cert._id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc3545" }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Certificate Form */}
                {showAddForm && (
                  <form onSubmit={handleCertSubmit} style={{ background: "white", borderRadius: "12px", padding: "1.5rem", marginTop: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <h3 style={{ marginBottom: "1rem", color: "#2d2d2d" }}>{editingId ? "Edit Certificate" : "Add Certificate"}</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <input style={inputStyle} placeholder="Certificate Number (e.g. ZD202501)" required
                        value={certForm.certificateNumber} onChange={(e) => handleChange("cert", "certificateNumber", e.target.value)} />
                      <input style={inputStyle} placeholder="Intern Name" required
                        value={certForm.internName} onChange={(e) => handleChange("cert", "internName", e.target.value)} />
                      <input style={inputStyle} placeholder="Course" required
                        value={certForm.course} onChange={(e) => handleChange("cert", "course", e.target.value)} />
                      <input style={inputStyle} placeholder="Duration (e.g. 3 months)"
                        value={certForm.duration} onChange={(e) => handleChange("cert", "duration", e.target.value)} />
                      <div>
                        <label style={labelStyle}>Issue Date</label>
                        <input style={inputStyle} type="date" value={certForm.issueDate} onChange={(e) => handleChange("cert", "issueDate", e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Completion Date</label>
                        <input style={inputStyle} type="date" value={certForm.completionDate} onChange={(e) => handleChange("cert", "completionDate", e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Certificate File</label>
                        <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => setCertFile(e.target.files[0])} style={{ ...inputStyle, padding: "0.5rem", cursor: "pointer" }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="submit" style={btnPrimary}><Save size={16} /> {editingId ? "Update" : "Save"}</button>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        style={{ ...btnPrimary, background: "transparent", color: "#777", border: "1px solid #ddd" }}><X size={16} /> Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ============ LATEST UPDATES TAB ============ */}
            {activeTab === "latest-updates" && (
              <div>
                <h2 style={{ color: "#2d2d2d", marginBottom: "1rem" }}>Latest Updates</h2>
                {!showAddForm && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <button onClick={() => { setShowAddForm(true); setEditingId(null); setLuForm(DEFAULT_LU_FORM); setLuFile(null); }} style={btnPrimary}>
                      <Plus size={18} /> Add New Update
                    </button>
                  </div>
                )}
                <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9fa" }}>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Title</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Date</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Description</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>File</th>
                        <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestUpdates.length === 0 ? (
                        <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#999" }}>No updates yet</td></tr>
                      ) : latestUpdates.map(lu => (
                        <tr key={lu._id} style={{ borderTop: "1px solid #f0f0f0" }}>
                          <td style={{ padding: "1rem", fontWeight: 600, color: "#7e3a41" }}>{lu.title}</td>
                          <td style={{ padding: "1rem" }}>{lu.date}</td>
                          <td style={{ padding: "1rem", color: "#666", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>{lu.description}</td>
                          <td style={{ padding: "1rem" }}>
                            {lu.file ? (
                              <a href={`/${lu.file}`} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none", fontSize: "0.85rem" }}>View File</a>
                            ) : (
                              <span style={{ color: "#999", fontSize: "0.85rem" }}>No file</span>
                            )}
                          </td>
                          <td style={{ padding: "1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                              <button onClick={() => handleLuEdit(lu)} style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff" }}><Edit3 size={16} /></button>
                              <button onClick={() => handleLuDelete(lu._id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc3545" }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showAddForm && (
                  <form onSubmit={handleLuSubmit} style={{ background: "white", borderRadius: "12px", padding: "1.5rem", marginTop: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <h3 style={{ marginBottom: "1rem", color: "#2d2d2d" }}>{editingId ? "Edit Update" : "Add Update"}</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <input style={inputStyle} placeholder="Title" required
                        value={luForm.title} onChange={(e) => handleChange('lu', 'title', e.target.value)} />
                      <div>
                        <label style={labelStyle}>Date</label>
                        <input style={inputStyle} type="date" required
                          value={luForm.date} onChange={(e) => handleChange('lu', 'date', e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Description</label>
                        <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                          placeholder="Enter description"
                          value={luForm.description} onChange={(e) => handleChange('lu', 'description', e.target.value)} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>File</label>
                        <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => setLuFile(e.target.files[0])} style={{ ...inputStyle, padding: "0.5rem", cursor: "pointer" }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="submit" style={btnPrimary}><Save size={16} /> {editingId ? "Update" : "Save"}</button>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        style={{ ...btnPrimary, background: "transparent", color: "#777", border: "1px solid #ddd" }}><X size={16} /> Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* ============ CAREERS TAB ============ */}
            {activeTab === "careers" && (
              <div>
                <h2 style={{ color: "#2d2d2d", marginBottom: "1rem" }}>Career Opportunities</h2>
                {!showAddForm && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <button onClick={() => { setShowAddForm(true); setEditingId(null); setCareerForm(DEFAULT_CAREER_FORM); }} style={btnPrimary}>
                      <Plus size={18} /> Add New Opportunity
                    </button>
                  </div>
                )}
                <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9fa" }}>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Job Role</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Department</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Location</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Type</th>
                        <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Experience</th>
                        <th style={{ padding: "1rem", textAlign: "center", fontWeight: 600, color: "#555", fontSize: "0.85rem" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {careers.length === 0 ? (
                        <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#999" }}>No career opportunities yet</td></tr>
                      ) : careers.map(c => (
                        <tr key={c._id} style={{ borderTop: "1px solid #f0f0f0" }}>
                          <td style={{ padding: "1rem", fontWeight: 600, color: "#7e3a41" }}>{c.title}</td>
                          <td style={{ padding: "1rem" }}>{c.department}</td>
                          <td style={{ padding: "1rem" }}>{c.location}</td>
                          <td style={{ padding: "1rem" }}>{c.type}</td>
                          <td style={{ padding: "1rem" }}>{c.experience}</td>
                          <td style={{ padding: "1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                              <button onClick={() => handleCareerEdit(c)} style={{ background: "none", border: "none", cursor: "pointer", color: "#007bff" }}><Edit3 size={16} /></button>
                              <button onClick={() => handleCareerDelete(c._id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc3545" }}><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {showAddForm && (
                  <form onSubmit={handleCareerSubmit} style={{ background: "white", borderRadius: "12px", padding: "1.5rem", marginTop: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <h3 style={{ marginBottom: "1rem", color: "#2d2d2d" }}>{editingId ? "Edit Opportunity" : "Add Opportunity"}</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <input style={inputStyle} placeholder="Job Role *" required
                        value={careerForm.title} onChange={(e) => handleChange('career', 'title', e.target.value)} />
                      <input style={inputStyle} placeholder="Department"
                        value={careerForm.department} onChange={(e) => handleChange('career', 'department', e.target.value)} />
                      <input style={inputStyle} placeholder="Location (e.g. Remote, Onsite)"
                        value={careerForm.location} onChange={(e) => handleChange('career', 'location', e.target.value)} />
                      <input style={inputStyle} placeholder="Type (e.g. Full-time, Intern)"
                        value={careerForm.type} onChange={(e) => handleChange('career', 'type', e.target.value)} />
                      <input style={inputStyle} placeholder="Experience (e.g. Freshers, 2-5 years)"
                        value={careerForm.experience} onChange={(e) => handleChange('career', 'experience', e.target.value)} />
                      <input style={inputStyle} placeholder="Apply Link (Google Form)"
                        value={careerForm.applyLink} onChange={(e) => handleChange('career', 'applyLink', e.target.value)} />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>Description</label>
                        <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                          placeholder="Enter job description"
                          value={careerForm.description} onChange={(e) => handleChange('career', 'description', e.target.value)} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button type="submit" style={btnPrimary}><Save size={16} /> {editingId ? "Update" : "Save"}</button>
                      <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); }}
                        style={{ ...btnPrimary, background: "transparent", color: "#777", border: "1px solid #ddd" }}><X size={16} /> Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </>
        )}

        {/* Stats */}
        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d2d2d" }}>{pressReleases.length}</div>
            <div style={{ fontSize: "0.85rem", color: "#777" }}>Press Releases</div>
          </div>
          <div style={{ background: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#28a745" }}>{certificates.length}</div>
            <div style={{ fontSize: "0.85rem", color: "#777" }}>Certificates</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard