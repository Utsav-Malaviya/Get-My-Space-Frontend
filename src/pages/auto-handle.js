
import { useState } from "react"
import Login from "../components/login"
import Signup from "../components/signup"

const AuthHandler = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const openLogin = () => {
    setShowLogin(true)
    setShowSignup(false)
  }

  const openSignup = () => {
    setShowSignup(true)
    setShowLogin(false)
  }

  const closeModals = () => {
    setShowLogin(false)
    setShowSignup(false)
  }

  return (
    <>
      {/* This is your Login/Signup button that you can place in your navbar */}
      <button
        onClick={openLogin}
        style={{
          backgroundColor: "#ffd700",
          color: "#000000",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
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
        Login / Signup
      </button>

      {/* Modals */}
      <Login isOpen={showLogin} onClose={closeModals} onSwitchToSignup={openSignup} />
      <Signup isOpen={showSignup} onClose={closeModals} onSwitchToLogin={openLogin} />
    </>
  )
}

export default AuthHandler
