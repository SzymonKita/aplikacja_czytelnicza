import React from 'react';
import ReactDOM from 'react-dom/client'; // Importuj z 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Znajdź element w DOM, w którym będziesz renderować aplikację
const rootElement = document.getElementById('root');

// Utwórz root
const root = ReactDOM.createRoot(rootElement);

// Renderuj aplikację
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
