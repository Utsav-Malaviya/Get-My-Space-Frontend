import { useRef, useState, useEffect } from "react"

const Paladium = () => {
  const scrollContainerRef = useRef(null)
  const [parkingData, setParkingData] = useState([])
  const [currentLevel, setCurrentLevel] = useState("B1")
  const [mallConfig, setMallConfig] = useState({
    totalBasements: 2,
    sections: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    slotsPerSection: 10,
    slotFormat: 'B{level}{section}{index:02d}'
  })

  // Fetch mall configuration from backend
  useEffect(() => {
    const fetchMallConfig = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/malls?live=true`)
        const malls = await response.json()
        const palladiumMall = malls.find(mall => 
          mall.name.toLowerCase().includes('palladium')
        )
        if (palladiumMall && palladiumMall.parkingConfig) {
          setMallConfig(palladiumMall.parkingConfig)
          // Set initial level to first basement
          setCurrentLevel(`B${palladiumMall.parkingConfig.totalBasements > 0 ? 1 : 1}`)
        }
      } catch (error) {
        console.error('Error fetching mall config:', error)
      }
    }
    fetchMallConfig()
  }, [])

  const generateParkingData = () => {
    const spots = []
    const levels = []
    
    // Generate basement levels based on configuration
    for (let i = 1; i <= mallConfig.totalBasements; i++) {
      levels.push(`B${i}`)
    }
    
    levels.forEach((level) => {
      mallConfig.sections.forEach((section) => {
        for (let i = 1; i <= mallConfig.slotsPerSection; i++) {
          const spotNumber = mallConfig.slotFormat
            .replace('{level}', level.replace('B', ''))
            .replace('{section}', section)
            .replace('{index:02d}', i.toString().padStart(2, "0"))
          
          spots.push({
            id: `${level}-${section}-${i}`,
            number: spotNumber,
            status: "empty",
            level,
            section,
          })
        }
      })
    })
    return spots
  }

  // Populate parking data when config changes
  useEffect(() => {
    if (mallConfig.totalBasements > 0) {
      setParkingData(generateParkingData())
    }
  }, [mallConfig])

  // Normalize slot codes from API
  const normalizeSlotCode = (rawSlot) => {
    if (!rawSlot || typeof rawSlot !== "string") return ""
    const upper = rawSlot.toUpperCase().trim()
    
    // Try to match the configured format
    const formatRegex = mallConfig.slotFormat
      .replace('{level}', '(\\d+)')
      .replace('{section}', '([A-Z])')
      .replace('{index:02d}', '(\\d{1,2})')
    
    const match = upper.match(new RegExp(`^${formatRegex}$`))
    if (!match) return upper
    
    const levelNum = match[1]
    const section = match[2]
    const index = match[3].padStart(2, "0")
    return `B${levelNum}${section}${index}`
  }

  // Fetch occupancy from backend and apply to parking data
  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/mall/occupancy?mall=Palladium`, {
          headers: { 'Accept': 'application/json' }
        })
        if (!response.ok) return
        const records = await response.json()
        const normalized = (records || [])
          .filter((r) => (r.mall || "").toLowerCase() === "palladium")
          .map((r) => normalizeSlotCode(r.slot))

        const occupiedSlotNumbers = new Set(normalized)

        // Derive levels/sections and max index per section from DB
        const levelSectionToMax = new Map()
        normalized.forEach((code) => {
          const m = code.match(/^(B\d)([A-Z])(\d{2})$/)
          if (!m) return
          const levelKey = m[1]
          const sectionKey = m[2]
          const idx = parseInt(m[3], 10)
          const key = `${levelKey}-${sectionKey}`
          const current = levelSectionToMax.get(key) || mallConfig.slotsPerSection
          if (idx > current) levelSectionToMax.set(key, idx)
        })

        // Build a new parking map that at least covers DB slots
        const derived = []
        const allLevels = new Set()
        const allSections = new Set(mallConfig.sections)
        
        // Add configured levels
        for (let i = 1; i <= mallConfig.totalBasements; i++) {
          allLevels.add(`B${i}`)
        }
        
        normalized.forEach((code) => {
          const m = code.match(/^(B\d)([A-Z])\d{2}$/)
          if (m) {
            allLevels.add(m[1])
            allSections.add(m[2])
          }
        })

        Array.from(allLevels).forEach((level) => {
          Array.from(allSections).forEach((section) => {
            const key = `${level}-${section}`
            const maxIdx = levelSectionToMax.get(key) || mallConfig.slotsPerSection
            for (let i = 1; i <= maxIdx; i++) {
              const number = `${level}${section}${i.toString().padStart(2, "0")}`
              derived.push({
                id: `${level}-${section}-${i}`,
                number,
                status: occupiedSlotNumbers.has(number) ? "occupied" : "empty",
                level,
                section,
              })
            }
          })
        })

        setParkingData(derived.length > 0 ? derived : generateParkingData())
      } catch (err) {
        console.warn('Occupancy fetch failed', err)
      }
    }

    if (mallConfig.totalBasements > 0) {
      fetchOccupancy()
    }
  }, [mallConfig])

  // Poll backend every 3s to ensure UI stays in sync
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/mall/occupancy?mall=Palladium`, {
          headers: { 'Accept': 'application/json' }
        })
        if (!response.ok) return
        const records = await response.json()
        const normalized = (records || [])
          .filter((r) => (r.mall || "").toLowerCase() === "palladium")
          .map((r) => normalizeSlotCode(r.slot))

        const occupiedSlotNumbers = new Set(normalized)
        setParkingData((prev) => prev.map((spot) => ({
          ...spot,
          status: occupiedSlotNumbers.has(spot.number) ? "occupied" : "empty",
        })))
      } catch (_) {}
    }, 3000)
    return () => clearInterval(interval)
  }, [mallConfig])

  // Live updates via backend SSE
  useEffect(() => {
    const es = new EventSource(`${process.env.BACKEND_URL}/api/mall/occupancy/stream?mall=Palladium`)
    const applyFromSlotArray = (slotArray) => {
      const occupied = new Set((slotArray || []).filter((p) => Array.isArray(p) && p[1] === 1).map((p) => String(p[0]).toUpperCase()))
      setParkingData((prev) => prev.map((spot) => ({
        ...spot,
        status: occupied.has(String(spot.number).toUpperCase()) ? 'occupied' : 'empty',
      })))
    }
    es.addEventListener('occupancy', (ev) => {
      try {
        const payload = JSON.parse(ev.data)
        if (payload && Array.isArray(payload.slot_array)) {
          applyFromSlotArray(payload.slot_array)
        }
      } catch (_) {}
    })
    es.onerror = () => {
      try { es.close() } catch (_) {}
    }
    return () => {
      try { es.close() } catch (_) {}
    }
  }, [])

  // Calculate statistics for current level
  const currentLevelData = parkingData.filter((spot) => spot.level === currentLevel)
  const stats = currentLevelData.reduce(
    (accumulator, spot) => {
      if (spot.status === "empty") accumulator.empty += 1
      else accumulator.occupied += 1
      return accumulator
    },
    { empty: 0, occupied: 0 },
  )

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const renderParkingSection = (sectionLetter) => {
    const sectionSpots = currentLevelData.filter((spot) => spot.section === sectionLetter)
    if (sectionSpots.length === 0) return null

    // Chunk into rows of 4
    const rows = []
    for (let i = 0; i < sectionSpots.length; i += 4) {
      rows.push(sectionSpots.slice(i, i + 4))
    }

    return (
      <div key={`${currentLevel}-${sectionLetter}`} className="parking-section">
        <div className="section-header">
          <h3 style={{ color: "#ffffff", fontSize: "16px", margin: "0 0 15px 0", textAlign: "center" }}>
            Section {sectionLetter}
          </h3>
        </div>

        <div className="parking-layout">
          {rows.map((row, idx) => (
            <>
              <div key={`${sectionLetter}-row-${idx}`} className="parking-row">
                {row.map((spot) => (
                  <div key={spot.id} className={`parking-spot ${spot.status}`}>
                    <span className="spot-number">{spot.number}</span>
                  </div>
                ))}
              </div>
              {idx < rows.length - 1 && (
                <div key={`${sectionLetter}-lane-${idx}`} className="driving-lane">
                  <div className="lane-line"></div>
                </div>
              )}
            </>
          ))}
        </div>

        <div className="entry-label">
          <span>Entry/Exit</span>
        </div>
      </div>
    )
  }

  // Generate level buttons dynamically
  const generateLevelButtons = () => {
    const buttons = []
    for (let i = 1; i <= mallConfig.totalBasements; i++) {
      const level = `B${i}`
      buttons.push(
        <button
          key={level}
          className={`level-button ${currentLevel === level ? "active" : ""}`}
          onClick={() => setCurrentLevel(level)}
        >
          Basement {i} ({level})
        </button>
      )
    }
    return buttons
  }

  // Split sections into rows for better layout
  const splitSectionsIntoRows = () => {
    const sections = mallConfig.sections
    const midPoint = Math.ceil(sections.length / 2)
    return [
      sections.slice(0, midPoint),
      sections.slice(midPoint)
    ]
  }

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", color: "#ffffff" }}>
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #333;
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
          font-size: 20px;
          font-weight: 600;
        }

        .header-info p {
          margin: 0;
          font-size: 14px;
          color: #cccccc;
        }

        .level-navigation {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          border-bottom: 1px solid #333;
          flex-wrap: wrap;
        }

        .level-button {
          background-color: #333;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .level-button:hover {
          background-color: #ffd700;
          color: #000000;
          transform: translateY(-2px);
        }

        .level-button.active {
          background-color: #ffd700;
          color: #000000;
        }

        .stats-section {
          padding: 20px;
          border-bottom: 1px solid #333;
        }

        .stats-title {
          color: #ffd700;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .stats-row {
          display: flex;
          gap: 30px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .stat-item {
          color: #ffffff;
          font-size: 16px;
        }

        .stat-number {
          font-weight: bold;
          margin-right: 5px;
          color: #ffd700;
        }

        .legend {
          display: flex;
          gap: 20px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 2px;
        }

        .legend-color.empty {
          background-color: #4a4a4a;
        }

        .legend-color.occupied {
          background-color: #ffd700;
        }

        .parking-container {
          position: relative;
          padding: 20px;
        }

        .scroll-controls {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 10px;
        }

        .scroll-button {
          background-color: #ffd700;
          color: #000000;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          flex: 1;
          max-width: 150px;
        }

        .scroll-button:hover {
          background-color: #ffed4a;
          transform: translateY(-2px);
        }

        .parking-levels {
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 20px;
        }

        .parking-levels::-webkit-scrollbar {
          height: 8px;
        }

        .parking-levels::-webkit-scrollbar-track {
          background: #333;
          border-radius: 4px;
        }

        .parking-levels::-webkit-scrollbar-thumb {
          background: #ffd700;
          border-radius: 4px;
        }

        .level-sections {
          display: flex;
          gap: 40px;
          min-width: max-content;
        }

        .level-rows {
          display: flex;
          flex-direction: column;
          gap: 40px;
          min-width: max-content;
        }

        .level-row {
          display: flex;
          gap: 40px;
          min-width: max-content;
        }

        .parking-section {
          background-color: #2a2a2a;
          border-radius: 12px;
          padding: 25px;
          min-width: 320px;
          border: 1px solid #333;
          flex-shrink: 0;
        }

        .section-header {
          margin-bottom: 20px;
        }

        .parking-layout {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .parking-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .driving-lane {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .lane-line {
          width: 100%;
          height: 2px;
          background: repeating-linear-gradient(
            to right,
            #666 0px,
            #666 20px,
            transparent 20px,
            transparent 40px
          );
        }

        .parking-spot {
          width: 90px;
          height: 60px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          border: 2px solid transparent;
        }

        .parking-spot.empty {
          background-color: #4a4a4a;
          border-color: #666;
        }

        .parking-spot.empty:hover {
          background-color: #5a5a5a;
          border-color: #ffd700;
          transform: scale(1.05);
        }

        .parking-spot.occupied {
          background-color: #ffd700;
          border-color: #ffed4a;
          color: #000000;
          cursor: default;
          transform: scale(1.02);
        }

        .spot-number {
          font-size: 11px;
          font-weight: 600;
          margin-top: 4px;
        }

        .entry-label {
          text-align: center;
          color: #cccccc;
          font-size: 14px;
          font-weight: 600;
          padding-top: 15px;
          border-top: 2px dashed #666;
        }

        @media (max-width: 768px) {
          .stats-row {
            gap: 15px;
          }

          .legend {
            gap: 15px;
          }

          .level-sections {
            gap: 20px;
          }

          .parking-section {
            min-width: 280px;
            padding: 20px;
          }

          .parking-spot {
            width: 80px;
            height: 55px;
          }
        }

        @media (max-width: 480px) {
          .scroll-controls {
            flex-direction: column;
          }

          .scroll-button {
            max-width: none;
          }

          .parking-section {
            min-width: 260px;
            padding: 15px;
          }

          .parking-spot {
            width: 75px;
            height: 50px;
          }

          .spot-number {
            font-size: 10px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="header-info">
          <h1>Palladium mall parking</h1>
          <p>Sarkhej-Gandhinagar Highway, Thaltej cross road, Ahmedabad. View on maps</p>
        </div>
      </div>

      {/* Level Navigation */}
      <div className="level-navigation">
        {generateLevelButtons()}
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2 className="stats-title">Parking View - {currentLevel}</h2>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-number">{stats.empty}</span>
            <span>Empty</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.occupied}</span>
            <span>Occupied</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{currentLevelData.length}</span>
            <span>Total Spots</span>
          </div>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-color empty"></div>
            <span>Empty</span>
          </div>
          <div className="legend-item">
            <div className="legend-color occupied"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* Parking Container */}
      <div className="parking-container">
        <div className="scroll-controls">
          <button className="scroll-button" onClick={scrollLeft}>
            ← Scroll Left
          </button>
          <button className="scroll-button" onClick={scrollRight}>
            Scroll Right →
          </button>
        </div>

        <div className="parking-levels" ref={scrollContainerRef}>
          <div className="level-rows">
            {splitSectionsIntoRows().map((sectionRow, rowIndex) => (
              <div key={`row-${rowIndex}`} className="level-row">
                {sectionRow.map((section) => renderParkingSection(section))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paladium