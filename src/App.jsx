import { useState } from 'react'
import SplashScreen from "./Components/SplashScreen"
import HomePage from "./Components/HomePage"
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Layout from "./Layout/Layout"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Welcome from './Components/Welcome'

function App() {
  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
      </Routes>
    </Layout>
  )
}

export default App
