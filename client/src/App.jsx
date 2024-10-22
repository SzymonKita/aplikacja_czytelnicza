// src/App.jsx
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
