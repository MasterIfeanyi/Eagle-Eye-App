
import SplashScreen from "./_components/SplashScreen"
import HomePage from "./_components/HomePage"
import SignUp from './_components/Signup'
import Login from './_components/Login'
import Layout from "./Layout/Layout"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Welcome from './_components/Welcome'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute'
import MissingRoute from './utils/MissingRoute'
import ReportPage from './_components/ReportPage'
import SubmitPage from './_components/SubmitPage'

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
          <Route path="/report" element={<ReportPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="*" element={<MissingRoute />} /> 
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
