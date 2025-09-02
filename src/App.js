import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import { Routes, Route, Navigate } from 'react-router-dom';
import SolutionsSection from './components/solution';
import AboutSection from './pages/about';
import ContactSection from './pages/contact';
import UserLayout from './pages/user';
import UserHomepage from './pages/user-home';
import UserMall from './pages/user-Mall';
import UserHistory from './pages/user-History';
import UserPrePlan from './pages/user-Pre-Plan';
import UserHelp from './pages/user-Help';
import Paladium from './components/paladium';
import Phoniex from './components/phoniex';
import ComingSoon from './pages/coming-soon';
import Admin from './main/admin';
import AdminDashboardPalladium from './main/admin-palladium';
import AdminDashboardPhoenix from './main/admin_phoenix';
import SuperMallManagement from './pages/super-mall-management';
import Lenis from 'lenis';

function App() {
  const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Listen for the scroll event and log the event data 
  lenis.on('scroll', (e) => {
    console.log(e);
  });

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#1a1a1a', overflowX: 'hidden' }}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<><Navbar /><SolutionsSection /><Footer /></>}/>
          <Route path="/about" element={<><Navbar /><AboutSection /><Footer /></>}/>
          <Route path="/contact" element={<><ContactSection /><Footer /></>}/>
          <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="/user/home" replace />} />
          <Route path="home" element={<UserHomepage />} />
          <Route path="mall" element={<><UserMall /><Footer /></>} />
          <Route path="mall/palladium" element={<><Paladium /><Footer /></>} />
          <Route path="mall/phoenix" element={<><Phoniex /><Footer /></>} />
          <Route path="mall/:mall" element={<><ComingSoon /><Footer /></>} />
          <Route path="history" element={<UserHistory />} />
          <Route path="pre-plan" element={<UserPrePlan />} />
          <Route path="help" element={<UserHelp />} />
          <Route path="*" element={<Navigate to="/user/home" replace />} />
        </Route>
        <Route path="/user-home" element={<Navigate to="/user/home" replace />} />
        <Route path="/user-mall" element={<Navigate to="/user/mall" replace />} />
        <Route path="/user-history" element={<Navigate to="/user/history" replace />} />
        <Route path="/user-pre-plan" element={<Navigate to="/user/pre-plan" replace />} />
        <Route path="/user-help" element={<Navigate to="/user/help" replace />} />
        <Route path="/admin" element={<Admin />}>
        <Route path="palladium" element={<AdminDashboardPalladium />} />
        <Route path="phoenix" element={<AdminDashboardPhoenix />} />
        </Route>
        <Route path="/super" element={<SuperMallManagement />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;