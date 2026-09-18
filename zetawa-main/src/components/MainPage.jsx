import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, Briefcase, Calendar, Bell, ArrowRight } from 'lucide-react';
// import img1 from '../assets/vite.png';
import Nav from './Nav';
import Footer from './Footer';
// import Hireforms from './Hireforms';

const MainPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const services = [
    {
      title: "Design",
      description: "Our web design team has ample years of experience in the core areas of design to build a website that you need.",
      icon: "🎨"
    },
    {
      title: "Development",
      description: "Looking out for customized solutions for your websites? Our team will develop and deliver a website that'll serve your purpose.",
      icon: "💻"
    },
    {
      title: "Marketing",
      description: "With researched digital marketing, we will ensure that new customers and clients are able to find your business",
      icon: "📈"
    }
  ];

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#304356ff',
      minHeight: '100vh'
    }}>
      <style jsx>{`
        :root {
          --primary-red: #7e3a41ff;
          --primary-red-hover: #884a51ff;
          --dark-bg: #304356ff;
          --dark-card: #2d2d2d;
          --dark-border: #404040;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .menu-item {
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-overlay.active .menu-item {
          transform: translateY(0);
          opacity: 1;
        }

        .menu-overlay.active .menu-item:nth-child(1) { transition-delay: 0.1s; }
        .menu-overlay.active .menu-item:nth-child(2) { transition-delay: 0.15s; }
        .menu-overlay.active .menu-item:nth-child(3) { transition-delay: 0.2s; }
        .menu-overlay.active .menu-item:nth-child(4) { transition-delay: 0.25s; }
        .menu-overlay.active .menu-item:nth-child(5) { transition-delay: 0.3s; }
        .menu-overlay.active .menu-item:nth-child(6) { transition-delay: 0.35s; }

        .triangle-shape {
          position: absolute;
          top: 20%;
          right: 10%;
          width: 0;
          height: 0;
          border-left: 120px solid transparent;
          border-right: 120px solid transparent;
          border-bottom: 200px solid rgba(255, 255, 255, 0.1);
          transform: rotate(-15deg);
          animation: float 8s ease-in-out infinite;
        }

        .triangle-shape-2 {
          position: absolute;
          bottom: 30%;
          left: 8%;
          width: 0;
          height: 0;
          border-left: 80px solid transparent;
          border-right: 80px solid transparent;
          border-bottom: 140px solid rgba(255, 255, 255, 0.05);
          transform: rotate(25deg);
          animation: float 10s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-15deg); }
          50% { transform: translateY(-20px) rotate(-15deg); }
        }
      `}</style>

      {/* Enhanced Navigation Overlay */}
      <Nav/>

      {/* Hero Section */}
      <header style={{
  backgroundColor: 'var(--primary-red)',
  color: 'white',
  padding: '0 0 4rem 0',   // FIXED → removed top padding
  marginTop: '0',          // FIXED → no extra gap
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden'
}}>
        {/* Triangle decorative elements */}
        <div className="triangle-shape" />
        <div className="triangle-shape-2" />
        

        {/* Hero content */}
        
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <h1 className="hero-title" style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '1rem' }}>
            Welcome to <span style={{color: '#ffebee'}}>ZETAWA DARK</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.1rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            A Social Software Agency That Thrives on Your Success
          </p>
           <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/careers')}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'var(--primary-red)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Learn More
            </button>
            <button 
              style={{
                backgroundColor: 'white',
                color: 'var(--primary-red)',
                border: '2px solid white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/aboutus')}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'White';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'var(--primary-red)';
              }}
            >
              About Us
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              Hire Us For
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Comprehensive solutions for your digital transformation journey. <br />
              <b>Click on the icons below to hire us and make us a part of your journey.</b> 
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem' 
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button
              style={{
                backgroundColor: 'var(--primary-red)',
                color: 'white',
                border: 'none',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/hireforms')}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#c0392b';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'var(--primary-red)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Hire Forms
            </button>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
              Latest Updates
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>
              Stay informed about our latest developments and achievements
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => navigate('/press-release')}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Bell size={20} style={{ color: 'var(--primary-red)', marginRight: '0.5rem' }} />
                <span style={{ color: 'var(--primary-red)', fontWeight: '600' }}>New Release</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
                Company Expansion And Updates
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
                We're excited to announce our expansion into new markets and services.
              </p>
              <div 
                style={{ 
                  color: 'var(--primary-red)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                Read more <ChevronRight size={16} />
              </div>
            </div>

            {/* <div style={{
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => navigate('/events')}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Calendar size={20} style={{ color: 'var(--primary-red)', marginRight: '0.5rem' }} />
                <span style={{ color: 'var(--primary-red)', fontWeight: '600' }}>Upcoming Event</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
                Annual Conference 2025 and other Events
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
                Join us for our annual conference featuring industry leaders and innovation.
              </p>
              <div 
                style={{ 
                  color: 'var(--primary-red)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                Learn more <ChevronRight size={16} />
              </div>
            </div> */}

            <div style={{
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => navigate('/careers')}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Briefcase size={20} style={{ color: 'var(--primary-red)', marginRight: '0.5rem' }} />
                <span style={{ color: 'var(--primary-red)', fontWeight: '600' }}>Career Opportunity</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2d2d2d', marginBottom: '1rem' }}>
                We're Hiring!
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
                Discover exciting career opportunities and join our growing team.
              </p>
              <div 
                style={{ 
                  color: 'var(--primary-red)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                Apply now <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ 
            backgroundColor: 'var(--primary-red)', 
            padding: '4rem 2rem', 
            borderRadius: '20px', 
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9' }}>
              Discover how ZETAWA DARK can help you achieve your goals
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                style={{
                  backgroundColor: 'white',
                  color: 'var(--primary-red)',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/contact')}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Contact Us Today
              </button>
              <button 
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/careers')}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = 'var(--primary-red)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Explore Opportunities
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    
    </div>
  );
};

export default MainPage;