import SolutionsSection from '../components/solution';
import Why_GMS from '../components/Why_GMS';
import FAQ from '../components/FAQ';
import Footer from '../components/footer';
import Hero from '../images/Hero.jpg';

const UserHomepage = () => {
  return (
    <>
    <div style={{ backgroundColor: "#1a1a1a" }}>
        <style jsx>{`
          .hero-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: 60px;
          }

          .hero-content {
            flex: 1;
            max-width: 500px;
          }

          .hero-image {
            flex: 1;
            max-width: 600px;
          }

          .hero-buttons {
            display: flex;
            gap: 20px;
            margin-top: 40px;
          }

          .stats-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
            gap: 60px;
          }

          .stats-content {
            flex: 1;
            max-width: 500px;
          }

          .stats-numbers {
            flex: 1;
            display: flex;
            gap: 80px;
            justify-content: center;
          }

          .stat-item {
            text-align: center;
          }

          @media (max-width: 768px) {
            .hero-container {
              flex-direction: column;
              text-align: center;
              gap: 40px;
            }

            .hero-content {
              max-width: 100%;
            }

            .hero-image {
              max-width: 100%;
            }

            .hero-buttons {
              justify-content: center;
              flex-wrap: wrap;
            }

            .stats-container {
              flex-direction: column;
              text-align: center;
              gap: 40px;
            }

            .stats-numbers {
              gap: 40px;
            }
          }

          @media (max-width: 480px) {
            .hero-buttons {
              flex-direction: column;
              align-items: center;
            }

            .stats-numbers {
              flex-direction: column;
              gap: 30px;
            }
          }
        `}</style>

        {/* Hero Section */}
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "80px 40px",
            maxWidth: "1200px",
            margin: "0 auto",
            minHeight: "70vh",
          }}
        >
          <div className="hero-container">
            <div className="hero-content">
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  lineHeight: "1.2",
                  margin: "0 0 20px 0",
                }}
              >
                The solution to your <span style={{ color: "#ffd700" }}>PARKING PROBLEMS.</span>
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#cccccc",
                  lineHeight: "1.6",
                  margin: "0 0 40px 0",
                  maxWidth: "450px",
                }}
              >
                Find secure, convenient parking anytime, anywhere. Whether it's for your home, office, or public space,
                we've got you covered with smart, reliable solutions.
              </p>

            </div>

            <div className="hero-image">
              <img
                src={Hero}
                alt="Modern smart parking garage with digital displays"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </section>
        <SolutionsSection />
        <Why_GMS />
        <FAQ />
      </div>
      <Footer />
    </>
  )
}

export default UserHomepage
