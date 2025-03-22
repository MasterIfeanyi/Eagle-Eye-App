import { useState } from 'react'
import SplashScreen from "./Components/SplashScreen"
import HomePage from "./Components/HomePage"
import Layout from "./Layout/Layout"
import './App.css'

function App() {
  

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Layout>
  )
}

export default App
