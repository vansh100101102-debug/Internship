import React, { useState } from 'react';
import { 
  Award, 
  Shield, 
  CheckCircle, 
  ExternalLink, 
  Search, 
  FileText, 
  AlertCircle, 
  Check, 
  Code2, 
  Cpu, 
  Lock, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Certifications = () => {
  const [searchCertNumber, setSearchCertNumber] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleValidation = async () => {
    const idToVerify = searchCertNumber.trim();
    if (!idToVerify) {
      setValidationResult({
        type: 'error',
        message: 'Please enter a valid certificate identification number.'
      });
      return;
    }

    setIsVerifying(true);
    try {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(idToVerify)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setValidationResult({
          type: 'success',
          message: 'Certificate Successfully Verified & Validated on Zetawa Dark Registry',
          data: data.data
        });
      } else {
        setValidationResult({
          type: 'error',
          message: 'Certificate not found. Please double-check the Certificate ID issued by Zetawa Dark or contact support.'
        });
      }
    } catch {
      setValidationResult({
        type: 'error',
        message: 'Error verifying certificate. Please check your network connection and try again.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resetSearch = () => {
    setSearchCertNumber('');
    setValidationResult(null);
  };

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8f6f7',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      <Nav />

      {/* ──────── Hero Header ──────── */}
      <section style={{
        background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
        color: 'white',
        padding: '5rem 1.5rem 4.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow orb */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '0.4rem 1.25rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.25rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Award size={16} /> OFFICIAL CREDENTIAL VERIFICATION PORTAL
          </div>

          <h1 style={{
            fontSize: '3.3rem',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Certificate Verification &amp; <br />
            <span style={{ color: '#ffebee' }}>Credential Authenticity</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            opacity: 0.94,
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Verify the authenticity of professional certifications, engineering internships, and fellowship credentials issued by Zetawa Dark Private Limited.
          </p>

          {/* Quick Metrics Strip */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            padding: '1rem 2.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>100% Tamper-Proof</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Official Database</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Instant Lookup</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cryptographic Proof</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Direct Access</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Original Document</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Verification Card Section ──────── */}
      <section style={{ padding: '4.5rem 1.5rem', maxWidth: '1000px', margin: '-2.5rem auto 0', position: 'relative', zIndex: 10 }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '2.75rem',
          boxShadow: '0 16px 40px rgba(126, 58, 65, 0.1)',
          border: '1px solid #e8e0e2'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(126, 58, 65, 0.1)',
              color: '#7e3a41',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <ShieldCheck size={30} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d2d2d', margin: '0 0 0.5rem' }}>
              Verify Certificate Authenticity
            </h2>
            <p style={{ color: '#666', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
              Enter the unique certificate identification number provided by Zetawa Dark to verify recipient credentials and download the original document.
            </p>
          </div>

          {/* Search Box */}
          <div style={{ maxWidth: '640px', margin: '0 auto 1.5rem' }}>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              backgroundColor: '#faf8f9',
              padding: '0.5rem',
              borderRadius: '16px',
              border: '2px solid #ecd8db'
            }}>
              <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', padding: '0 0.75rem' }}>
                <Search size={20} color="#7e3a41" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Enter Certificate No. (e.g. ZETA-2025-001)"
                  value={searchCertNumber}
                  onChange={(e) => setSearchCertNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleValidation()}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1rem',
                    outline: 'none',
                    color: '#2d2d2d',
                    fontWeight: 600
                  }}
                />
              </div>

              <button
                onClick={handleValidation}
                disabled={isVerifying}
                style={{
                  backgroundColor: '#7e3a41',
                  color: 'white',
                  border: 'none',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: isVerifying ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'background 0.2s ease',
                  boxShadow: '0 4px 12px rgba(126,58,65,0.25)'
                }}
                onMouseOver={(e) => { if (!isVerifying) e.currentTarget.style.backgroundColor = '#60292f'; }}
                onMouseOut={(e) => { if (!isVerifying) e.currentTarget.style.backgroundColor = '#7e3a41'; }}
              >
                {isVerifying ? (
                  <>Verifying...</>
                ) : (
                  <><Shield size={18} /> Verify Credential</>
                )}
              </button>
            </div>
          </div>

          {/* Validation Result Box */}
          {validationResult && (
            <div style={{
              marginTop: '2rem',
              padding: '2rem',
              borderRadius: '18px',
              backgroundColor: validationResult.type === 'success' ? '#f0fdf4' : '#fef2f2',
              border: `2px solid ${validationResult.type === 'success' ? '#bbf7d0' : '#fecaca'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {validationResult.type === 'success' ? (
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={20} strokeWidth={3} />
                    </div>
                  ) : (
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertCircle size={20} />
                    </div>
                  )}
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: validationResult.type === 'success' ? '#166534' : '#991b1b' }}>
                      {validationResult.type === 'success' ? 'Official Verified Credential' : 'Verification Unsuccessful'}
                    </h4>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: validationResult.type === 'success' ? '#15803d' : '#b91c1c' }}>
                      {validationResult.message}
                    </p>
                  </div>
                </div>

                <button
                  onClick={resetSearch}
                  style={{ background: 'none', border: 'none', color: '#999', fontSize: '1.2rem', cursor: 'pointer', padding: '0.2rem' }}>
                  ✕
                </button>
              </div>

              {/* Digital Certificate Seal Card */}
              {validationResult.type === 'success' && validationResult.data && (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '2px solid #7e3a41',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Watermark Seal */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '12rem',
                    color: 'rgba(126, 58, 65, 0.03)',
                    fontWeight: 900,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}>
                    ZETAWA DARK
                  </div>

                  <div style={{ textAlign: 'center', borderBottom: '2px solid #f3ecee', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7e3a41', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      ZETAWA DARK PRIVATE LIMITED
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2d2d2d', margin: '0.4rem 0 0' }}>
                      Certificate of Completion &amp; Excellence
                    </h3>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                    <p style={{ color: '#777', fontSize: '0.9rem', margin: '0 0 0.4rem' }}>This certifies that</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#7e3a41', margin: '0 0 0.5rem' }}>
                      {validationResult.data.internName}
                    </h2>
                    <p style={{ color: '#555', fontSize: '0.95rem', margin: '0 0 0.4rem' }}>
                      has successfully completed the practical fellowship program in
                    </p>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#faf4f5',
                      color: '#7e3a41',
                      padding: '0.4rem 1.25rem',
                      borderRadius: '20px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      border: '1px solid #ecd8db'
                    }}>
                      {validationResult.data.course}
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1rem',
                    padding: '1.25rem',
                    backgroundColor: '#faf8f9',
                    borderRadius: '12px',
                    border: '1px solid #f0e6e8',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', fontWeight: 700 }}>Certificate Number</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2d2d2d', marginTop: '0.2rem' }}>{validationResult.data.certificateNumber}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', fontWeight: 700 }}>Issue Date</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2d2d2d', marginTop: '0.2rem' }}>{validationResult.data.issueDate || validationResult.data.completionDate || 'Verified'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', fontWeight: 700 }}>Program Duration</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2d2d2d', marginTop: '0.2rem' }}>{validationResult.data.duration || 'Completed'}</div>
                    </div>
                  </div>

                  {validationResult.data.certificateFile && (
                    <div style={{ textAlign: 'center' }}>
                      <a
                        href={`/${validationResult.data.certificateFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: '#7e3a41',
                          color: 'white',
                          padding: '0.85rem 1.75rem',
                          borderRadius: '10px',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: '0 4px 14px rgba(126, 58, 65, 0.25)'
                        }}
                      >
                        <ExternalLink size={16} /> View &amp; Download Official Certificate Document
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Verification steps helper card */}
          {!validationResult && (
            <div style={{
              marginTop: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              borderTop: '1px solid #f0e6e8',
              paddingTop: '2rem'
            }}>
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(126,58,65,0.1)', color: '#7e3a41', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: 700, color: '#2d2d2d' }}>Obtain Certificate ID</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#666', lineHeight: 1.5 }}>Locate the unique identification number issued on your Zetawa Dark certificate document.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(126,58,65,0.1)', color: '#7e3a41', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: 700, color: '#2d2d2d' }}>Enter Number Above</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#666', lineHeight: 1.5 }}>Type the exact certificate identification number into the search field and click Verify.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(126,58,65,0.1)', color: '#7e3a41', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: 700, color: '#2d2d2d' }}>Instant Verification</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#666', lineHeight: 1.5 }}>View authenticated recipient credentials and access the original uploaded certificate file.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ──────── Engineering Standards & Accreditations ──────── */}
      <section style={{ padding: '4rem 1.5rem 6rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(126, 58, 65, 0.08)',
            color: '#7e3a41',
            padding: '0.35rem 0.9rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '0.75rem',
            textTransform: 'uppercase'
          }}>
            <ShieldCheck size={14} /> RIGOROUS CREDENTIALING
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2d2d2d', margin: '0 0 0.75rem' }}>
            Zetawa Dark Professional &amp; Industry Standards
          </h2>
          <p style={{ color: '#666', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Our certificates recognize rigorous engineering standards, ethical hacking assessments, and production-level software contributions.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {[
            {
              icon: <Code2 size={26} />,
              title: "Full-Stack Fellowship Standards",
              desc: "Awarded to engineers demonstrating proficiency in modern frontend frameworks, scalable microservices, and database optimization."
            },
            {
              icon: <Cpu size={26} />,
              title: "AI & Autonomous Systems",
              desc: "Recognizes hands-on competence in RAG vector pipelines, LLM agent engineering, and intelligent process automation."
            },
            {
              icon: <Shield size={26} />,
              title: "Responsible Disclosure & Security",
              desc: "Upholding ethical vulnerability research, OWASP Top 10 standards, and responsible disclosure protocols (e.g. MobiKwik bug bounty award)."
            },
            {
              icon: <Lock size={26} />,
              title: "Tamper-Proof Digital Verification",
              desc: "All issued credentials are tied to cryptographic database identifiers preventing fraudulent reproduction."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e8e0e2',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(126,58,65,0.08)';
                e.currentTarget.style.borderColor = 'rgba(126,58,65,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#e8e0e2';
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                backgroundColor: 'rgba(126, 58, 65, 0.08)',
                color: '#7e3a41',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2d2d2d', marginBottom: '0.6rem' }}>
                {item.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── Bottom Fellowship Callout ──────── */}
      <section style={{
        padding: '5rem 1.5rem',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e8e0e2'
      }}>
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
          borderRadius: '24px',
          padding: '3.5rem 2.5rem',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 16px 40px rgba(126, 58, 65, 0.2)'
        }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem' }}>
            Want to Join the Zetawa Dark Engineering Fellowship?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.92, maxWidth: '600px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
            Gain real-world experience building production web apps, autonomous AI agents, and scalable cloud systems under senior engineering mentorship.
          </p>
          <Link
            to="/careers"
            style={{
              backgroundColor: 'white',
              color: '#7e3a41',
              padding: '0.95rem 2.25rem',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
            }}
          >
            Explore Open Fellowship &amp; Career Roles <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Certifications;

