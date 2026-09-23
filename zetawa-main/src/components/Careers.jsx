import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  ArrowRight, 
  Mail, 
  Phone, 
  Briefcase, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Palette, 
  Cloud, 
  ShieldCheck, 
  ExternalLink,
  Zap,
  GraduationCap
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

const DEFAULT_APPLY_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSfzUllRkATkN6e9uRR25Fa2JoUgkcorcGOAJYzTtzMNOpYv7g/viewform';

const DEFAULT_JOB_OPENINGS = [
  {
    _id: "job-1",
    title: "Full-Stack Software Engineer (React / Node.js)",
    department: "Engineering",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Design and build responsive web applications, robust REST/GraphQL APIs, and scalable distributed backends. Collaborate directly with senior leads in agile 2-week sprints.",
    requirements: [
      "Proficiency in JavaScript/TypeScript, React or Next.js, and Node.js",
      "Understanding of relational databases (PostgreSQL/MySQL) or MongoDB",
      "Experience with Git version control and modern web architectures",
      "Passionate about clean code, test coverage, and product velocity"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    _id: "job-2",
    title: "AI & Machine Learning Engineer",
    department: "AI & Intelligence",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Develop custom LLM agents, vector RAG pipelines, and intelligent workflow automations using modern Python frameworks and API integrations.",
    requirements: [
      "Strong Python programming skills and familiarity with FastAPI",
      "Experience with OpenAI APIs, LangChain, or Hugging Face models",
      "Understanding of vector databases (Pinecone, Chroma, pgvector)",
      "Curiosity for autonomous agent workflows and prompt engineering"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    _id: "job-3",
    title: "UI/UX Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Craft pixel-perfect user interfaces, interactive Figma prototypes, and comprehensive design systems that deliver frictionless user experiences.",
    requirements: [
      "Expertise in Figma, wireframing, and interactive prototyping",
      "Strong understanding of visual hierarchy, typography, and design tokens",
      "Knowledge of responsive design and WCAG accessibility standards",
      "Portfolio showcasing web or mobile product design projects"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    _id: "job-4",
    title: "Mobile App Developer (React Native / Flutter)",
    department: "Engineering",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Build fluid, cross-platform mobile apps for iOS and Android with smooth animations, offline capabilities, and seamless API integrations.",
    requirements: [
      "Hands-on experience with React Native or Flutter",
      "Familiarity with native device APIs, state management, and push notifications",
      "Understanding of app store deployment guidelines (Play Store & App Store)",
      "Strong problem-solving and debugging skills"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    _id: "job-5",
    title: "Cloud DevOps & Infrastructure Engineer",
    department: "Cloud & DevOps",
    location: "Remote",
    type: "Full-time / Intern",
    experience: "Freshers / 0-2 Years",
    description: "Maintain cloud environments, build automated CI/CD pipelines, containerize applications with Docker, and ensure 99.9% uptime reliability.",
    requirements: [
      "Familiarity with Linux environments, Docker, and CI/CD tools (GitHub Actions)",
      "Basic knowledge of cloud providers (AWS, GCP, or DigitalOcean)",
      "Understanding of networking, SSL/TLS, and security best practices",
      "Interest in infrastructure-as-code and automated deployment scaling"
    ],
    applyLink: DEFAULT_APPLY_LINK
  },
  {
    _id: "job-6",
    title: "Zetawa Fellowship & Software Intern",
    department: "Internships & Fellowship",
    location: "Remote",
    type: "Internship (3-6 Months)",
    experience: "Students / Freshers",
    description: "Intensive hands-on engineering fellowship program where you build live production features under dedicated mentorship with verified certificate of excellence.",
    requirements: [
      "Enthusiastic computer science or engineering student / recent graduate",
      "Foundational coding knowledge in JavaScript, Python, or Web Tech",
      "Eagerness to learn agile team ceremonies and production workflows",
      "Opportunity for full-time pre-placement offers (PPO) upon completion"
    ],
    applyLink: DEFAULT_APPLY_LINK
  }
];

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState(null);
  
  const { isAuth } = useAppContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingApplyLink, setPendingApplyLink] = useState(null);

  const formatUrl = (url) => {
    if (!url) return DEFAULT_APPLY_LINK;
    const trimmed = String(url).trim();
    if (!trimmed) return DEFAULT_APPLY_LINK;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const handleApplyClick = (link) => {
    const targetLink = formatUrl(link);
    if (isAuth) {
      window.open(targetLink, '_blank', 'noopener,noreferrer');
    } else {
      setPendingApplyLink(targetLink);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    const targetLink = formatUrl(pendingApplyLink);
    window.open(targetLink, '_blank', 'noopener,noreferrer');
    setPendingApplyLink(null);
  };

  useEffect(() => {
    fetch('/api/careers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setJobs(data.data);
        } else {
          setJobs(DEFAULT_JOB_OPENINGS);
        }
      })
      .catch(err => {
        console.error('Failed to fetch careers:', err);
        setJobs(DEFAULT_JOB_OPENINGS);
      })
      .finally(() => setLoading(false));
  }, []);

  const departments = [
    { id: 'all', label: 'All Openings' },
    { id: 'Engineering', label: 'Engineering' },
    { id: 'AI & Intelligence', label: 'AI & Intelligence' },
    { id: 'Design', label: 'Design & UI/UX' },
    { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
    { id: 'Internships & Fellowship', label: 'Fellowships & Interns' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDept = activeCategory === 'all' || 
      (job.department && job.department.toLowerCase().includes(activeCategory.toLowerCase()));
    
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesDept;
    
    const matchesSearch = 
      (job.title && job.title.toLowerCase().includes(q)) ||
      (job.department && job.department.toLowerCase().includes(q)) ||
      (job.description && job.description.toLowerCase().includes(q)) ||
      (job.location && job.location.toLowerCase().includes(q)) ||
      (Array.isArray(job.requirements) && job.requirements.some(r => r.toLowerCase().includes(q)));
      
    return matchesDept && matchesSearch;
  });

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8f6f7',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      <Nav />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => { setShowAuthModal(false); setPendingApplyLink(null); }} 
        onSuccess={handleAuthSuccess} 
      />

      {/* ──────── Hero Header ──────── */}
      <section style={{
        background: 'linear-gradient(135deg, #7e3a41 0%, #522026 100%)',
        color: 'white',
        padding: '5rem 1.5rem 4.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow ambient background */}
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
            <Sparkles size={16} /> WORK WITH PURPOSE AT ZETAWA DARK
          </div>

          <h1 style={{
            fontSize: '3.4rem',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Build Exceptional Software. <br />
            <span style={{ color: '#ffebee' }}>Grow Without Limits.</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            opacity: 0.94,
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            We are an ambitious team of engineers, designers, and AI specialists building production systems and next-gen tools for fast-growing companies. Join us to ship high-impact code.
          </p>

          {/* Quick Perks Strip */}
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
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>100% Remote</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Async &amp; Flexible</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Fast Sprints</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>2-Week Iterations</div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Real Ownership</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Direct Production Code</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── Open Positions Explorer ──────── */}
      <section style={{ padding: '4.5rem 1.5rem', maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Section Title & Search */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
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
              marginBottom: '0.6rem',
              textTransform: 'uppercase'
            }}>
              <Briefcase size={14} /> CURRENT OPPORTUNITIES
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2d2d2d', margin: 0 }}>
              Open Roles &amp; Fellowships
            </h2>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
            <input
              type="text"
              placeholder="Search by role title or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.4rem',
                borderRadius: '12px',
                border: '1px solid #ddd',
                fontSize: '0.92rem',
                outline: 'none',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => setActiveCategory(dept.id)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '50px',
                border: activeCategory === dept.id ? '1.5px solid #7e3a41' : '1px solid #e2e8f0',
                backgroundColor: activeCategory === dept.id ? '#7e3a41' : '#ffffff',
                color: activeCategory === dept.id ? 'white' : '#475569',
                fontSize: '0.88rem',
                fontWeight: activeCategory === dept.id ? 700 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeCategory === dept.id ? '0 4px 12px rgba(126,58,65,0.2)' : 'none'
              }}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid #eee' }}>
            <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '3px solid #f3e8e9', borderTop: '3px solid #7e3a41', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#777', marginTop: '1rem', fontWeight: 600 }}>Loading active positions...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px dashed #d5c8ca'
          }}>
            <Briefcase size={48} color="#b0a0a2" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2d2d2d', marginBottom: '0.5rem' }}>
              No Openings Found
            </h3>
            <p style={{ color: '#666', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto 1.5rem' }}>
              We don&apos;t currently have an open position matching your exact filter, but we are always eager to meet talented developers and creators.
            </p>
            <a
              href="mailto:director@zetawa.com?subject=General%20Application%20-%20Zetawa%20Dark"
              style={{
                backgroundColor: '#7e3a41',
                color: 'white',
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Mail size={16} /> Send General Application
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
            {filteredJobs.map((job) => {
              const isExpanded = expandedJobId === job._id;
              const requirements = Array.isArray(job.requirements) ? job.requirements : [];

              return (
                <div
                  key={job._id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #e8e0e2',
                    padding: '2.25rem',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(126,58,65,0.09)';
                    e.currentTarget.style.borderColor = 'rgba(126, 58, 65, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.03)';
                    e.currentTarget.style.borderColor = '#e8e0e2';
                  }}
                >
                  <div>
                    {/* Top Tag Badges */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <span style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: '#f1eaeb',
                        color: '#7e3a41',
                        border: '1px solid #ecd8db'
                      }}>
                        {job.department || 'Engineering'}
                      </span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: '#f8fafc',
                          color: '#475569',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <MapPin size={12} /> {job.location || 'Remote'}
                        </span>
                        <span style={{
                          padding: '0.3rem 0.65rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: '#f8fafc',
                          color: '#475569',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Clock size={12} /> {job.type || 'Full-time'}
                        </span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#2d2d2d', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                      {job.title}
                    </h3>

                    {job.experience && (
                      <p style={{ color: '#7e3a41', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                        Experience: {job.experience}
                      </p>
                    )}

                    <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {job.description}
                    </p>

                    {/* Requirements / Key Points */}
                    {requirements.length > 0 && (
                      <div style={{ marginBottom: '1.5rem', backgroundColor: '#faf8f9', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #f0e6e8' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7e3a41', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.5px' }}>
                          Key Qualifications:
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          {requirements.map((req, rIdx) => (
                            <li key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.86rem', color: '#334155' }}>
                              <CheckCircle2 size={15} style={{ color: '#7e3a41', flexShrink: 0, marginTop: '2px' }} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Apply Button */}
                  <div style={{ borderTop: '1px solid #f3ecee', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => handleApplyClick(job.applyLink)}
                      style={{
                        width: '100%',
                        backgroundColor: '#7e3a41',
                        color: 'white',
                        border: 'none',
                        padding: '0.85rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'background 0.2s ease',
                        boxShadow: '0 4px 12px rgba(126,58,65,0.2)'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#60292f'; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#7e3a41'; }}
                    >
                      Apply for this Position <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──────── Engineering Culture & Pillars ──────── */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#ffffff', borderTop: '1px solid #e8e0e2', borderBottom: '1px solid #e8e0e2' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              <Users size={14} /> LIFE AT ZETAWA DARK
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d2d2d', margin: 0 }}>
              Why Build Your Career With Us?
            </h2>
            <p style={{ color: '#666', fontSize: '1.05rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              We combine startup agility with serious engineering standards, giving you high ownership and rapid skill acceleration.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <Zap size={28} />,
                title: "High-Velocity Sprints",
                desc: "Ship production features every 2 weeks. No endless committee meetings or bureaucracy — just clean code, rapid feedback, and real impact."
              },
              {
                icon: <Code2 size={28} />,
                title: "Production-Level Ownership",
                desc: "Work directly on real-world web apps, AI pipelines, and mobile architectures that serve live commercial clients globally."
              },
              {
                icon: <GraduationCap size={28} />,
                title: "Senior Pair-Programming Mentorship",
                desc: "Direct guidance and code reviews from senior engineers to help you master system architecture, testing, and modern frameworks."
              },
              {
                icon: <Cloud size={28} />,
                title: "Async & Remote-First Flexibility",
                desc: "We focus on output, clarity of thought, and high-standard results rather than tracking hours in a traditional cubicle."
              }
            ].map((perk, pIdx) => (
              <div
                key={pIdx}
                style={{
                  backgroundColor: '#faf8f9',
                  borderRadius: '20px',
                  padding: '2.25rem 2rem',
                  border: '1px solid #ecdfe2',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(126,58,65,0.08)';
                  e.currentTarget.style.borderColor = '#7e3a41';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = '#ecdfe2';
                  e.currentTarget.style.backgroundColor = '#faf8f9';
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(126, 58, 65, 0.1)',
                  color: '#7e3a41',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  {perk.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2d2d2d', marginBottom: '0.65rem' }}>
                  {perk.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── Direct Resume Drop Banner ──────── */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
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
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            Don&apos;t See Your Exact Role?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.92, maxWidth: '640px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
            We are always looking for exceptional software engineers, designers, and AI creators. Send your resume, GitHub profile, and portfolio directly to our leadership team.
          </p>
          <a
            href="mailto:director@zetawa.com?subject=Direct%20Career%20Inquiry%20-%20Zetawa%20Dark"
            style={{
              backgroundColor: 'white',
              color: '#7e3a41',
              padding: '1rem 2.5rem',
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
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Mail size={18} /> Email Resume to director@zetawa.com
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
