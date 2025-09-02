import React from "react"   
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

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
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      try { localStorage.setItem('gms_user', JSON.stringify(data)) } catch (e) {}
      onClose();
      navigate("/user/home", { replace: true });
    } else {
      alert(data.error);
    }
  }


  return (
    <>
      <style jsx>{`
        .login-modal-backdrop {
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
        
        .login-modal-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .login-modal-content::-webkit-scrollbar-track {
          background: #333;
          border-radius: 4px;
        }
        
        .login-modal-content::-webkit-scrollbar-thumb {
          background: #ffd700;
          border-radius: 4px;
        }
        
        .login-modal-content::-webkit-scrollbar-thumb:hover {
          background: #ffed4a;
        }
        
        @media (max-height: 600px) {
          .login-modal-content {
            max-height: 85vh !important;
          }
        }
        
        @media (max-width: 480px) {
          .login-modal-content {
            padding: 30px 20px !important;
            max-height: 95vh !important;
          }
        }
        
        .login-modal-content {
          scroll-behavior: smooth;
        }
        
        .login-modal-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .login-modal-content::-webkit-scrollbar-track {
          background: #2a2a2a;
          border-radius: 3px;
        }
        
        .login-modal-content::-webkit-scrollbar-thumb {
          background: #ffd700;
          border-radius: 3px;
        }
        
        .login-modal-content::-webkit-scrollbar-thumb:hover {
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
        className="login-modal-backdrop"
        onClick={onClose}
      >
              <div
          className="login-modal-content"
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
            Sign In
          </h2>
          <p
            style={{
              color: "#cccccc",
              fontSize: "16px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            Enter your email and password to access your account.
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
              Email or Phone
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email or phone"
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
              placeholder="Enter Password"
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
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#cccccc", fontSize: "16px" }}>Don't have an account? </span>
          <button
            onClick={onSwitchToSignup}
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
            Sign up
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login