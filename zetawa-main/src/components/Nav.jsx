import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, Phone, Briefcase, Bell, User, LogIn, LogOut, Shield } from 'lucide-react';
import img1 from '../assets/vite.png';
import { useAppContext } from '../context/AppContext';

function ZetawaNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user, isAdmin, logout } = useAppContext();

const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Admin Profile', path: '/admin-profile', icon: User },
    { name: 'Certifications', path: '/certifications', icon: Users },
    { name: 'Contact Us', path: '/contact', icon: Phone },
    { name: 'Careers', path: '/careers', icon: Briefcase },
    { name: 'Press Release', path: '/press-release', icon: Bell },
  ];

  const authItem = isAuth
    ? { name: user?.name ? `Logout (${user.name.split(' ')[0]})` : 'Logout', path: null, icon: LogOut, action: 'logout' }
    : { name: 'Login', path: '/login', icon: LogIn };

  const adminItem = isAdmin ? { name: 'Admin Panel', path: '/admin', icon: Shield } : null;

  const itemsForMenu = [...navigationItems, ...(adminItem ? [adminItem] : []), authItem];

  const handleAuthClick = async (action) => {
    if (action === 'logout') {
      await logout();
      if (location.pathname !== '/') navigate('/');
    }
    handleMenuClose();
  };

  const handleNavClick = (path) => {
    navigate(path);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        handleMenuClose();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
          background: linear-gradient(135deg, #7e3a41 0%, #6a3139 100%);
          padding: 0.5rem 0;
          box-shadow: none;
          border-bottom: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-header.scrolled {
          padding: 0.4rem 0;
          box-shadow: none;
          border-bottom: 0;
          background: linear-gradient(135deg, #7e3a41 0%, #5a2830 100%);
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
          transform: translateY(-2px);
        }

        .logo-container {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: white;
          padding: 4px;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .nav-header.scrolled .logo-container {
          width: 28px;
          height: 28px;
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
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .nav-header.scrolled .brand-name {
          font-size: 0.95rem;
        }

        .nav-links {
          display: none;
          align-items: center;
          gap: 1.4rem;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.3rem 0;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .menu-button {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.8);
          color: white;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-button:hover {
          background: white;
          color: #7e3a41;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 248, 0.98) 100%);
          backdrop-filter: blur(20px);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .close-button {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: rgba(126, 58, 65, 0.1);
          border: 2px solid #7e3a41;
          color: #7e3a41;
          padding: 14px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2001;
        }

        .close-button:hover {
          background: #7e3a41;
          color: white;
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 4px 20px rgba(126, 58, 65, 0.4);
        }

        .menu-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2rem;
          width: 100%;
          max-width: 500px;
        }

        .menu-item {
          width: 100%;
          padding: 1.2rem 2rem;
          color: #7e3a41;
          cursor: pointer;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-size: 1.15rem;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(126, 58, 65, 0.05);
          border: 2px solid rgba(126, 58, 65, 0.1);
          transform: translateY(30px);
          opacity: 0;
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
        .menu-overlay.active .menu-item:nth-child(7) { transition-delay: 0.4s; }

        .menu-item:hover {
          background: rgba(126, 58, 65, 0.15);
          border-color: rgba(126, 58, 65, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(126, 58, 65, 0.2);
        }

        .menu-item:active {
          transform: translateY(-2px);
        }

        .decorative-shape-1 {
          position: fixed;
          top: 15%;
          right: 10%;
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, rgba(126, 58, 65, 0.1) 0%, rgba(126, 58, 65, 0.05) 100%);
          border-radius: 50%;
          filter: blur(40px);
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }

        .decorative-shape-2 {
          position: fixed;
          bottom: 20%;
          left: 10%;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, rgba(126, 58, 65, 0.08) 0%, rgba(126, 58, 65, 0.03) 100%);
          border-radius: 50%;
          filter: blur(30px);
          animation: float 10s ease-in-out infinite reverse;
          pointer-events: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
            padding: 0 1.5rem;
          }

          .logo-container {
            width: 40px;
            height: 40px;
          }

          .brand-name {
            font-size: 1.1rem;
          }

          .menu-content {
            padding: 1.5rem 1rem;
            gap: 0.6rem;
          }

          .menu-item {
            padding: 1rem 1.5rem;
            font-size: 1rem;
            min-width: 280px;
          }

          .close-button {
            top: 1.5rem;
            right: 1.5rem;
            padding: 12px;
          }

          .decorative-shape-1,
          .decorative-shape-2 {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 1rem;
          }

          .logo-container {
            width: 36px;
            height: 36px;
          }

          .brand-name {
            font-size: 1rem;
          }

          .menu-item {
            padding: 0.9rem 1.2rem;
            font-size: 0.95rem;
            min-width: 260px;
          }
        }
      `}</style>

      {/* Menu Overlay - Only for Mobile */}
      {(isMenuOpen || isMenuAnimating) && (
        <>
          <div 
            className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
            onClick={handleMenuClose}
          >
            <div className="decorative-shape-1" />
            <div className="decorative-shape-2" />
            
            <button 
              className="close-button"
              onClick={handleMenuClose}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="menu-content" onClick={(e) => e.stopPropagation()}>
              {itemsForMenu.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.name}
                    className="menu-item"
                    onClick={() => (item.action === 'logout' ? handleAuthClick(item.action) : handleNavClick(item.path))}
                  >
                    {IconComponent && <IconComponent size={22} strokeWidth={2.5} />}
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
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
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="nav-link"
                >
                  {IconComponent && <IconComponent size={18} strokeWidth={2.5} />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link to="/admin" className="nav-link">
                <Shield size={18} strokeWidth={2.5} />
                <span>Admin Portal</span>
              </Link>
            )}
            {isAuth ? (
              <button
                onClick={() => handleAuthClick('logout')}
                className="nav-link"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'inherit',
                }}
              >
                <LogOut size={18} strokeWidth={2.5} />
                <span>{user?.name ? `Logout (${user.name.split(' ')[0]})` : 'Logout'}</span>
              </button>
            ) : (
              <Link to="/login" className="nav-link">
                <LogIn size={18} strokeWidth={2.5} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="menu-button"
            onClick={handleMenuOpen}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
<div
  style={{
    height: isScrolled ? '48px' : '60px',
    background: 'linear-gradient(135deg, #7e3a41 0%, #6a3139 100%)', // same as navbar
    transition: 'height 0.3s ease'
  }}
/>
    </>
  );
}

export default ZetawaNav;