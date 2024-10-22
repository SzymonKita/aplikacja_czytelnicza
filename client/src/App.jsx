import './App.css'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import Profile from './components/Profile.jsx'
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='login' exact element={<LoginPage/>}/>
        <Route path='profile' exact element={<Profile/>}/>
    </Routes>
  )
}

export default App
