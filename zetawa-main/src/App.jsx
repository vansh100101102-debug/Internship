import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainPage from './components/MainPage';
import AdminProfile from './components/AdminProfile';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Careers from './components/Careers';
import Events from './components/Events';
import PressRelease from './components/PressRelease';
import Hireforms from './components/Hireforms';
import AboutUs from './components/AboutUs';
import ClientSatisfaction from './components/ClientSatisfaction';
import Login from './components/Login';
import Register from './components/Register';
import EmailVerify from './components/EmailVerify';
import ResetPassword from './components/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
// Scroll-to-top helper component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/press-release" element={<PressRelease />} />
          <Route path="/hireforms" element={<Hireforms />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/client-satisfaction" element={<ClientSatisfaction />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;