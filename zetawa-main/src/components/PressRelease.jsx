import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  TrendingUp, 
  Globe, 
  Award, 
  Search, 
  X, 
  ExternalLink, 
  BookOpen, 
  ArrowRight, 
  Share2, 
  Check, 
  Newspaper, 
  Mail, 
  Sparkles,
  Filter,
  ChevronRight
} from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const PressRelease = () => {
  const [releases, setReleases] = useState([]);
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Fetch all press releases from backend
  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const res = await fetch('/api/press-releases');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setReleases(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch press releases:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReleases();
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedRelease(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format external URLs safely
  const formatExternalUrl = (url) => {
    if (!url) return '';
    const trimmed = String(url).trim();
    if (!trimmed) return '';
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  // Distinct list of available years
  const availableYears = Array.from(
    new Set(releases.map((r) => (r.year ? r.year.trim() : 'FY2025')).filter(Boolean))
  ).sort().reverse();

  // Distinct list of categories/types
  const availableCategories = Array.from(
    new Set(releases.map((r) => r.type || 'Official Announcement').filter(Boolean))
  );

  // Filtered releases based on year, category, and search query
  const filteredReleases = releases.filter((release) => {
    const relYear = release.year ? release.year.trim() : 'FY2025';
    const relType = release.type || 'Official Announcement';

    const matchesYear = selectedYear === 'ALL' || relYear === selectedYear;
    const matchesCategory = selectedCategory === 'ALL' || relType === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      (release.title && release.title.toLowerCase().includes(query)) ||
      (release.content && release.content.toLowerCase().includes(query)) ||
      (release.source && release.source.toLowerCase().includes(query)) ||
      (relType.toLowerCase().includes(query));

    return matchesYear && matchesCategory && matchesSearch;
  });

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Official Announcement':
        return { bg: 'rgba(126, 58, 65, 0.1)', text: '#7e3a41', border: 'rgba(126, 58, 65, 0.25)' };
      case 'Business Update':
      case 'Company Update':
        return { bg: 'rgba(37, 99, 235, 0.1)', text: '#1d4ed8', border: 'rgba(37, 99, 235, 0.25)' };
      case 'Milestone':
      case 'Project Award':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: '#047857', border: 'rgba(16, 185, 129, 0.25)' };
      case 'Partnership':
        return { bg: 'rgba(217, 119, 6, 0.1)', text: '#b45309', border: 'rgba(217, 119, 6, 0.25)' };
      case 'Industry News':
        return { bg: 'rgba(109, 40, 217, 0.1)', text: '#6d28d9', border: 'rgba(109, 40, 217, 0.25)' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', text: '#475569', border: 'rgba(100, 116, 139, 0.25)' };
    }
  };

  const handleCopyLink = (releaseId) => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(releaseId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const stats = [
    { value: releases.length.toString(), label: "Total Releases", icon: FileText, desc: "Published official records" },
    { value: availableYears.length.toString(), label: "Reporting Years", icon: TrendingUp, desc: "Historical archive" },
    { value: availableCategories.length || "4", label: "Media Categories", icon: Award, desc: "Corporate disclosures" },
    { value: "Verified", label: "Official Sources", icon: Globe, desc: "Authenticated statements" }
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      <Nav />

      {/* Global CSS for Animations and Responsiveness */}
      <style>{`
        :root {
          --primary-red: #7e3a41;
          --primary-red-hover: #6a3139;
          --primary-red-light: rgba(126, 58, 65, 0.08);
        }

        .press-hero-gradient {
          background: linear-gradient(135deg, #7e3a41 0%, #5d272d 100%);
        }

        .pr-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pr-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 35px -8px rgba(126, 58, 65, 0.12), 0 8px 16px -6px rgba(0, 0, 0, 0.04);
          border-color: rgba(126, 58, 65, 0.35) !important;
        }

        .filter-btn {
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          transform: translateY(-1px);
        }

        .read-btn {
          transition: all 0.2s ease;
        }

        .read-btn:hover {
          background-color: var(--primary-red-hover) !important;
          transform: translateY(-1px);
        }

        .source-btn {
          transition: all 0.2s ease;
        }

        .source-btn:hover {
          background-color: #004182 !important;
          transform: translateY(-1px);
        }

        .modal-backdrop {
          animation: fadeIn 0.2s ease-out forwards;
        }

        .modal-panel {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.25rem !important;
          }
          .hero-subtitle {
            font-size: 1.05rem !important;
          }
          .search-filter-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          .pr-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-panel {
            margin: 1rem !important;
            max-height: 90vh !important;
          }
        }
      `}</style>

      {/* Hero Header */}
      <header className="press-hero-gradient" style={{
        color: 'white',
        padding: '5rem 0 4rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle geometric pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.07,
          background: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb / Category indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            color: '#ffdedf',
            padding: '0.45rem 1.1rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            marginBottom: '1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Newspaper size={16} />
            ZETAWA DARK NEWSROOM & MEDIA CENTER
          </div>

          <h1 className="hero-title" style={{
            fontSize: '3.4rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Press Releases & Corporate Announcements
          </h1>

          <p className="hero-subtitle" style={{
            fontSize: '1.25rem',
            maxWidth: '750px',
            opacity: 0.92,
            lineHeight: 1.6,
            fontWeight: 400,
            marginBottom: '2rem'
          }}>
            Official press disclosures, corporate milestones, leadership updates, and strategic technology developments from Zetawa Dark.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('releases-archive');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                backgroundColor: 'white',
                color: '#7e3a41',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fcebee'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
            >
              Browse Announcements <ArrowRight size={16} />
            </button>

            <a
              href="mailto:vansh100101102@gmail.com?subject=Press%20Inquiry%20-%20Zetawa%20Dark"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <Mail size={16} /> Contact Media Desk
            </a>
          </div>
        </div>
      </header>

      {/* Corporate Stats Strip */}
      <section style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '2.5rem 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #edf2f7',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <div style={{
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(126, 58, 65, 0.08)',
                    color: '#7e3a41',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155', marginTop: '0.2rem' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                      {stat.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main id="releases-archive" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 2rem 5rem 2rem' }}>
        
        {/* Search & Filter Toolbar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '1.75rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          marginBottom: '2.5rem'
        }}>
          {/* Top row: Search input & Active count */}
          <div className="search-filter-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}>
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              flex: '1',
              minWidth: '280px'
            }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />
              <input
                type="text"
                placeholder="Search by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 2.6rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  backgroundColor: '#f8fafc',
                  color: '#1e293b',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7e3a41';
                  e.target.style.boxShadow = '0 0 0 3px rgba(126, 58, 65, 0.15)';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                  e.target.style.backgroundColor = '#f8fafc';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results count pill */}
            <div style={{
              fontSize: '0.9rem',
              color: '#64748b',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Showing <strong>{filteredReleases.length}</strong> of {releases.length} announcements</span>
            </div>
          </div>

          {/* Bottom row: Filter Pills */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '1.25rem'
          }}>
            {/* Year Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', minWidth: '85px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> Year:
              </span>
              <button
                className="filter-btn"
                onClick={() => setSelectedYear('ALL')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '30px',
                  border: selectedYear === 'ALL' ? '1px solid #7e3a41' : '1px solid #e2e8f0',
                  backgroundColor: selectedYear === 'ALL' ? '#7e3a41' : '#ffffff',
                  color: selectedYear === 'ALL' ? '#ffffff' : '#475569',
                  fontWeight: selectedYear === 'ALL' ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                All Years ({releases.length})
              </button>
              {availableYears.map((year) => {
                const count = releases.filter((r) => (r.year || 'FY2025') === year).length;
                const isSelected = selectedYear === year;
                return (
                  <button
                    key={year}
                    className="filter-btn"
                    onClick={() => setSelectedYear(year)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '30px',
                      border: isSelected ? '1px solid #7e3a41' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#7e3a41' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {year} ({count})
                  </button>
                );
              })}
            </div>

            {/* Category Filters (if multiple exist) */}
            {availableCategories.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', minWidth: '85px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Filter size={14} /> Category:
                </span>
                <button
                  className="filter-btn"
                  onClick={() => setSelectedCategory('ALL')}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    border: selectedCategory === 'ALL' ? '1px solid #334155' : '1px solid #e2e8f0',
                    backgroundColor: selectedCategory === 'ALL' ? '#334155' : '#ffffff',
                    color: selectedCategory === 'ALL' ? '#ffffff' : '#64748b',
                    fontWeight: selectedCategory === 'ALL' ? 600 : 500,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  All Types
                </button>
                {availableCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      className="filter-btn"
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        border: isSelected ? '1px solid #334155' : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#334155' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#64748b',
                        fontWeight: isSelected ? 600 : 500,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(126, 58, 65, 0.2)',
              borderTopColor: '#7e3a41',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              animation: 'spin 0.8s linear infinite'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <h3 style={{ fontSize: '1.25rem', color: '#334155', fontWeight: 600 }}>Loading announcements...</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Fetching records from the Zetawa Dark Newsroom</p>
          </div>
        ) : filteredReleases.length === 0 ? (
          /* Empty State */
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#94a3b8'
            }}>
              <FileText size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
              No press releases found
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              {searchQuery || selectedYear !== 'ALL' || selectedCategory !== 'ALL'
                ? "No announcements matched your current filter criteria. Try resetting your search or selecting a different year."
                : "There are currently no public press releases uploaded to the system."}
            </p>
            {(searchQuery || selectedYear !== 'ALL' || selectedCategory !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedYear('ALL');
                  setSelectedCategory('ALL');
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  backgroundColor: '#7e3a41',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          /* Announcements Grid */
          <div className="pr-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredReleases.map((release, index) => {
              const typeStyle = getTypeStyle(release.type);
              const hasExternalLink = Boolean(release.linkedinUrl);
              const formattedLink = formatExternalUrl(release.linkedinUrl);

              return (
                <article
                  key={release._id || release.id || index}
                  className="pr-card"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedRelease(release)}
                >
                  {/* Top Color Accent Line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #7e3a41 0%, #a84b55 100%)'
                  }} />

                  <div>
                    {/* Header: Category Badge + Year + Date */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.25rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        backgroundColor: typeStyle.bg,
                        color: typeStyle.text,
                        border: `1px solid ${typeStyle.border}`,
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {release.type || 'Announcement'}
                      </span>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#64748b',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}>
                        <Calendar size={14} />
                        <span>{release.date}</span>
                        {release.year && (
                          <span style={{
                            backgroundColor: '#f1f5f9',
                            color: '#475569',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            {release.year}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Headline */}
                    <h2 style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      lineHeight: 1.35,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {release.title}
                    </h2>

                    {/* Content Excerpt (if provided) */}
                    {release.content ? (
                      <p style={{
                        color: '#475569',
                        fontSize: '0.95rem',
                        lineHeight: 1.65,
                        marginBottom: '1.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {release.content}
                      </p>
                    ) : (
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                        fontStyle: 'italic',
                        marginBottom: '1.5rem'
                      }}>
                        Official release statement. Click to view announcement details.
                      </p>
                    )}
                  </div>

                  {/* Card Bottom / Action Row */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '1.25rem',
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}>
                    {/* Read Full Release Button */}
                    <button
                      className="read-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRelease(release);
                      }}
                      style={{
                        backgroundColor: '#7e3a41',
                        color: 'white',
                        border: 'none',
                        padding: '0.6rem 1.15rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        boxShadow: '0 2px 8px rgba(126, 58, 65, 0.2)'
                      }}
                    >
                      <BookOpen size={15} /> Read Details
                    </button>

                    {/* Source / LinkedIn Link (if available) */}
                    {hasExternalLink && (
                      <a
                        href={formattedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-btn"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          backgroundColor: '#0077b5',
                          color: 'white',
                          textDecoration: 'none',
                          padding: '0.6rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          boxShadow: '0 2px 8px rgba(0, 119, 181, 0.2)'
                        }}
                        title={`Open source on ${release.source || 'Media'}`}
                      >
                        <Globe size={15} />
                        <span>{release.source || 'Source'}</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Media Desk Contact & Resources Strip */}
        <section style={{
          marginTop: '5rem',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '3rem 2.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '280px',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(126, 58, 65, 0.05) 0%, rgba(126, 58, 65, 0.12) 100%)',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#7e3a41',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.75rem'
            }}>
              <Mail size={16} /> Press & Media Relations Desk
            </div>

            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              Have a media inquiry or interview request?
            </h3>

            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Members of the press, industry analysts, and conference organizers are invited to connect directly with the Zetawa Dark communications team for official commentary, executive bios, and brand assets.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="mailto:vansh100101102@gmail.com?subject=Press%20Inquiry%20-%20Zetawa%20Dark"
                style={{
                  backgroundColor: '#7e3a41',
                  color: 'white',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(126, 58, 65, 0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#6a3139'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#7e3a41'; }}
              >
                <Mail size={18} /> Inquire with Communications
              </a>

              <Link
                to="/aboutus"
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  padding: '0.8rem 1.6rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
              >
                About Zetawa Dark <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Full Press Release Reader Modal */}
      {selectedRelease && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedRelease(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem'
          }}
        >
          <div
            className="modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Modal Top Accent Line */}
            <div style={{
              height: '5px',
              background: 'linear-gradient(90deg, #7e3a41 0%, #c2525d 100%)',
              width: '100%'
            }} />

            {/* Modal Header */}
            <div style={{
              padding: '1.75rem 2rem 1.25rem 2rem',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                  <span style={{
                    backgroundColor: getTypeStyle(selectedRelease.type).bg,
                    color: getTypeStyle(selectedRelease.type).text,
                    border: `1px solid ${getTypeStyle(selectedRelease.type).border}`,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {selectedRelease.type || 'Official Announcement'}
                  </span>

                  {selectedRelease.year && (
                    <span style={{
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {selectedRelease.year}
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.85rem' }}>
                    <Calendar size={14} />
                    <span>{selectedRelease.date}</span>
                  </div>
                </div>

                <h2 style={{
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  lineHeight: 1.3,
                  margin: 0
                }}>
                  {selectedRelease.title}
                </h2>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedRelease(null)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#64748b';
                }}
                title="Close (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div style={{
              padding: '2rem',
              overflowY: 'auto',
              flex: 1
            }}>
              {/* Publication metadata notice */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderLeft: '4px solid #7e3a41',
                padding: '0.85rem 1.25rem',
                borderRadius: '0 8px 8px 0',
                marginBottom: '1.75rem',
                fontSize: '0.85rem',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div>
                  <strong>Official Release</strong> • Published on {selectedRelease.date}
                  {selectedRelease.source && ` via ${selectedRelease.source}`}
                </div>
                <button
                  onClick={() => handleCopyLink(selectedRelease._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedId === selectedRelease._id ? '#047857' : '#7e3a41',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedId === selectedRelease._id ? (
                    <>
                      <Check size={14} /> Link Copied
                    </>
                  ) : (
                    <>
                      <Share2 size={14} /> Share
                    </>
                  )}
                </button>
              </div>

              {/* Announcement Body Content */}
              {selectedRelease.content ? (
                <div style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: '#334155',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {selectedRelease.content}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  color: '#64748b'
                }}>
                  <p style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                    No extended text was included with this press announcement. Please refer to the official external link below for full coverage.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1.25rem 2rem',
              borderTop: '1px solid #f1f5f9',
              backgroundColor: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                {selectedRelease.linkedinUrl && (
                  <a
                    href={formatExternalUrl(selectedRelease.linkedinUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: '#0077b5',
                      color: 'white',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 2px 6px rgba(0, 119, 181, 0.25)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#005582'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0077b5'; }}
                  >
                    <Globe size={16} />
                    <span>View Official Source ({selectedRelease.source || 'LinkedIn'})</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedRelease(null)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  padding: '0.65rem 1.4rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                Close Release
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Footer */}
      <Footer />
    </div>
  );
};

export default PressRelease;