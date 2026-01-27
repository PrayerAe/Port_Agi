import { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AdminLogin, AdminDashboard } from './components/Admin';
import { FaCog } from 'react-icons/fa';
import './App.css';

// Admin Button Component
const AdminButton = ({ onClick }) => (
  <button
    className="admin-floating-btn"
    onClick={onClick}
    title="Admin Panel"
  >
    <FaCog />
  </button>
);

// Main App Content
const AppContent = () => {
  const { isLoggedIn } = useData();
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setShowDashboard(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowDashboard(true);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />

      {/* Admin Button */}
      <AdminButton onClick={handleAdminClick} />

      {/* Admin Login Modal */}
      {showLogin && (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Admin Dashboard Modal */}
      {showDashboard && (
        <AdminDashboard onClose={() => setShowDashboard(false)} />
      )}
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
