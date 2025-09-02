import AuthHandler from '../pages/auto-handle'
import { Link } from 'react-router-dom'


const Navbar = () => {
return (
    <>
      <style jsx>{`
        .navbar-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          background-color: #2a2a2a;
          color: white;
          padding: 15px 40px;
          position: sticky;
          top: 0;
          z-index: 1000;
          overflow: visible;
          margin-bottom: 20px;
        }

        .navbar-container::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 14px;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(255, 215, 0, 0.55) 0%,
            rgba(255, 215, 0, 0.18) 20%,
            rgba(255, 215, 0, 0.04) 35%,
            transparent 50%,
            transparent 50%,
            rgba(255, 215, 0, 0.04) 65%,
            rgba(255, 215, 0, 0.18) 80%,
            rgba(255, 215, 0, 0.55) 100%
          );
          filter: blur(8px);
          opacity: 0.8;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
        }

        .navbar-links {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 40px;
        }

        .navbar-auth {
          display: flex;
          align-items: center;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: #1a1a1a;
          padding: 20px;
          gap: 20px;
        }

        .mobile-menu.active {
          display: flex;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background-color: white;
          transition: 0.3s;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .navbar-container {
            padding: 15px 20px;
          }

          .mobile-menu {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .navbar-container {
            padding: 10px 15px;
          }

          .logo {
            font-size: 24px !important;
          }
        }
      `}</style>

      <nav className="navbar-container">
        <div className="navbar-logo">
          <div
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "#ffffff" }}>Get</span>
            <span style={{ color: "#888888" }}>my</span>
            <span style={{ color: "#ffd700" }}>space</span>
          </div>
        </div>

        <div className="navbar-links">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Home
          </Link>
          <Link
            to="/solutions"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Solutions
          </Link>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ffd700")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Contact
          </Link>
        </div>

        <div className="navbar-auth">
          <AuthHandler />
        </div>

        <div
          className="hamburger"
          onClick={(e) => {
            const mobileMenu = e.currentTarget.parentElement.querySelector(".mobile-menu")
            mobileMenu.classList.toggle("active")
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="mobile-menu">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "500",
              padding: "10px 0",
            }}
          >
            Home
          </Link>
          <Link
            to="/solutions"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "500",
              padding: "10px 0",
            }}
          >
            Solutions
          </Link>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "500",
              padding: "10px 0",
            }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "500",
              padding: "10px 0",
            }}
          >
            Contact
          </Link>
          <div style={{ marginTop: "10px" }}>
            <AuthHandler />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
