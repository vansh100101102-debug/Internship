import React, { useEffect, useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, User, MessageSquare, Award, Shield, CheckCircle, Download, ExternalLink } from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import internpdf from '../assets/intern2.pdf'
import internpdf2 from '../assets/intern.pdf'
import internpdf3 from '../assets/intern3.pdf';
import intern4 from '../assets/intern4.pdf';
import intern5 from '../assets/intern5.pdf';
import intern6 from '../assets/intern6.pdf';
import intern7 from '../assets/intern7.pdf';
import intern8 from '../assets/intern8.pdf';
import intern9 from '../assets/intern9.pdf';
import intern10 from '../assets/intern10.pdf';
import intern11 from '../assets/intern11.pdf';


// https://drive.google.com/file/d/1bpJ_rbaJqRHp287CgEURkkoskv96JwyG/view?usp=drivesdk

const Certifications = () => {

  const [searchCertNumber, setSearchCertNumber] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await fetch('/api/certificates');
        const data = await res.json();
        if (data.success) setCertificates(data.data);
      } catch (err) {
        console.error('Failed to fetch certificates:', err);
      }
    };
    fetchCerts();
  }, []);

  const handleValidation = async () => {
    if (!searchCertNumber.trim()) {
      setValidationResult({
        type: 'error',
        message: 'Please enter a certificate number'
      });
      return;
    }

    try {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(searchCertNumber.trim())}`);
      const data = await res.json();
      if (data.success) {
        setValidationResult({
          type: 'success',
          message: 'Certificate found and validated!',
          data: data.data
        });
      } else {
        setValidationResult({
          type: 'error',
          message: 'Certificate not found. Please check the certificate number.'
        });
      }
    } catch {
      setValidationResult({
        type: 'error',
        message: 'Error verifying certificate. Please try again.'
      });
    }
  };

  const resetSearch = () => {
    setSearchCertNumber('');
    setValidationResult(null);
  };

  const handleDownloadCertificate = (driveLink) => {
    // Convert view link to download link
    const downloadLink = driveLink.replace('/view?usp=sharing', '/export?format=pdf');
    window.open(downloadLink, '_blank');
  };

  const handleViewCertificate = (driveLink) => {
    window.open(driveLink, '_blank');
  };

  const CertificateImage = ({ certificate }) => (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
      border: '8px solid var(--primary-red)',
      borderRadius: '15px',
      padding: '40px',
      color: '#000',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
    }}>
      
      <div style={{ borderBottom: '3px solid var(--primary-red)', paddingBottom: '20px', marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--primary-red)', fontWeight: 'bold', margin: '0' }}>ZETAWA DARK</h2>
        <p style={{ color: '#666', fontSize: '14px', margin: '15px 0 0 0' }}>Certificate of Completion</p>
      </div>
      
      <div style={{ margin: '30px 0' }}>
        <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>This is to certify that</p>
        <h3 style={{ fontSize: '2rem', color: '#333', fontWeight: 'bold', margin: '15px 0' }}>
          {certificate.internName}
        </h3>
        <p style={{ fontSize: '16px', color: '#666', margin: '10px 0' }}>has successfully completed</p>
        <h4 style={{ fontSize: '1.5rem', color: 'var(--primary-red)', fontWeight: '600', margin: '15px 0' }}>
          {certificate.course}
        </h4>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', fontSize: '14px', color: '#666' }}>
        <div>
          <p><strong>Certificate No:</strong> {certificate.certificateNumber}</p>
        </div>
        <div>
          <p><strong>Date:</strong> {certificate.completionDate}</p>
          <p><strong>Duration:</strong> {certificate.duration}</p>
        </div>
      </div>

      
    </div>
  );

  return (
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
        position: 'relative'
      }}>
        
        <div style={{ maxWidth: 'auto', margin: '0 auto', padding: '0 2rem' }}>
        
          <div style={{ textAlign: 'center', marginTop: '-2rem' }}>
            
            <h1 style={{ fontSize: '2.5rem', opacity: '0.9', marginBottom: '0.5rem' }}>
              Certificate Verification Portal
            </h1>
            <p style={{ fontSize: '0.8rem', opacity: '0.8', maxWidth: '600px', margin: '0 auto' }}>
              Validate your internship completion certificate with our secure verification system
            </p>
          </div>
        </div>
      </header>

      {/* Certificate Validation Section */}
      <section className="section-padding" style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              Verify Your Certificate
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Enter your certificate number below to verify authenticity and view your official certificate
            </p>
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ 
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d2d2d',
                  marginBottom: '0.5rem'
                }}>
                  Certificate Number
                </label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="Enter certificate number"
                    value={searchCertNumber}
                    onChange={(e) => setSearchCertNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleValidation()}
                    style={{
                      flex: '1',
                      minWidth: '250px',
                      padding: '1rem 1.5rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-red)'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                  <button
                    onClick={handleValidation}
                    style={{
                      backgroundColor: 'var(--primary-red)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-red-hover)'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary-red)'}
                  >
                    <Shield size={20} />
                    Verify Certificate
                  </button>
                </div>
              </div>

              {validationResult && (
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '10px',
                  border: `2px solid ${validationResult.type === 'success' ? '#28a745' : '#dc3545'}`,
                  backgroundColor: validationResult.type === 'success' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                  marginBottom: validationResult.type === 'success' ? '2rem' : '0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: validationResult.type === 'success' ? '1.5rem' : '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {validationResult.type === 'success' ? 
                        <CheckCircle size={24} style={{ color: '#28a745' }} /> :
                        <MessageSquare size={24} style={{ color: '#dc3545' }} />
                      }
                      <span style={{ 
                        color: validationResult.type === 'success' ? '#28a745' : '#dc3545',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>
                        {validationResult.message}
                      </span>
                    </div>
                    <button 
                      onClick={resetSearch}
                      style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'inherit',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '4px'
                      }}
                    >
                      ×
                    </button>
                  </div>

                  {/* Download Buttons - Only show for valid certificates */}
                  {validationResult.type === 'success' && validationResult.data && (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleViewCertificate(validationResult.data.driveLink)}
                        style={{
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '1rem 2rem',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flex: '1',
                          minWidth: '200px',
                          justifyContent: 'center'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                      >
                        <ExternalLink size={20} />
                        View Certificate
                      </button> 
                      {/* <button
                        onClick={() => handleDownloadCertificate(validationResult.data.driveLink)}
                        style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '1rem 2rem',
                          borderRadius: '10px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flex: '1',
                          minWidth: '200px',
                          justifyContent: 'center'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                      >
                        <Download size={20} />
                        Download PDF
                      </button> */}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>

      <style>{`
        :root {
          --primary-red: #7e3a41ff;
          --primary-red-hover: #884a51ff;
        }
        
        * {
          box-sizing: border-box;
          margin:0px;
        }
        
        button:focus,
        input:focus {
          outline: none;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem !important;
          }
          
          .section-padding {
            padding: 3rem 0 !important;
          }
          
          .section-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Certifications;