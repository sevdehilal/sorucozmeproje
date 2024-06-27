import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  //isAuthenticated: Kullanıcının oturum açıp açmadığını belirten bir durum değişkenidir (state). Başlangıçta false olarak ayarlanır.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  //Bu fonksiyon, kullanıcının giriş yapmasını sağlar.
//setIsAuthenticated(true) ile kullanıcı oturum açmış olarak işaretlenir.

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');//localStorage.setItem('isAuthenticated', 'true') ifadesi, localStorage'e kullanıcı oturum açma bilgisini kaydeder
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;










