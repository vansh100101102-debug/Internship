import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Cpu, 
  Palette, 
  Cloud, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Zap, 
  Server, 
  Database, 
  Terminal, 
  ChevronRight, 
  PhoneCall, 
  FileText,
  Clock,
  Award
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

const ICONS_MAP = {
  Code2,
  Cpu,
  Palette,
  Cloud,
  ShieldCheck,
  Users,
  Server,
  Zap,
  Database,
  Terminal,
  Layers,
  Sparkles
};

const resolveIcon = (icon) => {
  if (!icon) return Code2;
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null)) return icon;
  return ICONS_MAP[icon] || Code2;
};

const DEFAULT_SERVICE_PILLARS = [
  {
    id: 'fullstack',
    category: 'engineering',
    icon: Code2,
    title: 'Custom Full-Stack Web & Mobile Apps',
    tagline: 'High-performance web apps, mobile solutions & scalable microservices.',
    description: 'We build responsive, production-ready web and mobile applications tailored for fast-growing businesses. From rapid MVP launches to multi-tenant architectures, we deliver clean, modular code designed for velocity and effortless scaling.',
    capabilities: [
      'Modern web apps with React, Next.js, and TypeScript',
      'Cross-platform mobile engineering with React Native & Flutter',
      'Robust backend APIs & microservices (Node.js, Python, Go, PostgreSQL)',
      'Real-time data synchronization & event-driven WebSockets',
      'Clean multi-tenant architectures & secure payment integrations'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'React Native', 'PostgreSQL', 'Docker'],
    highlight: 'Fast Turnaround Sprints'
  },
  {
    id: 'ai-agents',
    category: 'intelligence',
    icon: Cpu,
    title: 'AI Engineering, Custom Agents & LLM Pipelines',
    tagline: 'Supercharge workflows with tailored AI models, autonomous agents & smart automation.',
    description: 'Harness state-of-the-art machine learning models and generative AI customized for your specific business data. We engineer autonomous agents, workflow automations, and intelligent retrieval systems (RAG) that eliminate repetitive manual overhead.',
    capabilities: [
      'Custom Retrieval-Augmented Generation (RAG) with vector databases',
      'Autonomous multi-agent workflows for internal process automation',
      'Fine-tuned LLM implementations & prompt engineering optimization',
      'Smart document extraction, semantic search & automated reporting',
      'Secure AI gateways with robust guardrails and API rate limiting'
    ],
    techStack: ['Python', 'OpenAI', 'Gemini API', 'LangChain', 'Pinecone', 'FastAPI', 'Hugging Face'],
    highlight: 'Production-Grade AI'
  },
  {
    id: 'ui-ux',
    category: 'design',
    icon: Palette,
    title: 'Product Strategy & UI/UX Design Systems',
    tagline: 'High-converting, intuitive interfaces crafted with user-centric precision.',
    description: 'Great software starts with exceptional user experience. We conduct user research, map frictionless workflows, and engineer scalable Figma design systems that turn visitors into loyal customers.',
    capabilities: [
      'User journey mapping & high-fidelity interactive wireframing',
      'Scalable Figma design systems with tokenized styles and reusable component libraries',
      'Interactive clickable prototypes for rapid stakeholder and user validation',
      'WCAG 2.1 accessibility compliance audits and responsive remediation',
      'Conversion rate optimization (CRO) and user onboarding telemetry'
    ],
    techStack: ['Figma', 'Design Tokens', 'Storybook', 'Tailwind', 'Accessibility WCAG', 'Protopie'],
    highlight: 'Pixel-Perfect Fidelity'
  },
  {
    id: 'cloud-devops',
    category: 'engineering',
    icon: Cloud,
    title: 'Cloud Infrastructure, DevOps & Reliability',
    tagline: 'Zero-downtime deployments, automated CI/CD pipelines & resilient cloud setups.',
    description: 'Empower your application with modern cloud-native infrastructure that scales effortlessly. We implement automated CI/CD deployment pipelines, containerization, and monitoring that ensure dependable uptime and low operating costs.',
    capabilities: [
      'Cloud setup & cost optimization across AWS, GCP, and DigitalOcean',
      'Docker containerization & Kubernetes cluster orchestration',
      'Automated CI/CD deployment pipelines with automated test gates',
      'Comprehensive log observability, distributed tracing, and real-time alerts',
      'Automated backup disaster recovery and zero-downtime rolling updates'
    ],
    techStack: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Datadog'],
    highlight: 'Zero-Downtime Reliability'
  },
  {
    id: 'security-audit',
    category: 'security',
    icon: ShieldCheck,
    title: 'Cybersecurity, API Integrations & Code Audits',
    tagline: 'Hardened application security, vulnerability testing & secure integrations.',
    description: 'Safeguard your data and customer trust. Our security engineers perform deep code reviews, authentication hardening, and architectural audits to protect against modern attack vectors.',
    capabilities: [
      'OWASP Top 10 vulnerability assessment and code security audits',
      'API security hardening, rate limiting, and JWT/OAuth2 authentication',
      'Data encryption implementation (at rest and in transit)',
      'Security compliance readiness consulting and safe third-party integrations',
      'Actionable vulnerability remediation code reports'
    ],
    techStack: ['OWASP', 'Burp Suite', 'SonarQube', 'JWT / OAuth2', 'Zero-Trust', 'SSL/TLS'],
    highlight: 'Hardened Security'
  },
  {
    id: 'dedicated-teams',
    category: 'advisory',
    icon: Users,
    title: 'Dedicated Tech Squads & Agile Sprints',
    tagline: 'Vetted senior developers and technical leads embedded directly into your project.',
    description: 'Accelerate your product delivery without lengthy hiring cycles. We provide senior, vetted engineering squads that integrate into your agile workflow with weekly sprint demos and full code ownership.',
    capabilities: [
      'Autonomous dedicated engineering squads (frontend, backend, QA, and DevOps)',
      'Fractional CTO leadership, technology roadmap planning, and architecture reviews',
      'Seamless integration into Jira, Slack, and daily agile standups',
      'Transparent sprint velocity tracking with weekly milestone demonstrations',
      '100% full intellectual property and clean repository handover'
    ],
    techStack: ['Agile / Scrum', 'Jira', 'Architecture Reviews', 'Sprint Velocity', 'CI/CD Mentoring'],
    highlight: 'Rapid Squad Ramp-Up'
  }
];

const Services = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [servicePillars, setServicePillars] = useState(DEFAULT_SERVICE_PILLARS);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setServicePillars(data.data);
        }
      })
      .catch(err => console.error('Failed to fetch services:', err));
  }, []);

  const handleGatedAction = (path) => {
    if (isAuth) {
      navigate(path);
    } else {
      setPendingRedirect(path);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingRedirect) {
      navigate(pendingRedirect);
      setPendingRedirect(null);
    }
  };

  const categoryFilters = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'engineering', label: 'Custom Web & Mobile' },
    { id: 'intelligence', label: 'AI & Automations' },
    { id: 'design', label: 'UI/UX & Design' },
    { id: 'security', label: 'Security & Integrations' },
    { id: 'advisory', label: 'Dedicated Squads' },
  ];

  const filteredServices = servicePillars.filter(service => {
    if (activeTab === 'all') return true;
    return service.category === activeTab;
  });

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8f6f7',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      <Nav />
      <AuthModal isOpen={showAuthModal} onClose={() => { setShowAuthModal(false); setPendingRedirect(null); }} onSuccess={handleAuthSuccess} />

      {/* ──────── Header / Hero Banner ──────── */}
      <section style={{
        background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
        color: '#ffffff',
        padding: '5rem 1.5rem 4.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%'
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
            marginBottom: '1.5rem',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={16} /> END-TO-END TECH &amp; AI CAPABILITIES
          </div>

          <h1 style={{
            fontSize: '3.4rem',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Engineering Services Built for <br />
            <span style={{ color: '#ffebee' }}>Velocity, Quality &amp; Scale</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            opacity: 0.94,
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            We partner with ambitious startups and mid-market companies to build full-stack web and mobile applications, deploy custom AI workflows, craft beautiful design systems, and manage dependable cloud infrastructure.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleGatedAction('/hireforms')}
              style={{
                backgroundColor: '#ffffff',
                color: '#7e3a41',
                padding: '0.95rem 2.25rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
            >
              Start a Project Sprint <ArrowRight size={18} />
            </button>
            <a
              href="#service-catalog"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                padding: '0.95rem 2rem',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
            >
              Browse Disciplines <Layers size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ──────── Category Navigation Tabs ──────── */}
      <section id="service-catalog" style={{
        position: 'sticky',
        top: '60px',
        zIndex: 90,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e8e0e2',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        padding: '0.85rem 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.2rem',
          scrollbarWidth: 'none'
        }}>
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveTab(filter.id)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '50px',
                border: activeTab === filter.id ? '1.5px solid #7e3a41' : '1px solid #e2e8f0',
                backgroundColor: activeTab === filter.id ? '#7e3a41' : '#f8fafc',
                color: activeTab === filter.id ? '#ffffff' : '#475569',
                fontSize: '0.88rem',
                fontWeight: activeTab === filter.id ? 700 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* ──────── Services Detailed Grid ──────── */}
      <section style={{ padding: '4.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {filteredServices.map((service, index) => {
            const Icon = resolveIcon(service.icon);
            return (
              <div
                key={service._id || service.id || index}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  border: '1px solid #e8e0e2',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(126,58,65,0.09)';
                  e.currentTarget.style.borderColor = 'rgba(126, 58, 65, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = '#e8e0e2';
                }}
              >
                <div>
                  {/* Top Header Card */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(126, 58, 65, 0.08)',
                      color: '#7e3a41',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={28} />
                    </div>
                    {service.highlight && (
                      <span style={{
                        backgroundColor: '#fbf4f5',
                        color: '#7e3a41',
                        border: '1px solid #ecd8db',
                        padding: '0.3rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {service.highlight}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                    {service.title}
                  </h3>
                  <p style={{ color: '#7e3a41', fontSize: '0.92rem', fontWeight: 600, marginBottom: '1rem' }}>
                    {service.tagline}
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {service.description}
                  </p>

                  {/* Capabilities List */}
                  <div style={{ marginBottom: '1.75rem' }}>
                    <h4 style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.85rem'
                    }}>
                      Key Deliverables &amp; Outcomes
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {(service.capabilities || []).map((cap, cIdx) => (
                        <li key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: '#334155' }}>
                          <CheckCircle2 size={16} style={{ color: '#7e3a41', flexShrink: 0, marginTop: '2px' }} />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  {Array.isArray(service.techStack) && service.techStack.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '0.65rem'
                      }}>
                        Tech Ecosystem
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {service.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#475569',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 600
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom CTA */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handleGatedAction('/hireforms')}
                    style={{
                      backgroundColor: '#7e3a41',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.75rem 1.4rem',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'background 0.2s ease',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#60292f'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#7e3a41'; }}
                  >
                    Request Project Sprint for {service.title.split(' ')[0]} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────── Bottom Project Callout ──────── */}
      <section style={{
        padding: '5rem 1.5rem',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e8e0e2'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
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
            Ready to Build Your Next Product?
          </h2>
          <p style={{ fontSize: '1.15rem', opacity: 0.92, maxWidth: '640px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
            Share your requirements, select your preferred budget and timeline, and our senior engineers will deliver a comprehensive scope breakdown within 24 hours.
          </p>
          <button
            onClick={() => handleGatedAction('/hireforms')}
            style={{
              backgroundColor: 'white',
              color: '#7e3a41',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.05rem',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Launch Project Scope Configurator <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
