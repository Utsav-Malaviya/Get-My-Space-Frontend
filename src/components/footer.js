import { Link } from 'react-router-dom'
import { useState } from 'react';
import Login from './login';
import Signup from './signup';

const Footer = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLiveView = () => {
    openLogin();
  }
  return (
    <>
      <style jsx>{`
        .footer-container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-around;
          width: 100%;
          background-color: #1a1a1a;
          color: white;
          padding: 60px 40px;
          position: relative;
          overflow: visible;
        }

        /* golden glow at the top edges */
        .footer-container::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -8px;
          height: 16px;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(255, 215, 0, 0.55) 0%,
            rgba(255, 215, 0, 0.18) 14%,
            rgba(255, 215, 0, 0.04) 28%,
            transparent 40%,
            transparent 60%,
            rgba(255, 215, 0, 0.04) 72%,
            rgba(255, 215, 0, 0.18) 86%,
            rgba(255, 215, 0, 0.55) 100%
          );
          filter: blur(8px);
          opacity: 0.9;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          width: 40%;
          padding: 10px;
        }

        .footer-links-container {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-around;
          width: 60%;
          padding: 10px;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 33%;
          padding: 10px;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            gap: 40px;
          }

          .footer-brand {
            width: 100%;
            align-items: center;
            text-align: center;
          }

          .footer-links-container {
            width: 100%;
            flex-direction: column;
            gap: 30px;
          }

          .footer-section {
            width: 100%;
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 30px 15px;
            gap: 30px;
          }

          .logo {
            font-size: 28px !important;
          }
        }
      `}</style>

      <div className="footer-container">
        <div className="footer-brand">
          <div
            className="logo"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ margin: "0", fontSize: "32px", fontWeight: "bold", color: "#ffffff" }}>Get</h1>
            <h1 style={{ margin: "0", fontSize: "32px", fontWeight: "bold", color: "#888888" }}>my</h1>
            <h1 style={{ margin: "0", fontSize: "32px", fontWeight: "bold", color: "#ffd700" }}>space</h1>
          </div>
          <div>
            <p style={{ color: "#888888", fontSize: "16px", lineHeight: "1.5", margin: "0" }}>
              Digitalize your parking system now.
            </p>
          </div>
        </div>

        <div className="footer-links-container">
          <div className="footer-section">
            <h2 style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600", marginBottom: "30px", marginTop: "0" }}>
              Links
            </h2>
            <Link
              to="/solutions"
              style={{
                textDecoration: "none",
                color: "#888888",
                marginBottom: "16px",
                fontSize: "16px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#888888")}
            >
              Solutions
            </Link>
            <Link
              to="/about"
              style={{
                textDecoration: "none",
                color: "#888888",
                marginBottom: "16px",
                fontSize: "16px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#888888")}
            >
              About Us
            </Link>
            <Link
              onClick={handleLiveView}
              style={{
                textDecoration: "none",
                color: "#888888",
                marginBottom: "16px",
                fontSize: "16px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#888888")}
            >
              Live view
            </Link>
            <Link
              to="/contact"
              style={{
                textDecoration: "none",
                color: "#888888",
                marginBottom: "16px",
                fontSize: "16px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#888888")}
            >
              Contact Us
            </Link>
          </div>

          <div className="footer-section">
            <h2 style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600", marginBottom: "30px", marginTop: "0" }}>
              Manage By
            </h2>
            <a
              href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A107955974&keywords=trio%20pulse&origin=RICH_QUERY_SUGGESTION&position=0&searchId=fd847207-1f3c-4d2d-9f46-b59e9d66446b&sid=w-C&spellCorrectionEnabled=false"
              style={{
                textDecoration: "none",
                color: "#888888",
                marginBottom: "16px",
                fontSize: "16px",
                transition: "color 0.3s ease",
                target: "_blank",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#888888")}
            >
              Trio Pulse
            </a>
          </div>

          <div className="footer-section">
            <h2 style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600", marginBottom: "30px", marginTop: "0" }}>
              More
            </h2>
            <a
              href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A108195258&keywords=get%20my%20space&origin=RICH_QUERY_SUGGESTION&position=1&searchId=62abd1ff-3a72-4a33-bf27-4bbfc65858f5&sid=d3B&spellCorrectionEnabled=false"
              style={{
                textDecoration: "none",
                color: "#888888",
                marginBottom: "16px",
                fontSize: "16px",
                transition: "color 0.3s ease",
                target: "_blank",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#888888")}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      {/* Login/Signup Modals */}
      <Login isOpen={showLogin} onClose={closeModals} onSwitchToSignup={openSignup} />
      <Signup isOpen={showSignup} onClose={closeModals} onSwitchToLogin={openLogin} />
    </>
  )
}

export default Footer
