

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"


const HelpSection = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  const workSteps = [
    {
      step: "1",
      title: "Search & Select",
      description: "Browse available malls and select your preferred parking location from our extensive network.",
      icon: "🔍",
    },
    {
      step: "2",
      title: "Choose Time Slot",
      description: "you can choose the time slot according to your convenience and show traffic status.",
      icon: "⏰",
    },
    {
      step: "3",
      title: "Payment",
      description: "convenient digital and secure payment options also you can pay with fastag.",
      icon: "💳",
    },
    {
      step: "4",
      title: "Park & Go",
      description: "Arrive at the mall, and park your vehicle in the parking slot.",
      icon: "🚗",
    },
  ]

  const features = [
    {
      title: "Real-time Availability",
      description: "Get live updates on parking spot availability across all connected malls.",
      icon: "📊",
    },
    {
      title: "Smart Pricing",
      description: "Dynamic pricing based on demand, time slots, and peak hours for optimal value.",
      icon: "💰",
    },
    {
      title: "Pre-planning",
      description: "you can show parking slot availability and traffic status at your desired time.",
      icon: "📅",
    },
    {
      title: "Digital Payments",
      description: "Secure and convenient payment options including UPI, cards, and fastag.",
      icon: "📱",
    },
    {
      title: "History Tracking",
      description: "Keep track of all your parking sessions with detailed history and receipts.",
      icon: "📋",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any queries or issues.",
      icon: "🎧",
    },
  ]

  const commonQueries = [
    {
      question: "How to pay?",
      answer: "you can pay with UPI, cards, and fastag.",
    },
    {
      question: "How to view traffic status?",
      answer: "you can view traffic status by clicking on pre-plan and then you can see the traffic status.",
    },
    {
      question: "How to find live parking slot availability?",
      answer: "you can find live parking slot availability by clicking on mall and than live view.",
    },
    {
      question: "How to view history?",
      answer: "you can view history by clicking on history.",
    }
  ]

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        // Header animation
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            {
              opacity: 0,
              y: -30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
          )
        }

        // Content animation
        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.3,
            },
          )
        }
      } catch (error) {
        console.log("GSAP loading error:", error)
      }
    }

    loadGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        color: "#ffffff",
        padding: "20px",
      }}
    >
      <style jsx>{`
        .help-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #333;
          margin-bottom: 40px;
        }

        .back-button {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
          margin-right: 15px;
          padding: 5px;
        }

        .header-info h1 {
          margin: 0 0 5px 0;
          font-size: 28px;
          font-weight: 600;
        }

        .header-info p {
          margin: 0;
          font-size: 16px;
          color: #cccccc;
        }

        .section {
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 30px;
          text-align: center;
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .section-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background-color: #ffd700;
          border-radius: 2px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .step-card {
          background-color: #2a2a2a;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          border: 1px solid #333;
          transition: all 0.3s ease;
          position: relative;
        }

        .step-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border-color: #ffd700;
        }

        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background-color: #ffd700;
          color: #000000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
        }

        .step-icon {
          font-size: 48px;
          margin: 20px 0;
        }

        .step-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .step-description {
          font-size: 14px;
          color: #cccccc;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .feature-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 25px;
          border: 1px solid #333;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: #ffd700;
        }

        .feature-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .feature-icon {
          font-size: 32px;
        }

        .feature-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }

        .feature-description {
          font-size: 14px;
          color: #cccccc;
          line-height: 1.6;
        }

        .queries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .query-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #333;
        }

        .query-question {
          font-size: 16px;
          font-weight: 600;
          color: #ffd700;
          margin-bottom: 10px;
        }

        .query-answer {
          font-size: 14px;
          color: #cccccc;
          line-height: 1.6;
        }

        .contact-info {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 30px;
          border: 1px solid #333;
        }

        .contact-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #ffd700;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .contact-icon {
          font-size: 24px;
        }

        .contact-details h4 {
          margin: 0 0 5px 0;
          color: #ffffff;
          font-size: 16px;
        }

        .contact-details p {
          margin: 0;
          color: #cccccc;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .queries-grid {
            grid-template-columns: 1fr;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="help-container">
        {/* Header */}
        <div ref={headerRef} className="header">
          <button className="back-button" onClick={() => navigate("/user/home") }>
            ←
          </button>
          <div className="header-info">
            <h1>Help & Support</h1>
            <p>Everything you need to know about our smart parking system</p>
          </div>
        </div>

        <div ref={contentRef}>
          {/* How We Work Section */}
          <div className="section">
            <h2 className="section-title">How We Work</h2>
            <div className="steps-grid">
              {workSteps.map((step, index) => (
                <div key={index} className="step-card">
                  <div className="step-number">{step.step}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="section">
            <h2 className="section-title">Our Features</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-header">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                  </div>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Queries Section */}
          <div className="section">
            <h2 className="section-title">Common Queries</h2>
            <div className="queries-grid">
              {commonQueries.map((query, index) => (
                <div key={index} className="query-card">
                  <h4 className="query-question">{query.question}</h4>
                  <p className="query-answer">{query.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="section">
            <h2 className="section-title">Still Need Help?</h2>
            <div className="contact-info" style={{ maxWidth: "600px", margin: "0 auto" }}>
              <h3 className="contact-title">Get in Touch</h3>
              <p style={{ color: "#cccccc", marginBottom: "30px", lineHeight: "1.6" }}>
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email Support</h4>
                  <p>support@getmyspace.io</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>Phone Support</h4>
                  <p>+91 79901 30283</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h4>Live Chat</h4>
                  <p>Available 24/7 on our website</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div className="contact-details">
                  <h4>Response Time</h4>
                  <p>Within 2-4 hours on business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpSection
