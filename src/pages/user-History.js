
import { useState, useEffect, useRef } from "react"


const HistorySection = () => {
  const [historyData, setHistoryData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const historyListRef = useRef(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const stored = localStorage.getItem("gms_user")
        console.log(stored)
        const user = stored ? JSON.parse(stored) : null
        console.log(user)
        const plates = Array.isArray(user?.plateNumbers) ? user.plateNumbers : []
        console.log(plates)
        if (plates.length === 0) {
          setHistoryData([])
          return
        }
        const res = await fetch(`${process.env.BACKEND_URL}/api/history?plates=${encodeURIComponent(plates.join(','))}`)
        if (!res.ok) {
          setHistoryData([])
          return
        }
        const data = await res.json()
        setHistoryData(Array.isArray(data) ? data : [])
      } catch {
        setHistoryData([])
      }
    }
    fetchHistory()
  }, [])

  // Filter data based on status and search term
  useEffect(() => {
    let filtered = historyData

    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus)
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.mallName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.carNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.date.includes(searchTerm) ||
          item.day.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredData(filtered)
  }, [historyData, filterStatus, searchTerm])

  // Calculate total statistics
  const totalSpent = historyData
    .filter((item) => item.status === "completed")
    .reduce((sum, item) => sum + item.charges, 0)

  const totalVisits = historyData.filter((item) => item.status === "completed").length
  const ongoingSessions = historyData.filter((item) => item.status === "ongoing").length

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

        // History items stagger animation
        if (historyListRef.current && historyListRef.current.children) {
          gsap.fromTo(
            Array.from(historyListRef.current.children),
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
              delay: 0.3,
            },
          )
        }
      } catch (error) {
        console.log("GSAP loading error:", error)
      }
    }

    loadGSAP()
  }, [filteredData])

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
        .history-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #333;
          margin-bottom: 30px;
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

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #333;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #ffd700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 14px;
          color: #cccccc;
        }

        .controls-section {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 250px;
          padding: 12px 16px;
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

        .filter-buttons {
          display: flex;
          gap: 10px;
        }

        .filter-button {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-button.active {
          background-color: #ffd700;
          color: #000000;
        }

        .filter-button:not(.active) {
          background-color: #333;
          color: #ffffff;
        }

        .filter-button:not(.active):hover {
          background-color: #444;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .history-item {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #333;
          transition: all 0.3s ease;
        }

        .history-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .history-item.ongoing {
          border-color: #ffd700;
          background-color: #2a2a1a;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .mall-info h3 {
          margin: 0 0 5px 0;
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
        }

        .car-number {
          font-size: 14px;
          color: #ffd700;
          font-weight: 600;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.completed {
          background-color: #28a745;
          color: #ffffff;
        }

        .status-badge.ongoing {
          background-color: #ffd700;
          color: #000000;
        }

        .history-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 12px;
          color: #888;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .detail-value {
          font-size: 16px;
          color: #ffffff;
          font-weight: 500;
        }

        .charges {
          color: #ffd700;
          font-weight: 600;
          font-size: 18px;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #cccccc;
        }

        @media (max-width: 768px) {
          .controls-section {
            flex-direction: column;
          }

          .search-input {
            min-width: auto;
          }

          .filter-buttons {
            justify-content: center;
          }

          .history-header {
            flex-direction: column;
            gap: 10px;
          }

          .history-details {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .history-details {
            grid-template-columns: 1fr;
          }

          .stats-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="history-container">
        {/* Header */}
        <div ref={headerRef} className="header">
          <button className="back-button" onClick={() => window.history.back()}>
            ←
          </button>
          <div className="header-info">
            <h1>Parking History</h1>
            <p>Your complete parking session records</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{totalVisits}</div>
            <div className="stat-label">Total Visits</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹{totalSpent}</div>
            <div className="stat-label">Total Spent</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{ongoingSessions}</div>
            <div className="stat-label">Ongoing Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹{totalVisits > 0 ? Math.round(totalSpent / totalVisits) : 0}</div>
            <div className="stat-label">Avg. Per Visit</div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by mall, car number, date..."
            className="search-input"
          />
          <div className="filter-buttons">
            <button
              className={`filter-button ${filterStatus === "all" ? "active" : ""}`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className={`filter-button ${filterStatus === "completed" ? "active" : ""}`}
              onClick={() => setFilterStatus("completed")}
            >
              Completed
            </button>
            <button
              className={`filter-button ${filterStatus === "ongoing" ? "active" : ""}`}
              onClick={() => setFilterStatus("ongoing")}
            >
              Ongoing
            </button>
          </div>
        </div>

        {/* History List */}
        <div ref={historyListRef} className="history-list">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className={`history-item ${item.status}`}>
                <div className="history-header">
                  <div className="mall-info">
                    <h3>{item.mallName}</h3>
                    <div className="car-number">{item.carNumber}</div>
                  </div>
                  <div className={`status-badge ${item.status}`}>{item.status}</div>
                </div>

                <div className="history-details">
                  <div className="detail-item">
                    <div className="detail-label">Date & Day</div>
                    <div className="detail-value">
                      {item.date} • {item.day}
                    </div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Entry Time</div>
                    <div className="detail-value">{item.entryTime}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Exit Time</div>
                    <div className="detail-value">{item.exitTime}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Duration</div>
                    <div className="detail-value">{item.duration}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Charges</div>
                    <div className="detail-value charges">
                      {item.status === "ongoing" ? "Calculating..." : `₹${item.charges}`}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3 style={{ fontSize: "24px", margin: "0 0 10px 0" }}>No records found</h3>
              <p style={{ fontSize: "16px", margin: "0" }}>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HistorySection
  