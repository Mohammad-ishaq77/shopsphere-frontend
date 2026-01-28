import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

// Layout Components
import Navigation from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail,jsx';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import AdminDashboard from './pages/AdminDashboard';
import Orders from './pages/Orders';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth || {});
  if (!user || !user.isAdmin) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="bottom-center" />
      <Navigation />
      
      <main className="min-vh-100" style={{ backgroundColor: '#f8fafc' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>

      {/* --- PREMIUM BLACK TYPOGRAPHIC FOOTER --- */}
      <footer className="bg-black text-white py-5 mt-5 border-top border-secondary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0">
              <h1 className="fw-black display-4 mb-0 tracking-tighter">
                SHOP<span style={{ color: '#6366f1' }}>SPHERE.</span>
              </h1>
              <p className="text-white-50 fw-medium mt-2 mb-0">
                The Future of Digital Commerce. Engineered with Precision.
              </p>
            </div>

            <div className="col-lg-5 text-lg-end">
              <div className="d-flex flex-column flex-lg-row justify-content-lg-end gap-3 gap-lg-4">
                <a 
                  href="https://github.com/mohammad-ishaq77" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white fw-bold text-decoration-none border-bottom border-1 border-secondary pb-1 d-inline-block hover-accent"
                >
                  GITHUB
                </a>
                <a 
                  href="https://www.linkedin.com/in/mohammad-ishaq-khan" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white fw-bold text-decoration-none border-bottom border-1 border-secondary pb-1 d-inline-block hover-accent"
                >
                  LINKEDIN
                </a>
                <Link 
                  to="/shop" 
                  className="text-white fw-bold text-decoration-none border-bottom border-1 border-secondary pb-1 d-inline-block hover-accent"
                >
                  EXPLORE
                </Link>
              </div>
            </div>
          </div>

          <div className="row mt-5 pt-4 border-top border-secondary">
            <div className="col-md-6 text-center text-md-start">
              <span className="small text-uppercase tracking-widest fw-bold text-white-50">
                Architect <span className="text-white">Mohammad Ishaq Khan</span>
              </span>
            </div>
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <span className="small text-uppercase tracking-widest fw-bold text-white-50">
                Powered by <span style={{ color: '#6366f1' }}>MERN ECOSYSTEM</span>
              </span>
            </div>
          </div>

          <div className="text-center mt-5">
            <p className="text-white-50 opacity-50" style={{ fontSize: '9px', letterSpacing: '3px' }}>
              © 2026 SHOPSPHERE LUXURY. ALL RIGHTS RESERVED. (DEMO PROJECT)
            </p>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;