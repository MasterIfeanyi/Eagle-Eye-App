import { useState } from 'react'
import SplashScreen from "./Components/SplashScreen"
import HomePage from "./Components/HomePage"
import SignUp from './Components/Signup'
import Login from './Components/Login'
import Layout from "./Layout/Layout"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Welcome from './Components/Welcome'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute'
import MissingRoute from './utils/MissingRoute'

function App() {
  

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path="*" element={<MissingRoute />} /> 
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
