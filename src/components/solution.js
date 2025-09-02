import { useEffect, useRef } from "react"
import i1 from "../images/Anpr.png"
import i2 from "../images/Sensor.png"
import i3 from "../images/Ai.png"

const SolutionsSection = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

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

      // Card 1 animation (slide from left)
      gsap.fromTo(
        card1Ref.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Card 2 animation (slide from right)
      gsap.fromTo(
        card2Ref.current,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Card 3 animation (slide from left)
      gsap.fromTo(
        card3Ref.current,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card3Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Parallax effect for the entire section
      gsap.to(sectionRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }

    loadGSAP()
  }, [])

  return (
    <>
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#1a1a1a",
        padding: "60px 40px 0 40px",
      }}
    >
      <style jsx>{`
        .solutions-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .solution-card {
          display: flex;
          align-items: center;
          gap: 60px;
          margin-bottom: 100px;
          transition: transform 0.3s ease;
        }

        .solution-card:hover {
          transform: translateY(-10px);
        }

        .solution-image {
          flex: 1;
          max-width: 400px;
        }

        .solution-content {
          flex: 1;
          max-width: 600px;
        }

        .solution-card.reverse {
          flex-direction: row-reverse;
        }

        @media (max-width: 768px) {
          .solution-card {
            flex-direction: column !important;
            text-align: center;
            gap: 30px;
            margin-bottom: 60px;
          }

          .solution-image {
            max-width: 100%;
          }

          .solution-content {
            max-width: 100%;
          }
        }
      `}</style>

        <div className="solutions-container">
          {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "80px", textAlign: "center" }}>
          <p
            style={{
              color: "#ffd700",
              fontSize: "16px",
              fontWeight: "500",
              margin: "0 0 20px 0",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Our solutions
          </p>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "48px",
              fontWeight: "bold",
              margin: "0",
              lineHeight: "1.2",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Efficient, secure, and tailored parking solutions.
          </h2>
        </div>

        {/* Solution Card 1 - ANPR */}
        <div ref={card1Ref} className="solution-card">
          <div className="solution-image">
            <div
              style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#666",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)"
                e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"
                e.target.style.boxShadow = "none"
              }}
            >
              <img
                src={i1}
                alt="ANPR System"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
          </div>
          <div className="solution-content">
            <h3
              style={{
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
                lineHeight: "1.2",
              }}
            >
              ANPR For Seamless Parking
            </h3>
            <p
              style={{
                color: "#cccccc",
                fontSize: "18px",
                lineHeight: "1.6",
                margin: "0 0 30px 0",
              }}
            >
              The ANPR system revolutionizes parking by automatically recognising license plates, enabling quick entry
              and exit. This technology minimizes wait times and enhances traffic flow, making parking effortless and
              efficient for everyone.
            </p>
          </div>
        </div>

        {/* Solution Card 2 - Ultrasonic Sensors */}
        <div ref={card2Ref} className="solution-card reverse">
          <div className="solution-image">
            <div
              style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#666",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)"
                e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"
                e.target.style.boxShadow = "none"
              }}
            >
              <img
                src={i2}
                alt="Ultrasonic Sensors"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
          </div>
          <div className="solution-content">
            <h3
              style={{
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
                lineHeight: "1.2",
              }}
            >
              Ultrasonic Sensors
            </h3>
            <p
              style={{
                color: "#cccccc",
                fontSize: "18px",
                lineHeight: "1.6",
                margin: "0 0 30px 0",
              }}
            >
              Improve your parking management with ultrasonic sensors that detect vehicles in lots. By utilizing
              advanced technology, these sensors optimize space usage, enhance efficiency, and make parking management
              effortless for everyone.
            </p>
          </div>
        </div>

        {/* Solution Card 3 - AI-Driven Parking */}
        <div ref={card3Ref} className="solution-card">
          <div className="solution-image">
            <div
              style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#666",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)"
                e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)"
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)"
                e.target.style.boxShadow = "none"
              }}
            >
              <img
                src={i3}
                alt="AI-Driven Parking System"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>
          </div>
          <div className="solution-content">
            <h3
              style={{
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 20px 0",
                lineHeight: "1.2",
              }}
            >
              AI-Driven Parking
            </h3>
            <p
              style={{
                color: "#cccccc",
                fontSize: "18px",
                lineHeight: "1.6",
                margin: "0 0 30px 0",
              }}
            >
              AI in smart parking systems monitors real-time space availability, manages traffic flow, and optimizes
              parking efficiency. It quickly guides drivers to open spots, reducing congestion and enhancing the overall
              parking experience.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default SolutionsSection