import { useState, useEffect } from 'react'

const ParkingConfig = ({ mallId, mallName, onConfigUpdate }) => {
  const [config, setConfig] = useState({
    totalBasements: 2,
    sections: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    slotsPerSection: 10,
    slotFormat: 'B{level}{section}{index:02d}'
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [newSection, setNewSection] = useState('')

  // Fetch current configuration
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.BACKEND_URL}/api/super/malls/${mallId}/parking-config`)
        if (response.ok) {
          const data = await response.json()
          setConfig(data.mall.parkingConfig)
        }
      } catch (error) {
        console.error('Error fetching parking config:', error)
        setMessage('Error loading configuration')
      } finally {
        setLoading(false)
      }
    }

    if (mallId) {
      fetchConfig()
    }
  }, [mallId])

  const handleUpdateConfig = async () => {
    try {
      setLoading(true)
      setMessage('')
      
      const response = await fetch(`${process.env.BACKEND_URL}/api/super/malls/${mallId}/parking-config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parkingConfig: config }),
      })

      if (response.ok) {
        setMessage('Configuration updated successfully!')
        if (onConfigUpdate) {
          onConfigUpdate(config)
        }
      } else {
        const error = await response.json()
        setMessage(error.error || 'Failed to update configuration')
      }
    } catch (error) {
      console.error('Error updating parking config:', error)
      setMessage('Error updating configuration')
    } finally {
      setLoading(false)
    }
  }

  const addSection = () => {
    if (newSection && !config.sections.includes(newSection.toUpperCase())) {
      setConfig(prev => ({
        ...prev,
        sections: [...prev.sections, newSection.toUpperCase()]
      }))
      setNewSection('')
    }
  }

  const removeSection = (sectionToRemove) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section !== sectionToRemove)
    }))
  }

  const handleSectionChange = (index, value) => {
    const newSections = [...config.sections]
    newSections[index] = value.toUpperCase()
    setConfig(prev => ({
      ...prev,
      sections: newSections
    }))
  }

  if (loading && !config.totalBasements) {
    return <div>Loading configuration...</div>
  }

  return (
    <div style={{ 
      backgroundColor: '#2a2a2a', 
      padding: '20px', 
      borderRadius: '8px', 
      margin: '20px 0',
      border: '1px solid #333'
    }}>
      <h3 style={{ color: '#ffd700', marginBottom: '20px' }}>
        Parking Configuration - {mallName}
      </h3>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Total Basements */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffffff' }}>
            Total Basements:
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={config.totalBasements}
            onChange={(e) => setConfig(prev => ({ ...prev, totalBasements: parseInt(e.target.value) || 1 }))}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #666',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              width: '100px'
            }}
          />
        </div>

        {/* Slots Per Section */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffffff' }}>
            Slots Per Section:
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={config.slotsPerSection}
            onChange={(e) => setConfig(prev => ({ ...prev, slotsPerSection: parseInt(e.target.value) || 1 }))}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #666',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              width: '100px'
            }}
          />
        </div>

        {/* Slot Format */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffffff' }}>
            Slot Format:
          </label>
          <input
            type="text"
            value={config.slotFormat}
            onChange={(e) => setConfig(prev => ({ ...prev, slotFormat: e.target.value }))}
            placeholder="B{level}{section}{index:02d}"
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #666',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              width: '100%'
            }}
          />
          <small style={{ color: '#cccccc', fontSize: '12px' }}>
            Use {'{level}'} for basement number, {'{section}'} for section letter, {'{index:02d}'} for slot number
          </small>
        </div>

        {/* Sections */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffffff' }}>
            Sections:
          </label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            {config.sections.map((section, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="text"
                  value={section}
                  onChange={(e) => handleSectionChange(index, e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #666',
                    backgroundColor: '#1a1a1a',
                    color: '#ffffff',
                    width: '40px',
                    textAlign: 'center'
                  }}
                />
                <button
                  onClick={() => removeSection(section)}
                  style={{
                    background: '#ff4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          {/* Add new section */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="New section letter"
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #666',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                width: '120px'
              }}
            />
            <button
              onClick={addSection}
              disabled={!newSection}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: newSection ? '#4CAF50' : '#666',
                color: '#ffffff',
                cursor: newSection ? 'pointer' : 'not-allowed'
              }}
            >
              Add Section
            </button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#ffffff' }}>
            Preview (First few slots):
          </label>
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '10px', 
            borderRadius: '4px',
            fontSize: '12px',
            color: '#cccccc'
          }}>
            {config.sections.slice(0, 3).map(section => (
              <div key={section}>
                {Array.from({ length: Math.min(3, config.slotsPerSection) }, (_, i) => {
                  const slotNumber = config.slotFormat
                    .replace('{level}', '1')
                    .replace('{section}', section)
                    .replace('{index:02d}', (i + 1).toString().padStart(2, '0'))
                  return slotNumber
                }).join(', ')}
              </div>
            ))}
            {config.sections.length > 3 && <div>...</div>}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div style={{ 
            padding: '10px', 
            borderRadius: '4px', 
            backgroundColor: message.includes('Error') ? '#ff4444' : '#4CAF50',
            color: '#ffffff'
          }}>
            {message}
          </div>
        )}

        {/* Update Button */}
        <button
          onClick={handleUpdateConfig}
          disabled={loading}
          style={{
            padding: '12px 24px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: loading ? '#666' : '#ffd700',
            color: loading ? '#999' : '#000000',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '16px'
          }}
        >
          {loading ? 'Updating...' : 'Update Configuration'}
        </button>
      </div>
    </div>
  )
}

export default ParkingConfig
