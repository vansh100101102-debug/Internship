import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn, LogOut, User, Shield, Briefcase, FileText, Sparkles } from 'lucide-react';
import img1 from '../assets/vite.png';
import { useAppContext } from '../context/AppContext';
import AuthModal from './AuthModal';

function ZetawaNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user, isAdmin, logout } = useAppContext();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Services', path: '/services' },
    { name: 'Press Releases', path: '/press-release' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Careers', path: '/careers' },
  ];

  const handleLogout = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowDropdown(false);
    handleMenuClose();
    try {
      await logout();
    } catch (err) {
      console.error("Logout error", err);
    }
    navigate('/');
  };

  const handleNavClick = (item) => {
    navigate(item.path);
    handleMenuClose();
  };

  const handleMenuOpen = () => {
    setIsMenuAnimating(true);
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setIsMenuAnimating(false), 300);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) handleMenuClose();
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const userFirstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(126, 58, 65, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-header.scrolled {
          padding: 0.45rem 0;
          background: rgba(110, 48, 55, 0.97);
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .nav-brand:hover {
          transform: translateY(-1px);
        }

        .logo-container {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          padding: 4px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .nav-header.scrolled .logo-container {
          width: 30px;
          height: 30px;
        }

        .logo-container:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
        }

        .logo-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .brand-name {
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .nav-header.scrolled .brand-name {
          font-size: 1rem;
        }

        .nav-links {
          display: none;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.88);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.45rem 0.95rem;
          border-radius: 20px;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.15);
        }

        .nav-link.active {
          color: white;
          background: rgba(255, 255, 255, 0.22);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .nav-auth-btn {
          background: rgba(255,255,255,0.18);
          border: 1.5px solid rgba(255,255,255,0.45);
          color: white;
          padding: 0.45rem 1.25rem;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.25s ease;
          font-family: inherit;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

        .nav-auth-btn:hover {
          background: white;
          color: #7e3a41;
          border-color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(255,255,255,0.3);
        }

        .nav-user-btn {
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.35);
          color: white;
          padding: 0.35rem 0.85rem 0.35rem 0.35rem;
          border-radius: 50px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          transition: all 0.25s ease;
          font-family: inherit;
          position: relative;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

        .nav-user-btn:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.6);
        }

        .nav-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #fff 0%, #f0e0e3 100%);
          color: #7e3a41;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          fontSize: 0.85rem;
          flex-shrink: 0;
        }

        .nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.06);
          min-width: 220px;
          padding: 0.5rem 0;
          z-index: 1100;
          animation: dropdownSlideIn 0.2s ease;
          border: 1px solid rgba(126, 58, 65, 0.12);
        }

        @keyframes dropdownSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          color: #444;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          font-family: inherit;
          text-align: left;
        }

        .dropdown-item:hover {
          background: rgba(126,58,65,0.08);
          color: #7e3a41;
        }

        .dropdown-divider {
          height: 1px;
          background: #f0e6e8;
          margin: 0.4rem 0;
        }

        .dropdown-item.danger {
          color: #c0392b;
        }

        .dropdown-item.danger:hover {
          background: rgba(192,57,43,0.08);
        }

        .menu-button {
          background: rgba(255, 255, 255, 0.15);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          color: white;
          padding: 8px 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-button:hover {
          background: white;
          color: #7e3a41;
          transform: translateY(-1px);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .close-button {
          position: fixed;
          top: 1.75rem;
          right: 1.75rem;
          background: rgba(126, 58, 65, 0.08);
          border: 1.5px solid #7e3a41;
          color: #7e3a41;
          padding: 12px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2001;
        }

        .close-button:hover {
          background: #7e3a41;
          color: white;
          transform: rotate(90deg) scale(1.05);
        }

        .menu-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2rem;
          width: 100%;
          max-width: 480px;
        }

        .menu-item {
          width: 100%;
          padding: 1.1rem 1.75rem;
          color: #7e3a41;
          cursor: pointer;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          font-weight: 700;
          transition: all 0.3s ease;
          background: rgba(126, 58, 65, 0.05);
          border: 1.5px solid rgba(126, 58, 65, 0.12);
        }

        .menu-item:hover {
          background: rgba(126, 58, 65, 0.12);
          border-color: rgba(126, 58, 65, 0.3);
          transform: translateY(-2px);
        }

        /* Desktop Navigation */
        @media (min-width: 1024px) {
          .nav-links {
            display: flex;
          }

          .menu-button {
            display: none;
          }
        }

        @media (max-width: 1023px) {
          .nav-container {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .nav-container {
            padding: 0 1.25rem;
          }
        }
      `}</style>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Mobile Menu Overlay */}
      {(isMenuOpen || isMenuAnimating) && (
        <div
          className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={handleMenuClose}
        >
          <button
            className="close-button"
            onClick={handleMenuClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>

          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="menu-item"
                onClick={() => handleNavClick(item)}
              >
                <span>{item.name}</span>
              </div>
            ))}

            {/* Admin Portal in mobile menu - only for admins */}
            {isAdmin && (
              <div
                className="menu-item"
                onClick={() => { navigate('/admin'); handleMenuClose(); }}
              >
                <Shield size={20} strokeWidth={2.5} />
                <span>Admin Command Center</span>
              </div>
            )}

            {/* Auth items in mobile menu */}
            {isAuth && (
              <>
                <div
                  className="menu-item"
                  onClick={() => { navigate('/profile'); handleMenuClose(); }}
                >
                  <User size={20} strokeWidth={2.5} />
                  <span>My Project Portal</span>
                </div>
                <div
                  className="menu-item"
                  onClick={() => { navigate('/hireforms'); handleMenuClose(); }}
                >
                  <FileText size={20} strokeWidth={2.5} />
                  <span>Hire Us / Start Project</span>
                </div>
              </>
            )}

            {/* Logout / Login in mobile menu */}
            {isAuth ? (
              <div
                className="menu-item"
                onClick={handleLogout}
                style={{ color: '#c0392b', borderColor: 'rgba(192,57,43,0.2)', background: 'rgba(192,57,43,0.06)' }}
              >
                <LogOut size={20} strokeWidth={2.5} />
                <span>Logout ({userFirstName})</span>
              </div>
            ) : (
              <div
                className="menu-item"
                onClick={() => { setShowAuthModal(true); handleMenuClose(); }}
                style={{ background: 'linear-gradient(135deg, #7e3a41 0%, #60292f 100%)', color: 'white', borderColor: 'transparent' }}
              >
                <LogIn size={20} strokeWidth={2.5} />
                <span>Login / Sign Up</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <header className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => navigate('/')}>
            <div className="logo-container">
              <img src={img1} alt="Zetawa Logo" className="logo-img" />
            </div>
            <span className="brand-name">ZETAWA DARK</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Auth section on desktop */}
            {isAuth ? (
              <div ref={dropdownRef} style={{ position: 'relative', marginLeft: '0.5rem' }}>
                <button
                  className="nav-user-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="nav-avatar">{userInitial}</div>
                  <span>{userFirstName}</span>
                  <ChevronDown size={14} style={{
                    transition: 'transform 0.2s ease',
                    transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)',
                  }} />
                </button>

                {showDropdown && (
                  <div className="nav-dropdown" onMouseDown={(e) => e.stopPropagation()}>
                    <button type="button" className="dropdown-item" onClick={() => { navigate('/profile'); setShowDropdown(false); }}>
                      <User size={16} />
                      My Project Portal
                    </button>
                    <button type="button" className="dropdown-item" onClick={() => { navigate('/hireforms'); setShowDropdown(false); }}>
                      <FileText size={16} />
                      Hire Us / Start Project
                    </button>
                    <button type="button" className="dropdown-item" onClick={() => { navigate('/careers'); setShowDropdown(false); }}>
                      <Briefcase size={16} />
                      Job Openings
                    </button>
                    {isAdmin && (
                      <>
                        <div className="dropdown-divider" />
                        <button type="button" className="dropdown-item" onClick={() => { navigate('/admin'); setShowDropdown(false); }}>
                          <Shield size={16} />
                          Admin Command Center
                        </button>
                      </>
                    )}
                    <div className="dropdown-divider" />
                    <button type="button" className="dropdown-item danger" onClick={handleLogout}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="nav-auth-btn"
                onClick={() => setShowAuthModal(true)}
                style={{ marginLeft: '0.5rem' }}
              >
                <LogIn size={15} />
                Client Login
              </button>
            )}
          </nav>

          {/* Mobile: Auth + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <style>{`
              .mobile-auth-area { display: flex; align-items: center; gap: 0.5rem; }
              @media (min-width: 1024px) { .mobile-auth-area { display: none; } }
            `}</style>
            <div className="mobile-auth-area">
              {isAuth ? (
                <div ref={!showDropdown ? undefined : dropdownRef} style={{ position: 'relative' }}>
                  <button
                    className="nav-user-btn"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ padding: '0.3rem 0.6rem 0.3rem 0.3rem', fontSize: '0.8rem' }}
                  >
                    <div className="nav-avatar" style={{ width: '26px', height: '26px', fontSize: '0.75rem' }}>{userInitial}</div>
                    <ChevronDown size={12} />
                  </button>
                </div>
              ) : (
                <button
                  className="nav-auth-btn"
                  onClick={() => setShowAuthModal(true)}
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                >
                  <LogIn size={14} />
                  Login
                </button>
              )}
            </div>

            <button
              className="menu-button"
              onClick={handleMenuOpen}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div
        style={{
          height: isScrolled ? '54px' : '62px',
          background: 'rgba(126, 58, 65, 0.94)',
          transition: 'height 0.3s ease'
        }}
      />
    </>
  );
}

export default ZetawaNav;
