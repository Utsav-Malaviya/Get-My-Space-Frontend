import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const PrePlanSection = () => {
  const navigate = useNavigate()
  const [selectedMall, setSelectedMall] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [slotData, setSlotData] = useState({})
  const [edaImage, setEdaImage] = useState(null) // New: For EDA image
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const dateInputRef = useRef(null)

  const [malls, setMalls] = useState([])
  const [mallsLoading, setMallsLoading] = useState(true)

  const timeSlots = [
    { key: "visits_morning", label: "Morning (6–12)", price: 30, timeRange: "6:00–12:00" },
    { key: "visits_afternoon", label: "Afternoon (12–17)", price: 35, timeRange: "12:00–17:00" },
    { key: "visits_evening", label: "Evening (17–21)", price: 40, timeRange: "17:00–21:00" },
    { key: "visits_night", label: "Night (21–24)", price: 25, timeRange: "21:00–24:00" },
    { key: "visits_late_night", label: "Late Night (0–6)", price: 20, timeRange: "0:00–6:00" },
  ]

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Check if selected date is weekend or holiday
  const isWeekendOrHoliday = (dateString) => {
    const date = new Date(dateString)
    const dayOfWeek = date.getDay()

    // Weekend (Saturday = 6, Sunday = 0)
    if (dayOfWeek === 0 || dayOfWeek === 6) return true

    // Add some dummy holidays (you can expand this list)
    const holidays = [
      "2024-01-26", // Republic Day
      "2024-03-08", // Holi
      "2024-08-15", // Independence Day
      "2024-10-02", // Gandhi Jayanti
      "2024-10-24", // Diwali
      "2024-12-25", // Christmas
    ]

    return holidays.includes(dateString)
  }

  // Fetch malls from API on component mount
  useEffect(() => {
    const fetchMalls = async () => {
      try {
        setMallsLoading(true)
        const response = await fetch('http://localhost:5000/api/malls?live=true')
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error('Failed to fetch malls')
        }

        // Transform malls data: set id to first word of name and add default values
        const transformedMalls = data.map(mall => ({
          id: mall.name.split(' ')[0].toLowerCase(), // First word of name as id
          name: mall.name,
          location: mall.address || 'Location not available',
          totalSpots: 500, // Default value since not in API
          originalId: mall.id, // Keep original id for reference
          price: mall.price,
          image: mall.image,
          isLive: mall.isLive
        }))

        setMalls(transformedMalls)
      } catch (error) {
        console.error('Error fetching malls:', error)
        setMalls([])
      } finally {
        setMallsLoading(false)
      }
    }

    fetchMalls()
  }, [])

  // Fetch slot data when selectedDate changes
  const [features, setFeatures] = useState({})
  useEffect(() => {
    if (!selectedDate) return
    setLoading(true)
    setEdaImage(null) // Reset on new date selection

    // Slot data API to return the predicted number of cars for each time slot
    fetch(`http://127.0.0.1:8000/api/predict_visits/?date=${selectedDate}`)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => {
        setSlotData(data.predictions || {})
        setFeatures(data.features || {})
      })
      .catch((err) => {
        console.error("API error:", err)
        setSlotData({})
        setFeatures({})
      })

    // EDA Image API
    fetch(`http://127.0.0.1:8000/api/predict_visits_eda/?date=${selectedDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("Image fetch error")
        return res.blob()
      })
      .then((blob) => {
        setEdaImage(URL.createObjectURL(blob))
      })
      .catch((err) => {
        console.error("EDA Image error:", err)
        setEdaImage(null)
      })
      .finally(() => setLoading(false))
  }, [selectedDate])

  const handleOpenCalendar = () => {
    const input = dateInputRef.current
    if (input && typeof input.showPicker === "function") {
      input.showPicker()
    } else if (input) {
      input.focus()
    }
  }


  const handleTimeSlotSelect = (slotKey) => {
    setSelectedTimeSlot(slotKey)
  }
  
  const handleMallSelect = (mall) => {
    setSelectedMall(mall);
  };

  const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
  };

  const getOccupancyColor = (percent) => {
    if (percent >= 80) return "#FF6B6B" // High occupancy - red
    if (percent >= 50) return "#FFD700" // Medium occupancy - yellow
    return "#4ECDC4" // Low occupancy - green
  }

  const getOccupancyLabel = (percent) => {
    if (percent >= 80) return "High"
    if (percent >= 50) return "Medium"
    return "Low"
  }

  // Fun labels for time slots
  const funSlotLabels = {
    "visits_morning": "🌅 Morning Rush",
    "visits_afternoon": "🌞 Afternoon Buzz",
    "visits_evening": "🌆 Evening Crowd",
    "visits_night": "🌙 Night Owls",
    "visits_late_night": "🦉 Late Night Quiet",
  }

  const total = Object.values(slotData).reduce(
    (a, b) => a + (parseFloat(b) || 0),
    0,
  )
  const slotPercentages = timeSlots.map((slot) => {
    const value = parseFloat(slotData[slot.key]) || 0
    return {
      ...slot,
      value,
      percent: total > 0 ? Math.round((value / total) * 100) : 0,
      funLabel: funSlotLabels[slot.key] || slot.label,
    }
  })

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
        overflow: "auto",
        height: "auto",
      }}
    >
      <style jsx>{`
        html, body {
          overflow-x: hidden;
          overflow-y: auto;
          height: auto;
        }
        
        section {
          overflow: visible !important;
          height: auto !important;
        }
        
        .preplan-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          overflow: visible;
          position: relative;
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

        .selection-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }

        .selection-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 25px;
          border: 1px solid #333;
        }

        .selection-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #ffd700;
        }

        .mall-dropdown {
          width: 100%;
          padding: 15px;
          background-color: #1a1a1a;
          border: 2px solid #333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .mall-dropdown:focus {
          border-color: #ffd700;
        }

        .mall-dropdown option {
          background-color: #1a1a1a;
          color: #ffffff;
        }

        .date-row {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .date-input {
          width: 100%;
          padding: 15px;
          background-color: #1a1a1a;
          border: 2px solid #333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .date-input:focus {
          border-color: #ffd700;
        }

        .calendar-button {
          background-color: #ffd700;
          color: #000000;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          height: 54px;
        }

        .calendar-button:hover {
          background-color: #ffed4a;
          transform: translateY(-2px);
        }

        .selected-info {
          margin-top: 15px;
          padding: 15px;
          background-color: #1a1a1a;
          border-radius: 8px;
          border-left: 4px solid #ffd700;
        }

        .selected-info h4 {
          margin: 0 0 5px 0;
          color: #ffffff;
        }

        .selected-info p {
          margin: 0;
          color: #cccccc;
          font-size: 14px;
        }

        .date-info {
          margin-top: 15px;
          padding: 10px;
          background-color: #1a1a1a;
          border-radius: 8px;
          text-align: center;
        }

        .date-type {
          font-size: 14px;
          font-weight: 600;
          color: #ffd700;
        }
        
        /* New styles for analysis section */
        .analysis-section {
            background-color: #2a2a2a;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
        }
        .analysis-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .analysis-header h2 {
            margin: 0;
            font-size: 2rem;
            color: #ffd700;
        }
        .analysis-header p {
            margin: 5px 0 0 0;
            font-size: 1rem;
            color: #ccc;
        }
        .image-container {
            margin-bottom: 20px;
            text-align: center;
        }
        .eda-image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            background-color: #333;
            border: 2px solid #444;
        }
        .loading-text {
            text-align: center;
            font-size: 1.2rem;
            padding: 40px;
        }
        /* End of new styles */

        .timeslots-section {
          margin-bottom: 40px;
        }

        .timeslots-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }

        .timeslots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .timeslot-card {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          border: 2px solid #333;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .timeslot-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .timeslot-card.selected {
          border-color: #ffd700;
          background-color: #3c3c2a;
        }

        .timeslot-card.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .timeslot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .timeslot-label {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
        }

        .price-tag {
          background-color: #ffd700;
          color: #000000;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .timeslot-time {
          font-size: 14px;
          color: #cccccc;
          margin-bottom: 15px;
        }

        .occupancy-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .occupancy-bar {
          flex: 1;
          height: 8px;
          background-color: #333;
          border-radius: 4px;
          overflow: hidden;
        }

        .occupancy-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .occupancy-text {
          font-size: 12px;
          font-weight: 600;
        }

        .booking-section {
          text-align: center;
          padding: 30px;
          background-color: #2a2a2a;
          border-radius: 12px;
          border: 1px solid #333;
        }

        .booking-button {
          background-color: #ffd700;
          color: #000000;
          border: none;
          padding: 15px 40px;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .booking-button:hover {
          background-color: #ffed4a;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }

        .booking-button:disabled {
          background-color: #666;
          color: #999;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .booking-summary {
          margin-bottom: 20px;
          padding: 20px;
          background-color: #1a1a1a;
          border-radius: 8px;
          text-align: left;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .summary-label {
          color: #cccccc;
        }

        .summary-value {
          color: #ffffff;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .selection-section {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .timeslots-grid {
            grid-template-columns: 1fr;
          }

          .timeslot-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>

      <div className="preplan-container">
        {/* Header */}
        <div ref={headerRef} className="header">
          <button className="back-button" onClick={() => navigate("/user/home") }>
            ←
          </button>
          <div className="header-info">
            <h1>Pre-Plan Parking</h1>
            <p>Reserve your parking spot in advance</p>
          </div>
        </div>

        <div ref={contentRef}>
          {/* Selection Section */}
          <div className="selection-section">
            {/* Mall Selection */}
            <div className="selection-card">
              <h3 className="selection-title">Select Mall</h3>
              {mallsLoading ? (
                <div style={{ 
                  padding: "15px", 
                  textAlign: "center", 
                  color: "#cccccc",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "8px",
                  border: "2px solid #333"
                }}>
                  Loading malls...
                </div>
              ) : malls.length === 0 ? (
                <div style={{ 
                  padding: "15px", 
                  textAlign: "center", 
                  color: "#ff6b6b",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "8px",
                  border: "2px solid #ff6b6b"
                }}>
                  No live malls available at the moment.
                </div>
              ) : (
                <>
                  <select
                    className="mall-dropdown"
                    value={selectedMall?.id || ""}
                    onChange={(e) => {
                      const mall = malls.find((m) => m.id === e.target.value)
                      if (mall) handleMallSelect(mall)
                    }}
                  >
                    <option value="">Choose a mall...</option>
                    {malls.map((mall) => (
                      <option key={mall.id} value={mall.id}>
                        {mall.name}
                      </option>
                    ))}
                  </select>

                  {selectedMall && (
                    <div className="selected-info">
                      <h4>{selectedMall.name}</h4>
                      <p>{selectedMall.location}</p>
                      <p>Total Spots: {selectedMall.totalSpots}</p>
                      {selectedMall.price && (
                        <p>Price: {selectedMall.price}</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Date Selection */}
            <div className="selection-card">
              <h3 className="selection-title">Select Date</h3>
              <div className="date-row">
                <input
                  ref={dateInputRef}
                  type="date"
                  className="date-input"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={getTodayDate()}
                />
                <button type="button" className="calendar-button" onClick={handleOpenCalendar}>
                  Open Calendar
                </button>
              </div>

              {selectedDate && (
                <div className="date-info">
                  <div className="date-type">{isWeekendOrHoliday(selectedDate) ? "Weekend/Holiday" : "Weekday"}</div>
                  <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#cccccc" }}>
                    {isWeekendOrHoliday(selectedDate) ? "Higher occupancy expected" : "Normal occupancy expected"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* --- NEW ANALYSIS SECTION --- */}
          {loading && <div className="loading-text">Analyzing data for {selectedDate}...</div>}
          
          {!loading && selectedDate && selectedMall && (
            <div className="analysis-section">
                <div className="analysis-header">
                    <h2>{selectedMall.name} - Analysis</h2>
                    <p>Date: {selectedDate}</p>
                </div>
                {edaImage ? (
                    <div className="image-container">
                        <img src={edaImage} alt={`EDA for ${selectedDate}`} className="eda-image" />
                    </div>
                ) : (
                    <div className="loading-text">EDA Image not available.</div>
                )}
            </div>
          )}
          {/* --- END OF NEW ANALYSIS SECTION --- */}


          {/* Time Slots Section */}
          {selectedMall && selectedDate && (
            <div className="timeslots-section">
              <h2 className="timeslots-title">Select an Available Time Slot</h2>
              <div className="timeslots-grid">
                {loading ? (
                  <div className="loading-text">Loading occupancy data...</div>
                ) : (
                  slotPercentages.map((slot) => (
                    <div
                      key={slot.key}
                      className={`timeslot-card ${selectedTimeSlot === slot.key ? "selected" : ""}`}
                      onClick={() => handleTimeSlotSelect(slot.key)}
                    >
                      <div className="timeslot-header">
                        <div className="timeslot-label">{slot.funLabel}</div>
                        <div className="price-tag">₹{slot.price}/hr</div>
                      </div>
                      <div className="timeslot-time">{slot.timeRange}</div>
                      <div className="occupancy-info">
                        <div className="occupancy-bar">
                          <div
                            className="occupancy-fill"
                            style={{
                              width: `${slot.percent}%`,
                              backgroundColor: getOccupancyColor(slot.percent),
                            }}
                          ></div>
                        </div>
                        <div className="occupancy-text" style={{ color: getOccupancyColor(slot.percent)}}> 
                          {slot.percent}% ({getOccupancyLabel(slot.percent)})
                        </div>
                      </div>
                      <div style={{ marginTop: "10px", color: "#ccc", fontSize: "14px" }}>
                        Predicted: <span style={{fontWeight: "bold", color: "#fff"}}>{Math.round(slot.value)} cars</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PrePlanSection