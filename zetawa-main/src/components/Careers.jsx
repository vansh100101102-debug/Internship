import Lottie from "lottie-react";
import newBadgeAnimation from "/src/assets/lottie/new-badge.json";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, MapPin, Clock, Users, Award, ArrowRight, Mail, Phone, Briefcase } from 'lucide-react';
import Nav from './Nav';
import img1 from '../assets/surendra.jpeg';
import img2 from '../assets/someone.jpg'
import img3 from '../assets/vite.png';
import Footer from './Footer';
// import Applyform from './applyform';

 

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('culture');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/careers')
      .then(res => res.json())
      .then(data => { if (data.success) setJobs(data.data) })
      .catch(err => console.error('Failed to fetch careers:', err))
  }, [])

   const jobOpenings = jobs.length > 0 ? jobs : [
  {
    _id: "1",
    title: "3D Animation",
    department: "Technology",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Create high-quality 3D animations and visual effects for digital media, games, and applications. Collaborate with designers and developers to bring creative concepts to life.",
    requirements: [
      "Bachelor's in Animation/Design or related field",
      "Strong skills in Blender, Maya, or 3ds Max",
      "Knowledge of texturing, rigging, and rendering",
      "Creative storytelling and visualization skills"
    ]
  },
  {
    _id: "2",
    title: "Android Developer",
    department: "Analytics",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Develop and maintain Android applications with a focus on performance, usability, and scalability. Work closely with product and design teams to deliver seamless user experiences.",
    requirements: [
      "Bachelor's in Computer Science/Engineering",
      "Proficiency in Java/Kotlin",
      "Experience with Android Studio and SDKs",
      "Understanding of REST APIs and mobile UI design"
    ]
  },
  {
    _id: "3",
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Design user-centered interfaces and experiences across web and mobile platforms. Conduct research, wireframing, prototyping, and usability testing to improve product design.",
    requirements: [
      "Bachelor's in Design, HCI, or related field",
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Experience with wireframes, prototypes, and user testing",
      "Strong portfolio demonstrating UX/UI design skills"
    ]
  },
  {
    _id: "4",
    title: "Software Developer",
    department: "Strategy",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Build, test, and deploy software applications across different platforms. Collaborate with teams to design efficient and scalable solutions.",
    requirements: [
      "Bachelor's in Computer Science/IT",
      "Proficiency in Java, Python, or C++",
      "Knowledge of databases (MySQL, MongoDB)",
      "Familiarity with Git and version control"
    ]
  },
  {
    _id: "5",
    title: "Machine Learning",
    department: "Strategy",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 years",
    description: "Develop and implement machine learning models for solving real-world problems. Work with large datasets to build predictive and analytical solutions.",
    requirements: [
      "Bachelor’s/Master’s in Computer Science, AI, or Data Science",
      "Strong programming skills in Python",
      "Experience with ML libraries like TensorFlow, PyTorch, or Scikit-learn",
      "Understanding of statistics and data preprocessing"
    ]
  }
];


  const internships = [
    {
      title: "Software Development Intern",
      duration: "3-6 months",
      department: "Technology",
      description: "Work on real projects with mentorship from senior developers."
    },
    {
      title: "Data Analytics Intern",
      duration: "3-6 months", 
      department: "Analytics",
      description: "Gain hands-on experience with data analysis and visualization tools."
    },
    {
      title: "Digital Marketing Intern",
      duration: "3-6 months",
      department: "Marketing",
      description: "Support digital marketing campaigns and content creation initiatives."
    }
  ];

  const testimonials = [
//       name: "Anshit Gupta",
//       role: "Buisness Management Head",
//       department: "Technology",
//      quote: "Zetawa Dark Private Limited, founded by Tabrej Zeta, is empowering students with real-world project experience and fostering innovation, teamwork, and mentorship. A truly impactful company shaping the next generation of tech leaders!"
// , image: img1
//     },

{
    name: "Surendra Kumar Sir",
    role: "Founder",
    department: "Newton Coaching Centre",
    quote:
      "Real identity comes from those who support you. Real friends keep you grounded, real goals keep you awake. To shine like the sun, work like the sun. Classroom lessons fade, but education lasts a lifetime."
    , image: img1      // or img1 if you replaced the import
},
    {
      name: "Ayush Kumar",
      role: "HR TEAM",
      department: "Analytics", 
      quote: "The unique vision and collective effort makes  this company a great place to work and very good for the personal and professional growth of an individual.",
      image: img2
    }
  ];

  const toggleJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
   <>
   
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#304356ff',
      minHeight: '100vh'
    }}>
      <Nav/>
      
      {/* Header */}
      <header style={{ 
        backgroundColor: 'var(--primary-red)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Build Your Career With Us
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
            Join a team of innovators, creators, and problem-solvers who are shaping the future of technology
          </p>
        </div>
      </header>

      {/* Company Culture Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              Our Culture & Values
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              We believe in fostering an environment where innovation thrives, diversity is celebrated, and every voice matters.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['culture', 'benefits', 'growth'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '50px',
                  backgroundColor: activeTab === tab ? 'var(--primary-red)' : '#f1f3f4',
                  color: activeTab === tab ? 'white' : '#666',
                  cursor: 'pointer',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab === 'culture' ? 'Our Culture' : tab === 'benefits' ? 'Benefits' : 'Growth'}
              </button>
            ))}
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {activeTab === 'culture' && (
              <>
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <Users size={40} style={{ color: 'var(--primary-red)', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                    Collaborative Environment
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    Work alongside talented professionals in cross-functional teams that encourage knowledge sharing and collective problem-solving.
                  </p>
                </div>
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <Award size={40} style={{ color: 'var(--primary-red)', marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                    Innovation First
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    We encourage creative thinking and provide resources to turn innovative ideas into reality through dedicated innovation time and hackathons.
                  </p>
                </div>
              </>
            )}
            
            {activeTab === 'benefits' && (
              <>
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                    Health & Wellness
                  </h3>
                  <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                    <li>Comprehensive health insurance</li>
                    <li>Mental health support programs</li>
                    <li>On-site fitness facilities</li>
                    <li>Flexible working arrangements</li>
                  </ul>
                </div>
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                    Financial Benefits
                  </h3>
                  <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                    <li>Competitive salary packages</li>
                    <li>Performance-based bonuses</li>
                    <li>Employee stock options</li>
                    <li>Retirement savings plans</li>
                  </ul>
                </div>
              </>
            )}
            
            {activeTab === 'growth' && (
              <>
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                    Learning & Development
                  </h3>
                  <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                    <li>Annual learning budget</li>
                    <li>Certification programs</li>
                    <li>Internal training workshops</li>
                    <li>Conference attendance support</li>
                  </ul>
                </div>
                <div style={{ 
                  padding: '2rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '12px',
                  border: '1px solid #e9ecef'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                    Career Progression
                  </h3>
                  <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                    <li>Clear career pathways</li>
                    <li>Mentorship programs</li>
                    <li>Leadership development</li>
                    <li>Cross-functional opportunities</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              <Briefcase size={24} style={{ color: 'var(--primary-red)', marginRight: '0.5rem' }} />
              Current Job And Internship Openings
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Discover opportunities that match your skills and passion
            </p>
          </div>



{/* Certification Aptitude Test */}

<div
  style={{
    background: "white",
    padding: "2rem",
    borderRadius: "16px",
    marginBottom: "3rem",
    boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
    textAlign: "center"
  }}
>

  {/* Heading + NEW Badge */}
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px"
    }}
  >
    <h2
      style={{
        fontSize: "2rem",
        fontWeight: "600",
        color: "#2d2d2d",
        margin: 0
      }}
    >
      Certification Aptitude Test
    </h2>

    <div style={{ width: "90px" }}>
      <Lottie animationData={newBadgeAnimation} loop={true} />
    </div>
  </div>

  <p
    style={{
      color: "#666",
      marginBottom: "10px"
    }}
  >
    Take our certification aptitude test to evaluate your skills and qualify for Zetawa certifications.
  </p>

  {/* Date & Time */}
  <p
    style={{
      color: "#444",
      fontWeight: "500",
      marginBottom: "25px"
    }}
  >
    📅 Date: 22 March 2026 &nbsp;&nbsp; | &nbsp;&nbsp; ⏰ Time: 11:00 AM IST
  </p>

  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      backgroundColor: "var(--primary-red)",
      color: "white",
      padding: "14px 28px",
      borderRadius: "8px",
      fontSize: "1.1rem",
      fontWeight: "500",
      textDecoration: "none",
      display: "inline-block",
      transition: "all 0.3s ease"
    }}
  >
    Apply Now
  </a>

</div>



{/* 🌟 Enhanced Winter Internship Program Card

<div
  style={{
    background: "white",
    borderRadius: "18px",
    padding: "2.2rem",
    marginBottom: "2.8rem",
    border: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "all 0.35s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.18)";
    e.currentTarget.style.transform = "translateY(-8px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>

  <div
    style={{
      display: "inline-block",
      background: "linear-gradient(90deg, #7e3a41, #a45b63)",
      color: "white",
      padding: "0.45rem 1rem",
      borderRadius: "12px",
      fontSize: "0.9rem",
      fontWeight: 600,
      marginBottom: "1.2rem",
    }}
  >
    New • Winter 2025
  </div>

  <h3>
    <span>45-Day Winter Internship Program</span>
  </h3>

  <p>
    Join our exclusive winter internship program designed to help students and
    freshers gain real-world experience.
  </p>

</div>

*/}



          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {jobOpenings.map((job) => (
              <div
                key={job._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: expandedJob === job._id ? '0 8px 25px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <div
                  style={{
                    padding: '2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onClick={() => toggleJob(job._id)}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '0.5rem' }}>
                      {job.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                        <MapPin size={16} />
                        {job.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                        <Clock size={16} />
                        {job.type}
                      </span>
                      <span style={{ color: 'var(--primary-red)', fontWeight: '500' }}>
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: 'var(--primary-red)' }}>
                    {expandedJob === job._id ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                  </div>
                </div>

                {expandedJob === job._id && (
                  <div style={{ 
                    padding: '0 2rem 2rem 2rem',
                    borderTop: '1px solid #e9ecef',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <div style={{ paddingTop: '2rem' }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                        Job Description
                      </h4>
                      <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
                        {job.description}
                      </p>
                      
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#2d2d2d' }}>
                        Requirements
                      </h4>
                      <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                      
                      <button
                        style={{
                          backgroundColor: 'var(--primary-red)',
                          color: 'white',
                          border: 'none',
                          padding: '1rem 2rem',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'background-color 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-red-hover)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary-red)'}
                        
                      >
                        {job.applyLink && (<a target="_blank" style={{color:"white" , textDecoration:"none"}} href={job.applyLink}>Apply Now</a>)}
                        
                       
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* Internships */}
      {/* <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              Internship Opportunities
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Kickstart your career with hands-on experience and mentorship
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {internships.map((internship, index) => (
              <div
                key={index}
                style={{
                  padding: '2rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
                  {internship.title}
                </h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ 
                    backgroundColor: 'var(--primary-red)', 
                    color: 'white', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    {internship.department}
                  </span>
                  <span style={{ 
                    backgroundColor: '#e9ecef', 
                    color: '#666', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.9rem'
                  }}>
                    {internship.duration}
                  </span>
                </div>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {internship.description}
                </p>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--primary-red)',
                    border: '2px solid var(--primary-red)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'var(--primary-red)';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'var(--primary-red)';
                  }}
                >
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Employee Testimonials */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              What Our Team Says
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Hear from our mentors about their experiences supporting us
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: '#2d2d2d', 
                  lineHeight: '1.6', 
                  marginBottom: '2rem',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '0.25rem' }}>
                      {testimonial.name}
                    </h4>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                      {testimonial.role} • {testimonial.department}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              Application Process
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Simple steps to join our team
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              { step: '01', title: 'Submit Application', description: 'Apply online with your resume and cover letter' },
              { step: '02', title: 'Initial Screening', description: 'HR review and initial phone/video screening' },
              { step: '03', title: 'Technical Assessment', description: 'Skills-based evaluation relevant to the position' },
              { step: '04', title: 'Final Interview', description: 'Meet the team and discuss role expectations' },
              { step: '05', title: 'Offer & Onboarding', description: 'Welcome to the team! Complete onboarding process' }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--primary-red)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 auto 1rem auto'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.5', fontSize: '0.95rem' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: '#f8f9fa',
              padding: '3rem',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #e9ecef'
            }}
          >
            <h3
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                color: '#2d2d2d',
                marginBottom: '1rem'
              }}
            >
              Ready to Apply?
            </h3>
            <p
              style={{
                color: '#666',
                marginBottom: '2rem',
                fontSize: '1.1rem'
              }}
            >
              Take the first step towards an exciting career with us
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              {/* Email Contact Button */}
              <a
                href="mailto:hr@zetawa.com"
                style={{
                  backgroundColor: 'var(--primary-red)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--primary-red-hover)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = 'var(--primary-red)')
                }
              >
                <Mail size={20} />
                hr@zetawa.com
              </a>

              {/* Phone Contact Button */}
              <a
                href="tel:+917004265718"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--primary-red)',
                  border: '2px solid var(--primary-red)',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-red)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--primary-red)';
                }}
              >
                <Phone size={20} />
                +91 70042 65718
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
       <Footer/>

      <style jsx>{`
        *{
          margin:0px  ;      
          backgroundColor: #7e3a41ff
        }
        :root {
          --primary-red: #7e3a41ff;
          --primary-red-hover: #884a51ff;
          --dark-bg: #b9adadff;
          --dark-card: #2d2d2d;
          --dark-border: #404040;
        }
      `}</style>
    </div>
   </>
  );
};

export default Careers;