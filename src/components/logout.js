import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("gms_user")
        navigate("/")
    }
    return (
        <button 
            onClick={handleLogout}
            style={{
                backgroundColor: "#ffd700",
                color: "#000000",
                border: "none",
                padding: "10px 20px",
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
            Logout
        </button>
    )
}

export default Logout