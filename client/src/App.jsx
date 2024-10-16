// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import Register from "./Register";
import Login from "./Login";
import Home from "./Home"; // Strona dla wszystkich użytkowników
import Dashboard from "./Dashboard"; // Strona tylko dla zalogowanych

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='login' exact element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
} 

export default App;
