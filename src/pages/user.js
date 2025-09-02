import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/user-navbar'

const UserLayout = () => {
  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <UserNavbar />
      <div style={{ maxWidth: '1550px', margin: '0 auto' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout


