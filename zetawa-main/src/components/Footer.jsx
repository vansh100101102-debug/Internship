import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Linkedin, MapPin, Send, Heart, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
function Footer() {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false
  });
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth <= 1024
      });
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animation on mount
    setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isMobile, isTablet } = screenSize;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const iconMap = {
    LinkedIn: <Linkedin size={isMobile ? 18 : 22} />,
    Instagram: <Instagram size={isMobile ? 18 : 22} />,
    Phone: <Phone size={isMobile ? 18 : 22} />,
    Email: <Mail size={isMobile ? 18 : 22} />
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/107492000/admin/dashboard/',
      color: '#0077B5',
      hoverColor: '#005885'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/zetawadark?igsh=NXQ0dTdram83ejQx',
      color: '#E4405F',
      hoverColor: '#C13584'
    },
    {
      name: 'Phone',
      url: 'tel:7004265718',
      color: '#34A853',
      hoverColor: '#2d8a47'
    },
    {
      name: 'Email',
      url: 'mailto:director@zetawa.com',
      color: '#EA4335',
      hoverColor: '#c5362d'
    }
  ];

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/aboutus' },
  { name: 'Services', path: '/services' },
  { name: 'Careers', path: '/careers' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Press Releases', path: '/press-release' },
];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

      
        .social-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .social-icon:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .quick-link {
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .quick-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #9d4e55, #c85a5f);
          transition: width 0.3s ease;
        }

        .quick-link:hover {
          color: #c85a5f;
          transform: translateX(5px);
        }

        .quick-link:hover::after {
          width: 100%;
        }

        .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9d4e55, #c85a5f);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 20px rgba(157, 78, 85, 0.4);
          transition: all 0.3s ease;
          z-index: 1000;
          animation: float 3s ease-in-out infinite;
        }

        .scroll-top-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(157, 78, 85, 0.6);
        }

        .gradient-text {
          background: linear-gradient(90deg, #9d4e55, #c85a5f, #d67074);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient 3s ease infinite;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          margin: 2rem 0;
        }



        @media (max-width: 768px) {
          .scroll-top-btn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
          }
          
          .footer-card {
            padding: 1.5rem;
          }
        }
      `}</style>

     

      {/* Main Footer */}
      <div className="footer-animated" style={{ 
        background: 'linear-gradient(180deg, #2a2a2aff 30%, #1a1a1a 100%)',
        color: 'white', 
        padding: isMobile ? '2rem 0' : '4rem 0 2rem 0',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          
          {/* Top Section */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            
            {/* Company Info */}
            <div className="footer-section-left footer-card">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #9d4e55, #c85a5f)',
                  marginRight: '1rem',
                  boxShadow: '0 5px 15px rgba(157, 78, 85, 0.3)'
                }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Z</span>
                </div>
                <div>
                  <div className="gradient-text" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ZETAWA DARK
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#adb5bd' }}>
                    PRIVATE LIMITED
                  </div>
                </div>
              </div>
              <p style={{ color: '#adb5bd', lineHeight: '1.6', fontSize: '0.95rem' }}>
                We design, build, and market intelligent software solutions and websites to help your business grow and thrive in the digital age.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-section-right">
              <h3 style={{ 
                fontSize: '1.2rem', 
                marginBottom: '1.5rem',
                color: 'white',
                fontWeight: '600'
              }}>
                Quick Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
                {quickLinks.map(link => (
                  <Link 
                  key={link.name} 
                  to={link.path}
                  className="quick-link"
                    style={{
                      color: '#adb5bd',
                      textDecoration: 'none',
                      fontSize: '0.95rem'
                    }}>
                    {link.name}
                  </Link>
                ))}

              </div>
            </div>

            {/* Contact & Social */}
            <div className="footer-section-right">
              <h3 style={{ 
                fontSize: '1.2rem', 
                marginBottom: '1.5rem',
                color: 'white',
                fontWeight: '600'
              }}>
                Connect With Us
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-icon"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${social.color}, ${social.hoverColor})`,
                      color: 'white',
                      textDecoration: 'none',
                      boxShadow: `0 4px 15px ${social.color}40`
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconMap[social.name]}
                  </a>
                ))}
              </div>
              <div style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <Phone size={16} style={{ display: 'inline', marginRight: '8px' }} />
                  7004265718
                </div>
                <div>
                  <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
                  director@zetawa.com
                </div>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Bottom Section */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{ fontSize: '0.9rem', color: '#adb5bd' }}>
              © 2025 ZETAWA DARK PRIVATE LIMITED. All rights reserved.
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
              Equal opportunity employer committed to diversity and inclusion.
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}

export default Footer;