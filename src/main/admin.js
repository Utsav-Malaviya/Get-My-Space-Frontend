import AdminDashboardPalladium from "./admin-palladium"
import { Routes, Route } from "react-router-dom"
import AdminDashboardPhoenix from "./admin_phoenix"

const Admin = () => {
  return (
    <Routes>
      <Route path="/palladium" element={<AdminDashboardPalladium />} />
      <Route path="/phoenix" element={<AdminDashboardPhoenix />} />
    </Routes>
  )
}

export default Admin    