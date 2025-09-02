
import { useState, useEffect, useRef } from "react"



const FAQSection = () => {
  const [openItems, setOpenItems] = useState([0]) // First item open by default
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const faqListRef = useRef(null)

  const faqData = [
    {
      question: "How do Smart Parking works?",
      answer:
        "Smart parking systems use AI and real-time data to monitor parking availability. Users receive information through apps or displays, guiding them to open spaces. This technology optimizes space utilization, reduces congestion, and streamlines the overall parking experience.",
    },
    {
      question: "Is Smart Parking system safe?",
      answer:
        "Yes, smart parking systems are designed with multiple security layers including encrypted data transmission, secure payment processing, and privacy protection. Our systems comply with industry standards and regulations to ensure user data and payment information remain secure at all times.",
    },
    {
      question: "What happens if I exceed my parking time?",
      answer:
        "If you exceed your allocated parking time, the system will automatically extend your session and charge you for the additional time at the standard hourly rate. You'll receive notifications before your time expires, giving you the option to extend your stay or move your vehicle.",
    },
    {
      question: "How can smart parking systems benefit my business?",
      answer:
        "Smart parking systems can significantly benefit your business by improving customer experience, increasing parking turnover, reducing operational costs, and providing valuable analytics. You'll have better control over parking management, automated payment processing, and detailed reporting on usage patterns.",
    },
  ]

const toggleItem = (index) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

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
        }

        // FAQ items stagger animation
        if (faqListRef.current && faqListRef.current.children) {
          gsap.fromTo(
            Array.from(faqListRef.current.children),
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: faqListRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            },
          )
        }
      } catch (error) {
        console.log("GSAP loading error:", error)
      }
    }

    loadGSAP()

    return () => {
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        })
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#1a1a1a",
        padding: "100px 40px",
        minHeight: "70vh",
      }}
    >
      <style jsx>{`
        .faq-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .faq-item {
          border-bottom: 1px solid #333;
          margin-bottom: 0;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30px 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          color: #ffd700;
        }

        .faq-answer {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-answer.open {
          max-height: 200px;
          padding-bottom: 30px;
        }

        .faq-answer.closed {
          max-height: 0;
          padding-bottom: 0;
        }

        .toggle-icon {
          font-size: 24px;
          font-weight: bold;
          color: #ffd700;
          transition: transform 0.3s ease;
          user-select: none;
        }

        .toggle-icon.rotate {
          transform: rotate(45deg);
        }

        @media (max-width: 768px) {
          .faq-question {
            padding: 20px 0;
          }

          .faq-answer.open {
            padding-bottom: 20px;
          }
        }
      `}</style>

      <div className="faq-container">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "60px" }}>
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
            FAQ
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "0",
                width: "30px",
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
              margin: "20px 0 0 0",
              lineHeight: "1.2",
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div ref={faqListRef}>
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleItem(index)}
                style={{
                  color: openItems.includes(index) ? "#ffd700" : "#ffffff",
                }}
              >
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    margin: "0",
                    flex: 1,
                    paddingRight: "20px",
                  }}
                >
                  {item.question}
                </h4>
                <span className={`toggle-icon ${openItems.includes(index) ? "rotate" : ""}`}>+</span>
              </div>
              <div
                className={`faq-answer ${openItems.includes(index) ? "open" : "closed"}`}
                style={{
                  maxHeight: openItems.includes(index) ? "200px" : "0px",
                  paddingBottom: openItems.includes(index) ? "30px" : "0px",
                }}
              >
                <p
                  style={{
                    color: "#cccccc",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    margin: "0",
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
