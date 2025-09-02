import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import UserNavbar from "../components/user-navbar"
import Footer from "../components/footer"
import Paladium from "../components/paladium"
  
const UserMall = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMalls, setFilteredMalls] = useState([])
  const [mallsData, setMallsData] = useState([])
  const sectionRef = useRef(null)
  const searchRef = useRef(null)
  const resultsRef = useRef(null)
  const navigate = useNavigate()

  // Fetch malls from backend
  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/malls`, { headers: { Accept: "application/json" } })
        if (!res.ok) return
        const data = await res.json()
        setMallsData(Array.isArray(data) ? data : [])
        setFilteredMalls(Array.isArray(data) ? data : [])
      } catch (e) {
        // If backend not reachable, keep empty list
      }
    }
    fetchMalls()
  }, [])

  // Filter malls based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMalls(mallsData)
    } else {
      const filtered = mallsData.filter(
        (mall) =>
          mall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mall.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredMalls(filtered)
    }
  }, [searchTerm, mallsData])

  // Initialize with all malls (when data loads)
  useEffect(() => {
    setFilteredMalls(mallsData)
  }, [mallsData])

  const handleSearch = () => {
    console.log("Searching for:", searchTerm)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        // Search bar animation
        if (searchRef.current) {
          gsap.fromTo(
            searchRef.current,
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

        // Results animation
        if (resultsRef.current && resultsRef.current.children) {
          gsap.fromTo(
            Array.from(resultsRef.current.children),
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
              delay: 0.3,
            },
          )
        }
      } catch (error) {
        console.log("GSAP loading error:", error)
      }
    }

    loadGSAP()
  }, [filteredMalls])



  const toSlug = (text) =>
    text
      .toLowerCase()
      .replace(/\s*parking\s*$/i, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

  const handleLiveClick = (mall) => {
    if (!mall.isLive) return
    if (mall.id === 1) {
      navigate("/user/mall/palladium")
      return
    }
    else if (mall.id === 2) {
      navigate("/user/mall/phoenix")
      return
    }
    const slug = toSlug(mall.name)
    navigate(`/user/mall/${slug}`)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <style jsx>{`
        .mall-container {
          width: 100%;
          max-width: none;
          margin: 0;
        }

        .mall-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .search-container {
          display: flex;
          gap: 15px;
          margin-bottom: 40px;
        }

        .search-input {
          flex: 1;
          padding: 15px 20px;
          background-color: transparent;
          border: 2px solid #333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          border-color: #ffd700;
        }

        .search-input::placeholder {
          color: #888;
        }

        .search-button {
          padding: 15px 30px;
          background-color: #ffd700;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-button:hover {
          background-color: #ffed4a;
          transform: translateY(-2px);
        }

        .mall-card {
          display: flex;
          background-color: #2a2a2a;
          border-radius: 12px;
          margin-bottom: 0;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #333;
        }

        .mall-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .mall-image-box {
          width: 200px;
          height: 150px;
          flex-shrink: 0;
          background: linear-gradient(135deg, #ffd700, #ffed4a);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          margin: 10px;
        }

        .mall-name-box {
          color: #000000;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          padding: 10px;
          word-wrap: break-word;
          line-height: 1.2;
        }

        .mall-content {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .mall-info {
          margin-bottom: 15px;
        }

        .live-button {
          width: 100%;
          padding: 12px;
          background-color: #ffd700;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .live-button:hover {
          background-color: #ffed4a;
          transform: translateY(-2px);
        }

        .live-button:disabled {
          background-color: #666;
          color: #999;
          cursor: not-allowed;
        }

        .live-button:disabled:hover {
          transform: none;
          background-color: #666;
        }

        .live-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #00ff00;
        }

        .offline-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ff0000;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #cccccc;
        }

        @media (max-width: 768px) {
          .mall-grid {
            grid-template-columns: 1fr;
          }

          .mall-card {
            flex-direction: column;
          }

          .mall-image-box {
            width: 100%;
            height: 150px;
            margin: 10px;
          }

          .search-container {
            flex-direction: column;
          }

          .search-button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .mall-content {
            padding: 15px;
          }
        }
      `}</style>

             <div className="mall-container">
         {/* Search Section */}
        <div ref={searchRef} className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Where you want to go?"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {/* Results Section */}
        {filteredMalls.length > 0 ? (
          <div ref={resultsRef} className="mall-grid">
            {filteredMalls.map((mall) => (
              <div key={mall.id} className="mall-card">
                <div className="mall-image-box">
                  <div className="mall-name-box">
                    {mall.name}
                  </div>
                </div>
                <div className="mall-content">
                  <div className="mall-info">
                    <h3
                      style={{
                        color: "#ffffff",
                        fontSize: "24px",
                        fontWeight: "bold",
                        margin: "0 0 10px 0",
                      }}
                    >
                      {mall.name}
                    </h3>
                    <p
                      style={{
                        color: "#ffffff",
                        fontSize: "20px",
                        fontWeight: "600",
                        margin: "0 0 10px 0",
                      }}
                    >
                      {mall.price}
                    </p>
                    <p
                      style={{
                        color: "#cccccc",
                        fontSize: "14px",
                        margin: "0",
                        lineHeight: "1.4",
                      }}
                    >
                      {mall.address}
                    </p>
                  </div>
                  <button
                    className="live-button"
                    disabled={!mall.isLive}
                    style={{
                      backgroundColor: mall.isLive ? "#ffd700" : "#666",
                      color: mall.isLive ? "#000000" : "#999",
                    }}
                    onClick={() => handleLiveClick(mall)}
                  >
                    {mall.isLive ? "Live parking" : "Currently unavailable"}
                    <div className={mall.isLive ? "live-indicator" : "offline-indicator"}></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3
              style={{
                fontSize: "24px",
                margin: "0 0 10px 0",
              }}
            >
              No malls found
            </h3>
            <p style={{ fontSize: "16px", margin: "0" }}>
              Try searching with different keywords or check your spelling.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default UserMall
