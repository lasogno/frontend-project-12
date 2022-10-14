import '../App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import Home from './Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth') || false)

  const login = () => {
    setIsAuthenticated(true)
  }

  return (
    <> 
      <Routes>
        <Route path="/" element={
            !isAuthenticated ? (
              <Navigate to="/login" replace />
            ) : (
              <Home></Home>
            )
          } />
        <Route
          path="login"
          element={
            <Login login={login} />
          }
        />
      </Routes>
    </>
  );
};


export default App;
