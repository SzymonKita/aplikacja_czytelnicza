import './App.css'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import Profile from './components/Profile.jsx'
import BookList from './components/BookList/BookList.jsx'
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='login' exact element={<LoginPage/>}/>
        <Route path='profile' exact element={<Profile/>}/>
        <Route path='booklist' exact element={<BookList/>}/>
    </Routes>
  )
}

export default App
