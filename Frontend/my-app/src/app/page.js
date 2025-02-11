"use client";
import { useState, useEffect } from 'react';

//นำเข้า component ทั้งหมดที่มี
import Body from "@/components/Body";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Smartphone from "@/components/Smartphones";
import About from "@/components/About";

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    // Set the initial auth state from localStorage
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, []);
  const handleSetAuth = (username) => {
    setAuth(username);
    localStorage.setItem("auth", username);
  };
  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };


  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  return (
    <div className = "flex min-h-screen font-sans">
      <Header onNavClick={handleNavClick} auth={auth} setAuth={handleSetAuth} onLogout={handleLogout} />
      <main className="flex-grow pt-16" >
      {auth ? (
          currentView === 'home' ? <Body /> : currentView === 'smartphones' ? <Smartphone /> : <About />
        ) : (
          <Body />
        )}
        {/* { currentView=== 'home' ? <Body /> : currentView === 'smartphones' ? <Smartphone /> : <About /> } */}
    </main >
    <Footer />
    </div >
  )
}