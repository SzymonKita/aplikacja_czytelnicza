import './App.css'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='login' exact element={<LoginPage/>}/>
    </Routes>
  )
}

export default App
