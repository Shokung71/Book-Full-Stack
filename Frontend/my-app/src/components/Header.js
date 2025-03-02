"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobilePhone, faUser, faBook, faIdCard, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Auth from "@/components/Auth";

export default function Header({ onNavClick, auth, setAuth, onLogout }) {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const storedAuth = auth ? auth : null;
    
    useEffect(() => {
        console.log("Auth state changed:", auth);
    }, [auth]);
    const handleLoginClick = () => {
        setIsAuthOpen(true);
    };
    const handleCloseAuth = () => {
        setIsAuthOpen(false);
    };
    const handleLogoutClick = () => {
        setAuth(null);
        onLogout();
    };

    return (
        <header className="bg-blue-500 text-white py-1 px-2 w-full shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-10 h-10 md:w-24 md:h-24 flex items-center justify-center">
                            <button onClick={() => onNavClick('home')}>
                                <FontAwesomeIcon icon={faMobilePhone} className="text-2xl md:text-4xl" />
                            </button>
                        </div>
                        <div className="flex flex-col items-start">
                            <h1 className="text-lg md:text-2xl font-bold">Smartphone List</h1>
                        </div>
                    </div>
                    <nav className="flex flex-row gap-1 md:gap-4">
                        {auth ? (
                            <>
                            <button onClick={() => onNavClick('smartphones')} className="text-white hover:scale-105 transform transition-transform px-2 md:px-5 py-1 md:py-2 text-sm md:text-base">

                                <FontAwesomeIcon icon={faBook} className="mr-1 md:mr-2" />
                                <span className="hidden md:inline">Model List</span>
                            </button>
                            <button onClick={handleLogoutClick} className="text-white hover:scale-105 transform transition-transform px-2 md:px-5 py-1 md:py-2 text-sm md:text-base">
                                    Hello, {storedAuth}
                                    <FontAwesomeIcon icon={faRightFromBracket} className="ps-2 mr-1 md:mr-2" />
                                </button>
                            </>
                        ) : (
                            <button onClick={handleLoginClick} className="text-white hover:scale-105 transform transition-transform px-2 md:px-5 py-1 md:py-2 text-sm md:text-base">

                                <FontAwesomeIcon icon={faUser} className="mr-1 md:mr-2" />
                                <span className="hidden md:inline">Login</span>
                            </button>
                        )}

                    </nav>
                </div>
            </div>
            <Auth isOpen={isAuthOpen} onClose={handleCloseAuth} setAuth={setAuth}/>
        </header>
    );
}