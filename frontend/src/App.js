import './App.css';
import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [authenticated, setauthenticated] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    console.log(loggedInUser);
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  console.log(authenticated)

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="d-flex flex-column h-100">
      <Header />
      <Footer />
    </div>
    );
  };
};

export default App;
