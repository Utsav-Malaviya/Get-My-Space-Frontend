import React, { useState } from "react"
import Footer from "../components/footer"
import CEO from "../images/CEO.HEIC"
import CTO from "../images/CTO.jpg"
import Login from "../components/login"
import Signup from "../components/signup"
import CMO from "../images/saheb.jpg"
import CFO from "../images/divy.jpg"

const AboutSection = () => {

  const teamMembers = [
    {
      name: "Utsav Malviya",
      role: "CEO",
      image: CEO,
    },
    {
      name: "Dwarkesh Akoliya",
      role: "CTO",
      image: CTO,
    },
    {
      name: "Shail Patel ",
      role: "COO",
      image: CMO,
    },
    {
      name: "Divy Prajapati",
      role: "CMO",
      image: CFO,
    },
  ]

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

  const handleGetDemo = () => {
    openLogin();
  }

  const handleContactUs = () => {
    window.location.href = "/contact"
  }

  return (
    <section
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <style jsx>{`
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin: 50px 0;
        }

        .team-member {
          text-align: center;
          transition: transform 0.3s ease;
        }

        .team-member:hover {
          transform: translateY(-10px);
        }

        .team-image {
          width: 150px;
          height: 150px;
          border-radius: 12px;
          object-fit: cover;
          margin: 0 auto 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .team-member:hover .team-image {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 40px;
        }

        @media (max-width: 768px) {
          .about-container {
            padding: 0 20px;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "100px 0",
          borderBottom: "1px solid #333",
        }}
      >
        <div className="about-container">
          <h3
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
              position: "relative",
              display: "inline-block",
            }}
          >
            About Us
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "4px",
                backgroundColor: "#ffd700",
                borderRadius: "2px",
              }}
            ></div>
          </h3>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: "bold",
              margin: "30px 0 30px 0",
              lineHeight: "1.2",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            At <span style={{ color: "#ffffff" }}>Get</span>
            <span style={{ color: "#888888" }}>my</span>
            <span style={{ color: "#ffd700" }}>space</span>, We Empower Businesses with Smarter, Scalable Parking
            Solutions
          </h1>
          <p
            style={{
              color: "#cccccc",
              fontSize: "18px",
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            We provide advanced parking solutions that boost efficiency, cut costs, and enhance customer experience. Our
            systems scale with your business, delivering reliable results every time.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div
        style={{
          padding: "100px 0",
          borderBottom: "1px solid #333",
        }}
      >
        <div className="about-container">
          <h3
            style={{
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
              position: "relative",
              display: "inline-block",
            }}
          >
            Who we are
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "0",
                width: "40px",
                height: "4px",
                backgroundColor: "#ffd700",
                borderRadius: "2px",
              }}
            ></div>
          </h3>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "42px",
              fontWeight: "bold",
              margin: "30px 0 30px 0",
              lineHeight: "1.2",
              maxWidth: "800px",
            }}
          >
            Transforming Urban Mobility in India with Innovative Smart Parking Solutions
          </h2>
          <p
            style={{
              color: "#cccccc",
              fontSize: "18px",
              lineHeight: "1.8",
              maxWidth: "900px",
            }}
          >
            Our aim is to revolutionize smart parking in India by providing efficient, tech-driven solutions that reduce
            congestion and enhance urban mobility. With a strong focus on innovation, we are committed to optimizing
            parking spaces. By integrating advanced technologies such as real-time data analytics, we strive to deliver
            smarter, more convenient parking solutions that address the growing needs of modern cities.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div
        style={{
          padding: "100px 0",
          borderBottom: "1px solid #333",
        }}
      >
        <div className="about-container">
          <h3
            style={{
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
              position: "relative",
              display: "inline-block",
            }}
          >
            Core Team
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "0",
                width: "40px",
                height: "4px",
                backgroundColor: "#ffd700",
                borderRadius: "2px",
              }}
            ></div>
          </h3>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: "bold",
              margin: "30px 0 0 0",
              lineHeight: "1.2",
            }}
          >
            Leading Minds Shaping the Future of Smart Parking
          </h2>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="team-image" />
                <h4
                  style={{
                    color: "#ffffff",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 5px 0",
                  }}
                >
                  {member.name}
                </h4>
                <p
                  style={{
                    color: "#cccccc",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <div className="about-container">
          <h2
            style={{
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: "bold",
              margin: "0 0 20px 0",
              lineHeight: "1.2",
            }}
          >
            A Parking Solution Built for Success
          </h2>
          <p
            style={{
              color: "#cccccc",
              fontSize: "18px",
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Innovative tools to streamline your parking operations and scale with your business.
          </p>

          <div className="cta-buttons">
            <button onClick={handleGetDemo}
              style={{
                backgroundColor: "#ffd700",
                color: "#000000",
                border: "none",
                padding: "15px 30px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#ffed4a"
                e.target.style.transform = "translateY(-3px)"
                e.target.style.boxShadow = "0 10px 20px rgba(255, 215, 0, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ffd700"
                e.target.style.transform = "translateY(0px)"
                e.target.style.boxShadow = "none"
              }}
            >
              Get a Demo
            </button>

            <button onClick={handleContactUs}
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "2px solid #ffffff",
                padding: "13px 28px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#ffffff"
                e.target.style.color = "#000000"
                e.target.style.transform = "translateY(-3px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent"
                e.target.style.color = "#ffffff"
                e.target.style.transform = "translateY(0px)"
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Login isOpen={showLogin} onClose={closeModals} onSwitchToSignup={openSignup} />
      <Signup isOpen={showSignup} onClose={closeModals} onSwitchToLogin={openLogin} />  
    </section>
    
  )
}

export default AboutSection
