import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Signup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [plates, setPlates] = useState(["", "", ""])
  const [error, setError] = useState("")

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    const plateNumbers = plates.filter((p) => p.trim() !== "").slice(0, 3)
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, plateNumbers })
    });
    try {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || "Signup failed")
        return
      }
      const data = await res.json()
      localStorage.setItem("gms_user", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        plateNumbers: data.plateNumbers || [],
      }))
      onClose?.()
      navigate("/user/home")
    } catch (e) {
      setError("Signup failed")
    }
    

  }

  return (
    <>
             <style jsx>{`
         .signup-modal-backdrop {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           background-color: rgba(0, 0, 0, 0.7);
           backdrop-filter: blur(8px);
           display: flex;
           align-items: center;
           justify-content: center;
           z-index: 1000;
           padding: 20px;
           overflow: hidden;
         }
         
         .signup-modal-content::-webkit-scrollbar {
           width: 8px;
         }
         
         .signup-modal-content::-webkit-scrollbar-track {
           background: #333;
           border-radius: 4px;
         }
         
         .signup-modal-content::-webkit-scrollbar-thumb {
           background: #ffd700;
           border-radius: 4px;
         }
         
         .signup-modal-content::-webkit-scrollbar-thumb:hover {
           background: #ffed4a;
         }
         
         @media (max-height: 600px) {
           .signup-modal-content {
             max-height: 85vh !important;
           }
         }
         
         @media (max-width: 480px) {
           .signup-modal-content {
             padding: 30px 20px !important;
             max-height: 95vh !important;
           }
         }
         
         .signup-modal-content {
           scroll-behavior: smooth;
         }
         
         .signup-modal-content::-webkit-scrollbar {
           width: 6px;
         }
         
         .signup-modal-content::-webkit-scrollbar-track {
           background: #2a2a2a;
           border-radius: 3px;
         }
         
         .signup-modal-content::-webkit-scrollbar-thumb {
           background: #ffd700;
           border-radius: 3px;
         }
         
         .signup-modal-content::-webkit-scrollbar-thumb:hover {
           background: #ffed4a;
         }
         
         /* Prevent background scroll */
         body.modal-open {
           overflow: hidden !important;
           position: fixed;
           width: 100%;
         }
       `}</style>
             <div
         className="signup-modal-backdrop"
         onClick={onClose}
       >
              <div
          className="signup-modal-content"
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "16px",
            padding: "40px",
            width: "100%",
            maxWidth: "450px",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            border: "1px solid #333",
            scrollbarWidth: "thin",
            scrollbarColor: "#ffd700 #333",
          }}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "sticky",
            top: "0",
            right: "20px",
            background: "none",
            border: "none",
            color: "#ffffff",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px",
            lineHeight: "1",
            float: "right",
            zIndex: 10,
            marginBottom: "10px",
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "32px",
              fontWeight: "bold",
              margin: "0 0 10px 0",
            }}
          >
            Sign Up
          </h2>
          <p
            style={{
              color: "#cccccc",
              fontSize: "16px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            Create your account to get started with our parking solutions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "transparent",
                border: "2px solid #333",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ffd700")}
              onBlur={(e) => (e.target.style.borderColor = "#333")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "transparent",
                border: "2px solid #333",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ffd700")}
              onBlur={(e) => (e.target.style.borderColor = "#333")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "transparent",
                border: "2px solid #333",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ffd700")}
              onBlur={(e) => (e.target.style.borderColor = "#333")}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "transparent",
                border: "2px solid #333",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ffd700")}
              onBlur={(e) => (e.target.style.borderColor = "#333")}
            />
          </div>

          {/* Plate numbers (max 3) */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "#ffffff", fontSize: "16px", fontWeight: 500, marginBottom: 8 }}>
              Plate numbers (optional, max 3)
            </label>
            {[0,1,2].map((idx) => (
              <input
                key={idx}
                type="text"
                value={plates[idx]}
                onChange={(e) => {
                  const next = [...plates]
                  next[idx] = e.target.value
                  setPlates(next)
                }}
                placeholder={`Plate #${idx+1} (e.g., GJ14RT3951)`}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "transparent",
                  border: "2px solid #333",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  marginBottom: 10,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ffd700")}
                onBlur={(e) => (e.target.style.borderColor = "#333")}
              />
            ))}
          </div>

          {error && (
            <div style={{ color: "#ff6b6b", marginBottom: 10, fontSize: 14 }}>{error}</div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#ffd700",
              color: "#000000",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginBottom: "20px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#ffed4a"
              e.target.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ffd700"
              e.target.style.transform = "translateY(0px)"
            }}
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#cccccc", fontSize: "16px" }}>Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            style={{
              background: "none",
              border: "none",
              color: "#ffd700",
              fontSize: "16px",
              cursor: "pointer",
              textDecoration: "underline",
              padding: "0",
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default Signup
