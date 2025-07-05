import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import  { Loader }from 'lucide-react'
import { axiosInstance } from './lib/axios'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/Settingspage'
import { Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
 
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  
  
  const {authUser,checkAuth , isCheckingAuth} = useAuthStore();
 const { theme } =  useThemeStore()
  useEffect(() => {
   
        // document.documentElement.setAttribute("data-theme", theme); // Set your desired theme here
checkAuth();
  }, [checkAuth]);
  
  console.log("Auth User:", authUser);  
if (isCheckingAuth && !authUser) {
    return (<div className='flex items-center justify-center h-screen'>
      <Loader className='w-10 h-10 text-blue-500 animate-spin' />
      </div>)
  }
  return (
    <div className='pt-16' data-theme={theme}>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
      <Route path="/" element={authUser ?  <HomePage /> : <Navigate to="/login" />} />
      <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
<Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App;