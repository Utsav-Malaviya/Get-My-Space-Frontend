import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Why_GMS = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    // Import GSAP dynamically to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children,
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    loadGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "transparent",
        padding: "50px 40px 0 40px",
      }}
    >
      <style jsx>{`
        .features-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .feature-card {
          background-color: #2a2a2a;
          border-radius: 16px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: #ffd700;
          box-shadow: 0 20px 40px rgba(255, 215, 0, 0.1);
        }

        .feature-icon {
          width: 120px;
          height: 120px;
          border: 3px solid #ffd700;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          background-color: #ffd700;
          transform: scale(1.1);
        }

        .feature-card:hover .feature-icon svg {
          color: #000000 !important;
        }

        @media (max-width: 768px) {
          .features-cards {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .feature-card {
            min-height: 350px;
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="features-container">
        {/* Header */}
        <div ref={headerRef}>
          <h3
            style={{
              color: "#ffffff",
              fontSize: "32px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
              position: "relative",
              display: "inline-block",
            }}
          >
            Why choose our solutions?
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "0",
                width: "60px",
                height: "4px",
                backgroundColor: "#ffd700",
                borderRadius: "2px",
              }}
            ></div>
          </h3>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: "bold",
              margin: "30px 0 0 0",
              lineHeight: "1.2",
              maxWidth: "900px",
            }}
          >
            Real-time availability, automated ticketing, and digital payments.
          </h2>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="features-cards">
          {/* Real-time Availability Card */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "color 0.3s ease" }}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <h4
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
              }}
            >
              Real-time Availability
            </h4>
            <p
              style={{
                color: "#cccccc",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0",
              }}
            >
              Monitor parking spaces in real-time with live updates on availability. Our smart AI provide instant
              information about open spots, helping drivers find parking quickly and efficiently while reducing traffic
              congestion.
            </p>
          </div>

          {/* Automated Ticketing Card */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "color 0.3s ease" }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h4
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
              }}
            >
              Automated Ticketing
            </h4>
            <p
              style={{
                color: "#cccccc",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0",
              }}
            >
              Streamline your parking operations with automated ticket generation and validation. Our system eliminates
              manual processes, reduces wait times, and ensures accurate billing while providing a seamless experience
              for all users.
            </p>
          </div>

          {/* Digital Payments Card */}
          <div className="feature-card">
            <div className="feature-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "color 0.3s ease" }}
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h4
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
              }}
            >
              Digital Payments
            </h4>
            <p
              style={{
                color: "#cccccc",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0",
              }}
            >
              Accept secure digital payments through multiple channels including fastag, contactless cards, and
              online platforms. Our integrated payment system ensures fast, secure transactions while providing detailed
              analytics and reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why_GMS
