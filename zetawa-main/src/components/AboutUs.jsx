import React from 'react';
import { SiGmail } from "react-icons/si";
import image from '../assets/image.png';
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  Lightbulb, 
  Shield, 
  Zap,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  GraduationCap,
  Bug,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8f6f7',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      <Nav />
      
      {/* ──────── Hero Section ──────── */}
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
        color: 'white',
        padding: '5rem 1.5rem 4.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow Orb */}
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
            <Sparkles size={16} /> EMPOWERING DIGITAL INNOVATION
          </div>

          <h1 style={{ 
            fontSize: '3.4rem', 
            fontWeight: 800, 
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Transforming Businesses with <br />
            <span style={{ color: '#ffebee' }}>Intelligent Software Solutions</span>
          </h1>

          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.94,
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Empowering organizations with cutting-edge technology solutions that drive growth, 
            enhance efficiency, and unlock new possibilities in the digital age.
          </p>

          {/* Quick Metrics Trust Strip */}
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
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Founded Nov 2024</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Zetawa Dark Pvt Ltd</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>NIT Srinagar Roots</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engineering Foundation</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Security &amp; AI First</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ethical &amp; Proven</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* ──────────── 1. Vision & Mission ──────────── */}
        <section className="mission-vision-section" style={{ padding: '4.5rem 0' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
            gap: '2.5rem',
            alignItems: 'stretch'
          }}>
            {/* Vision Card */}
            <div className="vision-card" style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              border: '1px solid #e8e0e2',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 18px 40px rgba(126,58,65,0.1)';
              e.currentTarget.style.borderColor = 'rgba(126,58,65,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = '#e8e0e2';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(126, 58, 65, 0.12) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              
              <div>
                <div style={{ 
                  background: 'rgba(126, 58, 65, 0.1)',
                  color: '#7e3a41',
                  borderRadius: '16px',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem'
                }}>
                  <Eye size={32} />
                </div>
                
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  marginBottom: '1rem',
                  color: '#2d2d2d'
                }}>
                  Our Vision
                </h2>
                <p style={{ 
                  fontSize: '1.05rem', 
                  lineHeight: '1.75', 
                  color: '#666',
                  margin: 0
                }}>
                  To be a leading technology partner that transforms how businesses operate, 
                  innovate, and grow through intelligent software solutions that make complex 
                  challenges simple and accessible.
                </p>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #f3ecee', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7e3a41', fontWeight: 700, fontSize: '0.9rem' }}>
                <Sparkles size={16} /> Pioneering Intelligent Scale
              </div>
            </div>

            {/* Mission Card */}
            <div className="mission-card" style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              border: '1px solid #e8e0e2',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 18px 40px rgba(126,58,65,0.1)';
              e.currentTarget.style.borderColor = 'rgba(126,58,65,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = '#e8e0e2';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(126, 58, 65, 0.12) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              
              <div>
                <div style={{ 
                  background: 'rgba(126, 58, 65, 0.1)',
                  color: '#7e3a41',
                  borderRadius: '16px',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem'
                }}>
                  <Target size={32} />
                </div>
                
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 800, 
                  marginBottom: '1rem',
                  color: '#2d2d2d'
                }}>
                  Our Mission
                </h2>
                <p style={{ 
                  fontSize: '1.05rem', 
                  lineHeight: '1.75', 
                  color: '#666',
                  margin: 0
                }}>
                  We empower businesses of all sizes with innovative, user-friendly software 
                  solutions that streamline operations, enhance productivity, and drive sustainable 
                  growth in an ever-evolving digital landscape.
                </p>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #f3ecee', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7e3a41', fontWeight: 700, fontSize: '0.9rem' }}>
                <CheckCircle size={16} /> Value &amp; Velocity Driven
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── 2. What Sets Us Apart ──────────── */}
        <section className="differentiators-section" style={{ 
          padding: '4.5rem 2rem',
          background: '#ffffff',
          borderRadius: '28px',
          border: '1px solid #e8e0e2',
          boxShadow: '0 6px 24px rgba(0,0,0,0.02)',
          marginBottom: '4.5rem'
        }}>
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
              <ShieldCheck size={14} /> CORE VALUES &amp; EXCELLENCE
            </div>
            <h2 style={{ 
              fontSize: '2.6rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              color: '#2d2d2d'
            }}>
              What Sets Us Apart
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#666',
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              Our commitment to excellence and innovation makes us the preferred 
              technology partner for forward-thinking businesses.
            </p>
          </div>

          <div className="features-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem'
          }}>
            {[
              {
                icon: <Lightbulb size={28} />,
                title: "Innovation-First Approach",
                description: "We stay ahead of technology trends, continuously exploring emerging technologies to deliver cutting-edge solutions that give our clients a competitive advantage."
              },
              {
                icon: <Users size={28} />,
                title: "User-Centric Design",
                description: "Every solution we create prioritizes user experience, ensuring our software is intuitive, accessible, and designed with real user needs at the forefront."
              },
              {
                icon: <Shield size={28} />,
                title: "Reliability & Security",
                description: "Our robust development practices and security-first mindset ensure that your business data and operations remain protected and consistently available."
              },
              {
                icon: <Zap size={28} />,
                title: "Agile Development",
                description: "We embrace agile methodologies to deliver solutions faster, adapt to changing requirements, and maintain transparent communication throughout the development process."
              },
              {
                icon: <Award size={28} />,
                title: "Proven Excellence",
                description: "Our track record of successful projects and satisfied clients demonstrates our commitment to delivering high-quality solutions that exceed expectations."
              },
              {
                icon: <CheckCircle size={28} />,
                title: "Comprehensive Support",
                description: "From initial consultation to ongoing maintenance, we provide end-to-end support to ensure your success with our solutions at every stage of your journey."
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card" style={{
                background: '#faf8f9',
                padding: '2.25rem 2rem',
                borderRadius: '18px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                border: '1px solid #ecdfe2',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(126,58,65,0.08)';
                e.currentTarget.style.borderColor = '#7e3a41';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#ecdfe2';
                e.currentTarget.style.backgroundColor = '#faf8f9';
              }}>
                <div style={{ 
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(126, 58, 65, 0.1)',
                  color: '#7e3a41',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 800, 
                  marginBottom: '0.65rem',
                  color: '#2d2d2d'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#666', 
                  lineHeight: '1.65',
                  fontSize: '0.92rem',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── 3. Meet the Founder ──────────── */}
        <section className="founder-section" style={{ padding: '0 0 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
              <GraduationCap size={14} /> LEADERSHIP &amp; VISION
            </div>
            <h2 style={{ 
              fontSize: '2.6rem', 
              fontWeight: 800, 
              marginBottom: '0.75rem',
              color: '#2d2d2d'
            }}>
              Meet the Founder
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#666',
              maxWidth: '550px',
              margin: '0 auto'
            }}>
              The vision, technical passion, and drive behind Zetawa Dark Private Limited.
            </p>
          </div>

          <div className="founder-card" style={{
            background: '#ffffff',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(126, 58, 65, 0.08)',
            border: '1px solid #e8e0e2',
          }}>
            {/* Founder banner + photo row */}
            <div className="founder-header" style={{
              background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '2.5rem',
              alignItems: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '240px',
                height: '240px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />

              {/* Photo */}
              <div className="founder-photo-wrap" style={{
                width: '180px',
                height: '180px',
                borderRadius: '24px',
                border: '4px solid rgba(255,255,255,0.35)',
                overflow: 'hidden',
                flexShrink: 0,
                boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                position: 'relative',
                zIndex: 1,
              }}>
                <img
                  src={image}
                  alt="Tabrez Alam — Founder"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Name + title + socials */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 className="founder-name" style={{
                  fontSize: '2.4rem',
                  fontWeight: 800,
                  marginBottom: '0.25rem',
                  letterSpacing: '-0.01em'
                }}>
                  Tabrez Alam
                </h3>
                <p style={{ fontSize: '1.15rem', opacity: 0.94, marginBottom: '1.25rem', fontWeight: 600, color: '#ffebee' }}>
                  Founder &amp; Executive Director
                </p>

                {/* Contact chips */}
                <div className="founder-contact-row" style={{
                  display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.25rem'
                }}>
                  {[
                    { icon: <Mail size={14} />, text: 'tabrez.zeta@gmail.com' },
                    { icon: <Phone size={14} />, text: '+91 70042 65718' },
                    { icon: <MapPin size={14} />, text: 'Bihar, India' },
                  ].map((item, i) => (
                    <span key={i} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: 'rgba(255,255,255,0.14)', borderRadius: '50px',
                      padding: '0.4rem 0.95rem', fontSize: '0.85rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      {item.icon} {item.text}
                    </span>
                  ))}
                </div>

                {/* Social icons */}
                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  {[
                    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/tabrez-alam-59b6b61b3/' },
                    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/tabrez_zeta?igsh=aXZveDRxend3NGpv' },
                    { icon: <Twitter size={18} />, href: 'https://x.com/tabrez_zeta?t=YaorG8xFInFR2bLaPxG0TA&s=08' },
                    { icon: <SiGmail size={18} />, href: 'mailto:tabrez.zeta@gmail.com' },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="founder-social-link"
                      style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', textDecoration: 'none',
                        transition: 'all 0.25s ease',
                        border: '1px solid rgba(255,255,255,0.25)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#7e3a41';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio + highlights body */}
            <div className="founder-body" style={{ padding: '3rem' }}>
              {/* Bio paragraph */}
              <p className="founder-bio" style={{
                fontSize: '1.12rem',
                lineHeight: '1.85',
                color: '#475569',
                marginBottom: '2.5rem',
              }}>
                Tabrez Alam is an 8th-semester Information Technology student at NIT Srinagar, hailing from Dhaka Champaran district in Bihar. A rising star known equally for his technical acumen and selfless generosity, Tabrez founded Zetawa Dark Private Limited in November 2024, leading the company&apos;s strategic vision and overseeing all operations to drive growth and innovation across business units.
              </p>

              {/* Key Highlights */}
              <div className="highlights-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.75rem',
              }}>
                {/* Highlight 1: Education */}
                <div className="highlight-card" style={{
                  padding: '2rem',
                  background: '#faf8f9',
                  borderRadius: '16px',
                  border: '1px solid #ecdfe2',
                  borderLeft: '5px solid #7e3a41',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(126,58,65,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', color: '#7e3a41' }}>
                    <GraduationCap size={24} />
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Education</h4>
                  </div>
                  <ul style={{ color: '#555', lineHeight: '1.75', paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                    {[
                      'B.Tech in Information Technology — NIT Srinagar',
                      'Resonance Eduventures Limited',
                      'W3webschool',
                    ].map((item, i) => (
                      <li key={i} style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.92rem' }}>
                        <span style={{ color: '#7e3a41', fontWeight: 'bold', flexShrink: 0 }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlight 2: Security Achievement */}
                <div className="highlight-card" style={{
                  padding: '2rem',
                  background: '#faf8f9',
                  borderRadius: '16px',
                  border: '1px solid #ecdfe2',
                  borderLeft: '5px solid #7e3a41',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(126,58,65,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', color: '#7e3a41' }}>
                    <Bug size={24} />
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Security Recognition</h4>
                  </div>
                  <ul style={{ color: '#555', lineHeight: '1.75', paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                    {[
                      'Identified a critical bug in the MobiKwik digital payment app',
                      'Earned ₹1 lakh under MobiKwik’s Responsible Disclosure Program',
                      'Received a certificate of appreciation from MobiKwik',
                    ].map((item, i) => (
                      <li key={i} style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.92rem' }}>
                        <span style={{ color: '#7e3a41', fontWeight: 'bold', flexShrink: 0 }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlight 3: Leadership */}
                <div className="highlight-card" style={{
                  padding: '2rem',
                  background: '#faf8f9',
                  borderRadius: '16px',
                  border: '1px solid #ecdfe2',
                  borderLeft: '5px solid #7e3a41',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(126,58,65,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', color: '#7e3a41' }}>
                    <Briefcase size={24} />
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Leadership at Zetawa Dark</h4>
                  </div>
                  <ul style={{ color: '#555', lineHeight: '1.75', paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                    {[
                      'Strategic planning and business development',
                      'Executive team leadership and mentoring',
                      'Corporate governance and stakeholder management',
                    ].map((item, i) => (
                      <li key={i} style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.92rem' }}>
                        <span style={{ color: '#7e3a41', fontWeight: 'bold', flexShrink: 0 }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── 4. Bottom CTA ──────────── */}
        <section style={{
          padding: '0 0 5rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
            borderRadius: '24px',
            padding: '3.5rem 2.5rem',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 16px 40px rgba(126, 58, 65, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              Partner with Zetawa Dark Today
            </h2>
            <p style={{ fontSize: '1.15rem', opacity: 0.92, maxWidth: '640px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
              Let&apos;s collaborate to design, develop, and scale intelligent software solutions that elevate your business.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/hireforms"
                style={{
                  backgroundColor: 'white',
                  color: '#7e3a41',
                  padding: '1rem 2.25rem',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  transition: 'transform 0.2s ease'
                }}
              >
                Start a Project Consultation <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Explore Services <Code2 size={18} />
              </Link>
            </div>
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
