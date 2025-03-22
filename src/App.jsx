import { useState } from 'react'
import SplashScreen from "./components/SplashScreen"
import HomePage from "./components/HomePage"
import Layout from "./Layout/Layout"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default App
