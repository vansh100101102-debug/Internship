import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, FileText, Calendar, Users, Bell, TrendingUp, Globe, Award } from 'lucide-react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import img1 from '../assets/internshipnotice.jpg';
import pdf from '../assets/boardResolution.pdf';
import sonamImg from '../assets/SonamWangchukInternship.jpg';
import pdf2 from '../assets/Zetawa_dark_bonus.pdf';
import Footer from './Footer';

const PressRelease = () => {
  const [selectedYear, setSelectedYear] = useState('FY2025');
  const [pressReleases, setPressReleases] = useState({});

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const res = await fetch('/api/press-releases');
        const data = await res.json();
        if (data.success) {
          const grouped = {};
          data.data.forEach(r => {
            if (!grouped[r.year]) grouped[r.year] = [];
            grouped[r.year].push(r);
          });
          setPressReleases(grouped);
        }
      } catch (err) {
        console.error('Failed to fetch press releases:', err);
      }
    };
    fetchReleases();
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      'Official Announcement': '#7e3a41ff',
      'Business Update': '#4a5568',
      'Financial Results': '#2d3748',
      'Clarification': '#553c9a',
      'Project Award': '#38a169',
      'Partnership': '#d69e2e',
      'Tender Win': '#e53e3e',
      'Annual Report': '#6c757d',
      'Board Meeting': '#ed8936',
      'Development Update': '#3182ce'
    };
    return colors[type] || '#6c757d';
  };

  const handleHomeClick = () => {
    console.log('Navigate to home');
  };

  const stats = [
    { value: Object.values(pressReleases).flat().length.toString(), label: "Total Releases", icon: FileText },
    { value: (pressReleases[selectedYear]?.length || 0).toString(), label: "This Year", icon: TrendingUp },
    { value: "8", label: "Categories", icon: Award },
    { value: "24/7", label: "Media Access", icon: Globe }
  ];

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#304356ff',
      minHeight: '100vh'
    }}>
      <Nav/>

      <style jsx>{`
        :root {
          --primary-red: #7e3a41ff;
          --primary-red-hover: #884a51ff;
          --dark-bg: #304356ff;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>

      {/* Header Section */}
      <header style={{ 
        backgroundColor: 'var(--primary-red)',
        color: 'white',
        padding: '2rem 0',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Press Release <span style={{color: '#ffebee'}}>Center</span>
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
            Stay updated with our latest announcements, developments, and company news
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section style={{ padding: '3rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem' 
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <stat.icon size={40} style={{ color: 'var(--primary-red)', marginBottom: '1rem' }} />
                <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary-red)', marginBottom: '0.5rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '1.1rem', color: '#666', fontWeight: '500' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: '3rem 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          {/* Year Selection Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              border: '1px solid #e9ecef',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <h5 style={{ 
                color: '#2d2d2d', 
                marginBottom: '1.5rem', 
                display: 'flex', 
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: '700'
              }}>
                <div style={{
                  backgroundColor: 'rgba(126, 58, 65, 0.1)',
                  borderRadius: '8px',
                  padding: '8px',
                  marginRight: '12px'
                }}>
                  <FileText size={20} style={{ color: 'var(--primary-red)' }} />
                </div>
                Filter by Year
              </h5>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {Object.keys(pressReleases).map((year) => (
                  <div 
                    key={year}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      backgroundColor: selectedYear === year ? 'var(--primary-red)' : 'transparent',
                      color: selectedYear === year ? 'white' : '#666',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: selectedYear === year ? 'none' : '2px solid #f1f3f4',
                      fontWeight: selectedYear === year ? '700' : '600',
                      fontSize: '0.95rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: selectedYear === year ? '0 4px 12px rgba(126, 58, 65, 0.3)' : 'none'
                    }}
                    onClick={() => setSelectedYear(year)}
                    onMouseOver={(e) => {
                      if (selectedYear !== year) {
                        e.currentTarget.style.backgroundColor = 'rgba(126, 58, 65, 0.05)';
                        e.currentTarget.style.borderColor = 'var(--primary-red)';
                        e.currentTarget.style.color = 'var(--primary-red)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedYear !== year) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = '#f1f3f4';
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '1.1rem' }}>📁</span>
                      <span>{year}</span>
                    </div>
                    <span style={{
                      backgroundColor: selectedYear === year ? 'rgba(255, 255, 255, 0.2)' : 'rgba(126, 58, 65, 0.1)',
                      color: selectedYear === year ? 'white' : 'var(--primary-red)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      minWidth: '45px',
                      textAlign: 'center'
                    }}>
                      {pressReleases[year].length}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-red)', marginBottom: '4px' }}>
                  {Object.values(pressReleases).flat().length}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: '500' }}>
                  Total Press Releases
                </div>
              </div>
            </div>
          </div>

          {/* Press Releases Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e9ecef',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ 
              padding: '2.5rem 2rem',
              background: 'linear-gradient(135deg, var(--primary-red), #8b4049)',
              color: 'white',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgba(255,255,255,0.05)" fill-rule="evenodd"%3E%3Cpath d="m0 40l40-40h-40z"/%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.1
              }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '12px' }}>📋</span>
                  {selectedYear} Press Releases
                </h2>
                <p style={{ margin: '0', opacity: '0.9', fontSize: '1.1rem', fontWeight: '500' }}>
                  {pressReleases[selectedYear]?.length || 0} official announcements and updates
                </p>
              </div>
            </div>

            <div style={{ padding: '0' }}>
              {pressReleases[selectedYear]?.length > 0 ? (
                pressReleases[selectedYear].map((release, index) => (
                  <div 
                    key={release.id}
                    style={{
                      padding: '2rem',
                      borderBottom: index < pressReleases[selectedYear].length - 1 ? '1px solid #f1f3f4' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                      e.currentTarget.style.transform = 'translateX(8px)';
                      const downloadBtn = e.currentTarget.querySelector('.download-btn');
                      const linkedinBtn = e.currentTarget.querySelector('.view-linkedin-btn');
                      if (downloadBtn) {
                        downloadBtn.style.backgroundColor = 'var(--primary-red-hover)';
                        downloadBtn.style.transform = 'translateY(-2px) scale(1.05)';
                      }
                      if (linkedinBtn) {
                        linkedinBtn.style.backgroundColor = '#005582';
                        linkedinBtn.style.transform = 'translateY(-2px) scale(1.05)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateX(0)';
                      const downloadBtn = e.currentTarget.querySelector('.download-btn');
                      const linkedinBtn = e.currentTarget.querySelector('.view-linkedin-btn');
                      if (downloadBtn) {
                        downloadBtn.style.backgroundColor = 'var(--primary-red)';
                        downloadBtn.style.transform = 'translateY(0) scale(1)';
                      }
                      if (linkedinBtn) {
                        linkedinBtn.style.backgroundColor = '#0077b5';
                        linkedinBtn.style.transform = 'translateY(0) scale(1)';
                      }
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '2rem'
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ 
                          color: '#2d2d2d', 
                          marginBottom: '1rem', 
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          lineHeight: '1.4',
                          wordWrap: 'break-word'
                        }}>
                          {release.title}
                        </h3>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '1rem', 
                          flexWrap: 'wrap',
                          marginBottom: '0.5rem'
                        }}>
                          <span 
                            style={{ 
                              backgroundColor: getTypeColor(release.type),
                              color: 'white',
                              padding: '6px 16px',
                              borderRadius: '25px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {release.type}
                          </span>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            color: '#666', 
                            fontSize: '0.95rem',
                            fontWeight: '500'
                          }}>
                            <Calendar size={16} style={{ marginRight: '8px' }} />
                            {release.date}
                          </div>
                        </div>
                        {release.source && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            color: '#0077b5', 
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            marginTop: '0.5rem'
                          }}>
                            <Globe size={16} style={{ marginRight: '8px' }} />
                            Source: {release.source}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                        {release.linkedinUrl ? (
                          <button
                            className="view-linkedin-btn"
                            style={{
                              backgroundColor: '#0077b5', // LinkedIn brand color
                              color: 'white',
                              border: 'none',
                              padding:'4px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              boxShadow: '0 4px 10px rgba(0, 119, 181, 0.25)',
                              whiteSpace: 'nowrap',
                            }}
                            onClick={() => window.open(release.linkedinUrl, '_blank')}
                          >
                            <Globe size={18} /> {/* You can keep this if you want a globe */}
                            <span style={{ fontSize: '0.7rem' }}>View</span>
                          </button>

                        ) : null}
                        {/* <button 
                          className="download-btn"
                          style={{
                            backgroundColor: 'var(--primary-red)',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(126, 58, 65, 0.3)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <Download size={18} />
                          Download PDF
                        </button> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '5rem 2rem', 
                  color: '#666'
                }}>
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                  }}>
                    <FileText size={48} style={{ color: '#ccc' }} />
                  </div>
                  <h3 style={{ color: '#999', marginBottom: '0.75rem', fontSize: '1.3rem', fontWeight: '600' }}>
                    No releases available
                  </h3>
                  <p style={{ color: '#ccc', margin: '0', fontSize: '1rem' }}>
                    No press releases found for {selectedYear}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Responsive Styles */}
        <style jsx>{`
          @media (max-width: 768px) {
            .year-selection-grid {
              grid-template-columns: 1fr !important;
            }

            .view-linkedin-btn{
            width:50px;
              flex: 1 !important;
              justify-content: center !important;
              }
            
            .release-item-flex {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 1.5rem !important;
            }
            
            .download-btn {
              align-self: flex-start !important;
            }
          }
          
          @media (max-width: 480px) {
            .year-selection-card {
              padding: 1.25rem !important;
            }
            
            .release-header {
              padding: 1.5rem 1rem !important;
            }
            
            .release-item {
              padding: 1.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* Additional Information Section */}
      <section style={{ padding: '3rem 0', backgroundColor: 'white' }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
        Latest Updates
      </h2>
      <p style={{ fontSize: '1.1rem', color: '#666' }}>
        Additional Updates for media representatives and stakeholders
      </p>
    </div>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '2rem' 
    }}>

      <div style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <Bell size={24} style={{ color: 'var(--primary-red)', marginRight: '0.75rem' }} />
    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2d2d2d', margin: '0' }}>
      Bonus Announcement for Interns
    </h3>
  </div>

  <p style={{ color: '#2d2d2d', marginBottom: '0.75rem', fontWeight: '500' }}>
    We are pleased to announce a 10% bonus for all current interns.
  </p>

  <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
    As part of our efforts to recognize and reward the hard work and dedication of our interns, 
    Zetawa Dark Private Limited has approved a 10% bonus effective from <strong>29-08-2025</strong>. 
    The bonus will be disbursed accordingly in the current payment cycle.
  </p>
  <button 
    style={{
      backgroundColor: 'var(--primary-red)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '500'
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = 'var(--primary-red-hover)';
      e.target.style.transform = 'translateY(-1px)';
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = 'var(--primary-red)';
      e.target.style.transform = 'translateY(0)';
    }}
  >
    <a href={pdf2} target="_blank" style={{ color: 'white', textDecoration: 'none' }}>View Notice</a>
  </button>
</div>


      <div style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Bell size={24} style={{ color: 'var(--primary-red)', marginRight: '0.75rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2d2d2d', margin: '0' }}>
            Internship Notice
          </h3>
        </div>
        <p style={{ color: '#2d2d2d', marginBottom: '0.75rem', fontWeight: '500' }}>
          Join Our Dynamic Team - Internship Opportunities Available
        </p>
        <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          We are excited to announce internship opportunities across various departments. Join us to gain valuable experience and contribute to our innovative projects.
        </p>
        <button 
          style={{
            backgroundColor: 'var(--primary-red)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'var(--primary-red-hover)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'var(--primary-red)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <FileText size={16} />
          <a href={img1}  target="_blank" style={{ color: 'white', textDecoration: 'none' }}>View Notice</a>
        </button>
      </div>

      

      <div style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Users size={24} style={{ color: 'var(--primary-red)', marginRight: '0.75rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2d2d2d', margin: '0' }}>
            Board Resolution for FY24-25
          </h3>
        </div>
        <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Complete board resolution document for the financial year 2024-25, including all strategic decisions and corporate governance updates.
        </p>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: '#666', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary-red)', marginRight: '8px' }}>•</span>
            Strategic Decisions & Approvals
          </div>
          <div style={{ color: '#666', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary-red)', marginRight: '8px' }}>•</span>
            Corporate Governance Updates
          </div>
          <div style={{ color: '#666', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary-red)', marginRight: '8px' }}>•</span>
            Financial Year Planning
          </div>
        </div>
        <button 
          style={{
            backgroundColor: 'transparent',
            color: 'var(--primary-red)',
            border: '2px solid var(--primary-red)',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '500'
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
          <a href={pdf} target="_blank" style={{ color: 'var(--primary-red)', textDecoration: 'none' }}>View Notice</a>
        </button>
      </div>

     <div
  style={{
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
    transition: 'transform 0.3s ease'
  }}
  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
>

  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
    <Bell size={24} style={{ color: 'var(--primary-red)', marginRight: '0.75rem' }} />
    <h3
      style={{
        fontSize: '1.3rem',
        fontWeight: '600',
        color: '#2d2d2d',
        margin: '0'
      }}
    >
      Sonam Wangchuk Internship
    </h3>
  </div>

  <p
    style={{
      color: '#2d2d2d',
      marginBottom: '0.75rem',
      fontWeight: '500'
    }}
  >
    Launch of the Sonam Wangchuk Internship Program
  </p>

  <p
    style={{
      color: '#666',
      marginBottom: '1.5rem',
      lineHeight: '1.6'
    }}
  >
    We are extremely proud to announce that Zetawa Dark Private Limited
    is launching the <strong>"SONAM WANGCHUK INTERNSHIP"</strong>.
    <br /><br />
    This internship is inspired by the vision of Sonam Wangchuk Sir
    and by the fact that we are both proud Alumni of NIT Srinagar.
    <br /><br />
    Our mission is simple – Using technology to solve real social
    problems.
  </p>

  <button
    style={{
      backgroundColor: 'var(--primary-red)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '500'
    }}
  >
    <FileText size={16} />
    <a
      href={sonamImg}
      target="_blank"
      rel="noreferrer"
      style={{
        color: 'white',
        textDecoration: 'none'
      }}
    >
      View Notice
    </a>
  </button>

</div>
      
    </div>
  </div>
</section>

     
      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default PressRelease;