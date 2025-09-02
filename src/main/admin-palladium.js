
import { useState, useEffect, useRef } from "react"



const AdminDashboardPalladium = () => {
  const [sessions, setSessions] = useState([])
  const [filteredSessions, setFilteredSessions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [chartRange, setChartRange] = useState("weekly")
  const totalCapacity = 800

  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  // Load parking sessions for Palladium from backend
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/parking?mall=Palladium%20Mall', { headers: { Accept: 'application/json' } })
        if (!res.ok) return
        const data = await res.json()
        const normalized = (Array.isArray(data) ? data : []).map((s) => ({
          id: s.id,
          carNumber: s.number_plate,
          slotNumber: s.slot || '-',
          entryTime: s.entry_time || '-',
          exitTime: s.exit_time || '-',
          entryDate: s.date || '-',
          exitDate: s.date || '-',
          duration: s.duration || '-',
          charges: s.charges || 0,
          status: String(s.status || 'completed').toLowerCase(),
          createdAt: s.createdAt || s.date || '',
        }))
        setSessions(normalized)
      } catch {}
    }
    loadSessions()
  }, [])

  // Filter sessions based on search and status
  useEffect(() => {
    let filtered = sessions

    if (filterStatus !== "all") {
      filtered = filtered.filter((session) => session.status === filterStatus)
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (session) =>
          session.carNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.slotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.entryDate.includes(searchTerm),
      )
    }

    setFilteredSessions(filtered)
  }, [sessions, filterStatus, searchTerm])

  

  // Statistics
  const stats = {
    totalSessions: sessions.length,
    activeSessions: sessions.filter((s) => s.status === "parked").length,
    completedSessions: sessions.filter((s) => s.status === "completed").length,
    totalRevenue: sessions.filter((s) => s.status === "completed").reduce((sum, s) => sum + (s.charges || 0), 0),
  }

  const formatDate = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")

        // Header animation
        if (headerRef.current) {
          gsap.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
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
        .admin-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #333;
          margin-bottom: 30px;
        }

        .header-info h1 {
          margin: 0 0 5px 0;
          font-size: 28px;
          font-weight: 600;
          color: #ffd700;
        }

        .header-info p {
          margin: 0;
          font-size: 16px;
          color: #cccccc;
        }

        .mall-badge {
          background-color: #2a2a2a;
          border: 1px solid #ffd700;
          border-radius: 8px;
          padding: 10px 20px;
          color: #ffd700;
          font-weight: 600;
        }

        .stats-grid {
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

        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 1px solid #333;
        }

        .tab-button {
          background: none;
          border: none;
          color: #cccccc;
          padding: 15px 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .tab-button.active {
          color: #ffd700;
          border-bottom-color: #ffd700;
        }

        .tab-button:hover {
          color: #ffffff;
        }

        .controls {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
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

        .chart-section {
          background-color: #2a2a2a;
          border-radius: 12px;
          border: 1px solid #333;
          padding: 20px;
        }

        .range-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .range-button {
          background-color: #333;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .range-button.active {
          background-color: #ffd700;
          color: #000;
        }

        .chart-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
          gap: 14px;
          align-items: end;
          height: 360px;
          padding: 10px 0;
        }

        .chart-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }

        .chart-bar-fill {
          width: 100%;
          min-width: 10px;
          background: linear-gradient(180deg, #ffd700, #caa400);
          border-radius: 6px 6px 0 0;
        }

        .chart-bar-value {
          font-size: 12px;
          color: #ffd700;
          font-weight: 700;
        }

        .chart-bar-label {
          font-size: 12px;
          color: #ccc;
          text-align: center;
        }

        .data-table {
          background-color: #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #333;
        }

        .table-header {
          background-color: #333;
          padding: 15px 20px;
          font-weight: 600;
          color: #ffd700;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 100px;
          gap: 15px;
          align-items: center;
        }

        .table-row {
          padding: 15px 20px;
          border-bottom: 1px solid #333;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 100px;
          gap: 15px;
          align-items: center;
          transition: background-color 0.3s ease;
        }

        .table-row:hover {
          background-color: #333;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          text-align: center;
        }

        .status-badge.parked {
          background-color: #ffd700;
          color: #000000;
        }

        .status-badge.completed {
          background-color: #28a745;
          color: #ffffff;
        }

        .form-container {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 30px;
          border: 1px solid #333;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #ffd700;
          text-align: center;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          background-color: #1a1a1a;
          border: 2px solid #333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #ffd700;
        }

        .form-input::placeholder {
          color: #888;
        }

        .datetime-group {
          display: flex;
          gap: 10px;
          align-items: end;
        }

        .datetime-inputs {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .current-time-btn {
          background-color: #333;
          color: #ffffff;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .current-time-btn:hover {
          background-color: #ffd700;
          color: #000000;
        }

        .submit-button {
          width: 100%;
          background-color: #ffd700;
          color: #000000;
          border: none;
          padding: 15px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          background-color: #ffed4a;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }

        .no-data {
          text-align: center;
          padding: 60px 20px;
          color: #cccccc;
        }

        @media (max-width: 768px) {
          .controls {
            flex-direction: column;
          }

          .search-input {
            min-width: auto;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .datetime-inputs {
            grid-template-columns: 1fr;
          }

          .datetime-group {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>

      <div className="admin-container">
        {/* Header */}
        <div ref={headerRef} className="header">
          <div className="header-info">
            <h1>Admin Dashboard</h1>
            <p>Parking Management System</p>
          </div>
          <div className="mall-badge">Palladium Mall</div>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.activeSessions}</div>
            <div className="stat-label">Currently Parked</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completedSessions}</div>
            <div className="stat-label">Completed Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹{stats.totalRevenue}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`tab-button ${activeTab === "entry" ? "active" : ""}`}
            onClick={() => setActiveTab("entry")}
          >
            Entries (All)
          </button>
          <button className={`tab-button ${activeTab === "exit" ? "active" : ""}`} onClick={() => setActiveTab("exit")}>
            Exits (Completed)
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Controls */}
            <div className="controls">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by car number, slot, or date..."
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
                  className={`filter-button ${filterStatus === "parked" ? "active" : ""}`}
                  onClick={() => setFilterStatus("parked")}
                >
                  Parked
                </button>
                <button
                  className={`filter-button ${filterStatus === "completed" ? "active" : ""}`}
                  onClick={() => setFilterStatus("completed")}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="data-table">
              <div className="table-header">
                <div>Car Number</div>
                <div>Slot Number</div>
                <div>Entry Time</div>
                <div>Exit Time</div>
                <div>Date</div>
                <div>Duration</div>
                <div>Charges</div>
                <div>Status</div>
              </div>

              {filteredSessions.length > 0 ? (
                filteredSessions.map((session) => (
                  <div key={session.id} className="table-row">
                    <div style={{ fontWeight: "600" }}>{session.carNumber}</div>
                    <div>{session.slotNumber}</div>
                    <div>{session.entryTime}</div>
                    <div>{session.exitTime || "-"}</div>
                    <div>{session.entryDate}</div>
                    <div>{session.duration || "-"}</div>
                    <div style={{ fontWeight: "600", color: session.charges ? "#ffd700" : "#cccccc" }}>
                      {session.charges ? `₹${session.charges}` : "-"}
                    </div>
                    <div>
                      <span className={`status-badge ${session.status}`}>{session.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <h3 style={{ fontSize: "20px", margin: "0 0 10px 0" }}>No records found</h3>
                  <p style={{ fontSize: "14px", margin: "0" }}>Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Entry Tab - read-only table of parked vehicles */}
        {activeTab === "entry" && (
          <div className="data-table">
            <div className="table-header">
              <div>Car Number</div>
              <div>Slot Number</div>
              <div>Entry Time</div>
              <div>Date</div>
              <div>Status</div>
                </div>
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <div key={session.id} className="table-row">
                  <div style={{ fontWeight: "600" }}>{session.carNumber}</div>
                  <div>{session.slotNumber}</div>
                  <div>{session.entryTime}</div>
                  <div>{session.entryDate}</div>
                  <div>
                    <span className={`status-badge ${session.status}`}>{session.status}</span>
                </div>
              </div>
              ))
            ) : (
              <div className="no-data">
                <h3 style={{ fontSize: "20px", margin: "0 0 10px 0" }}>No records</h3>
              </div>
            )}
          </div>
        )}

        {/* Exit Tab - read-only table of completed sessions */}
        {activeTab === "exit" && (
          <div className="data-table">
            <div className="table-header">
              <div>Car Number</div>
              <div>Slot Number</div>
              <div>Entry Time</div>
              <div>Exit Time</div>
              <div>Date</div>
              <div>Duration</div>
              <div>Charges</div>
              <div>Status</div>
                  </div>
            {sessions.filter((s) => s.status === "completed").length > 0 ? (
              sessions
                .filter((s) => s.status === "completed")
                .map((session) => (
                  <div key={session.id} className="table-row">
                    <div style={{ fontWeight: "600" }}>{session.carNumber}</div>
                    <div>{session.slotNumber}</div>
                    <div>{session.entryTime}</div>
                    <div>{session.exitTime || "-"}</div>
                    <div>{session.exitDate || session.entryDate}</div>
                    <div>{session.duration || "-"}</div>
                    <div style={{ fontWeight: "600", color: session.charges ? "#ffd700" : "#cccccc" }}>
                      {session.charges ? `₹${session.charges}` : "-"}
                </div>
                    <div>
                      <span className={`status-badge ${session.status}`}>{session.status}</span>
              </div>
                  </div>
                ))
            ) : (
              <div className="no-data">
                <h3 style={{ fontSize: "20px", margin: "0 0 10px 0" }}>No exit records</h3>
          </div>
        )}
              </div>
        )}

        
      </div>
    </section>
  )
}

export default AdminDashboardPalladium
