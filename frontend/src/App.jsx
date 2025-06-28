import React from 'react'
import { Routes, Route } from 'react-router-dom'


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/Settingspage'

import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  
  const {authUser, isCheckingAuth} = useAuthStore((state) => state)

  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App