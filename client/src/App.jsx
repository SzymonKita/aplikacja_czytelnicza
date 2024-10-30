// src/App.jsx
import './App.css';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
