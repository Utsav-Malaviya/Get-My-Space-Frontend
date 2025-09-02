import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingConfig from '../components/parking-config';
import './super-mall-management.css';

const SuperMallManagement = () => {
  const [malls, setMalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingMall, setEditingMall] = useState(null);
  const [showParkingConfig, setShowParkingConfig] = useState(false);
  const [selectedMallForConfig, setSelectedMallForConfig] = useState(null);
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    address: '',
    isLive: false,
    offsetOn: 0,
    offsetOff: 0,
    isOffsetEnabled: false
  });

  useEffect(() => {
    // Directly fetch malls without authentication
    fetchMalls();
  }, []);

  const fetchMalls = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.BACKEND_URL}/api/super/malls`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch malls');
      }

      const data = await response.json();
      setMalls(data.malls || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateMall = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http:///api/super/malls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create mall');
      }

      const data = await response.json();
      setMalls(prev => [...prev, data.mall]);
      setShowCreateForm(false);
      setFormData({
        name: '',
        price: '',
        address: '',
        isLive: false,
        offsetOn: 0,
        offsetOff: 0,
        isOffsetEnabled: false
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateMall = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/super/malls/${editingMall._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update mall');
      }

      const data = await response.json();
      setMalls(prev => prev.map(mall => 
        mall._id === editingMall._id ? data.mall : mall
      ));
      setEditingMall(null);
      setFormData({
        name: '',
        price: '',
        address: '',
        isLive: false,
        offsetOn: 0,
        offsetOff: 0,
        isOffsetEnabled: false
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleParkingConfig = (mall) => {
    setSelectedMallForConfig(mall);
    setShowParkingConfig(true);
  };

  const handleConfigUpdate = (updatedConfig) => {
    // Update the mall in the list with new parking config
    setMalls(prev => prev.map(mall => 
      mall._id === selectedMallForConfig._id 
        ? { ...mall, parkingConfig: updatedConfig }
        : mall
    ));
  };

  const handleDeleteMall = async (mallId) => {
    if (!window.confirm('Are you sure you want to delete this mall?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/super/malls/${mallId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete mall');
      }

      setMalls(prev => prev.filter(mall => mall._id !== mallId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleLive = async (mallId) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/super/malls/${mallId}/toggle-live`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to toggle mall status');
      }

      const data = await response.json();
      setMalls(prev => prev.map(mall => 
        mall._id === mallId ? { ...mall, isLive: data.mall.isLive } : mall
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateOffset = async (mallId, offsetData) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/super/malls/${mallId}/offset`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(offsetData)
      });

      if (!response.ok) {
        throw new Error('Failed to update offset settings');
      }

      const data = await response.json();
      setMalls(prev => prev.map(mall => 
        mall._id === mallId ? { ...mall, ...data.mall } : mall
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditing = (mall) => {
    setEditingMall(mall);
    setFormData({
      name: mall.name,
      price: mall.price || '',
      address: mall.address || '',
      isLive: mall.isLive,
      offsetOn: mall.offsetOn || 0,
      offsetOff: mall.offsetOff || 0,
      isOffsetEnabled: mall.isOffsetEnabled || false
    });
  };

  const cancelEditing = () => {
    setEditingMall(null);
    setShowCreateForm(false);
    setFormData({
      name: '',
      price: '',
      address: '',
      isLive: false,
      offsetOn: 0,
      offsetOff: 0,
      isOffsetEnabled: false
    });
  };

  if (loading) {
    return (
      <div className="super-mall-container">
        <div className="loading">Loading malls...</div>
      </div>
    );
  }

  return (
    <div className="super-mall-container">
      <div className="super-mall-header">
        <h1>Mall Management System</h1>
        <button 
          className="create-mall-btn"
          onClick={() => setShowCreateForm(true)}
        >
          Add New Mall
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Create/Edit Form */}
      {(showCreateForm || editingMall) && (
        <div className="mall-form-overlay">
          <div className="mall-form">
            <h2>{editingMall ? 'Edit Mall' : 'Add New Mall'}</h2>
            <form onSubmit={editingMall ? handleUpdateMall : handleCreateMall}>
              <div className="form-group">
                <label>Mall Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter mall name"
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., ₹20/hour"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter mall address"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isLive"
                    checked={formData.isLive}
                    onChange={handleInputChange}
                  />
                  Active Status
                </label>
              </div>

              <div className="offset-settings">
                <h3>Timing Settings</h3>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isOffsetEnabled"
                      checked={formData.isOffsetEnabled}
                      onChange={handleInputChange}
                    />
                    Enable Timing Controls
                  </label>
                </div>

                <div className="form-group">
                  <label>Start Time Offset (minutes)</label>
                  <input
                    type="number"
                    name="offsetOn"
                    value={formData.offsetOn}
                    onChange={handleInputChange}
                    min="0"
                    max="1440"
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label>End Time Offset (minutes)</label>
                  <input
                    type="number"
                    name="offsetOff"
                    value={formData.offsetOff}
                    onChange={handleInputChange}
                    min="0"
                    max="1440"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingMall ? 'Update Mall' : 'Add Mall'}
                </button>
                <button type="button" className="cancel-btn" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Malls List */}
      <div className="malls-grid">
        {malls.map(mall => (
          <div key={mall._id} className="mall-card">
            <div className="mall-header">
              <h3>{mall.name}</h3>
              <div className="mall-status">
                <span className={`status-badge ${mall.isLive ? 'live' : 'offline'}`}>
                  {mall.isLive ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>

            <div className="mall-details">
              {mall.price && <p><strong>Price:</strong> {mall.price}</p>}
              {mall.address && <p><strong>Address:</strong> {mall.address}</p>}
            </div>

            <div className="offset-info">
              <h4>Timing Settings</h4>
              <p><strong>Enabled:</strong> {mall.isOffsetEnabled ? 'Yes' : 'No'}</p>
              {mall.isOffsetEnabled && (
                <>
                  <p><strong>Start Offset:</strong> {mall.offsetOn} minutes</p>
                  <p><strong>End Offset:</strong> {mall.offsetOff} minutes</p>
                </>
              )}
            </div>

            <div className="mall-actions">
              <button 
                className="toggle-btn"
                onClick={() => handleToggleLive(mall._id)}
              >
                {mall.isLive ? 'Deactivate' : 'Activate'}
              </button>
              
              <button 
                className="edit-btn"
                onClick={() => startEditing(mall)}
              >
                Edit
              </button>
              
              <button 
                className="config-btn"
                onClick={() => handleParkingConfig(mall)}
                style={{
                  backgroundColor: '#4CAF50',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Parking Config
              </button>
              
              <button 
                className="delete-btn"
                onClick={() => handleDeleteMall(mall._id)}
              >
                Delete
              </button>
            </div>

            <div className="mall-meta">
              <small>ID: {mall.id}</small>
              <small>Created: {new Date(mall.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>

      {malls.length === 0 && !loading && (
        <div className="no-malls">
          <p>No malls found. Add your first mall to get started.</p>
        </div>
      )}

      {/* Parking Configuration Modal */}
      {showParkingConfig && selectedMallForConfig && (
        <div className="mall-form-overlay">
          <div className="mall-form" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Parking Configuration</h2>
              <button 
                onClick={() => setShowParkingConfig(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            <ParkingConfig 
              mallId={selectedMallForConfig._id}
              mallName={selectedMallForConfig.name}
              onConfigUpdate={handleConfigUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperMallManagement;
