"use client";

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Auth({ isOpen, onClose, setAuth }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [captcha, setCaptcha] = useState('');

    const isFormValid = username && password && captcha;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const url = isRegister ? "http://localhost:3001/register" : "http://localhost:3001/login";
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: username, pass: password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    if (isRegister) {
                        setSuccess("Registration successful! You can now log in.");
                        setError('');
                        setIsRegister(false);
                    } else {
                        setAuth(username);
                        localStorage.setItem("auth", username);
                        setError('');
                        onClose();
                    }
                } else {
                    setError(data.message || "An error occurred.");
                    setSuccess('');
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Request failed! Please try again.");
                setSuccess('');
            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl text-blue-500 font-bold mb-4 text-center">
                    {isRegister ? "Register" : "Login"}
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <ReCAPTCHA
                        sitekey="6LcOxtIqAAAAAPSbIkZUHs_v4BwwISSkVfirEQVr"
                        onChange={(val) => setCaptcha(val)}
                        className="mb-4 flex items-center justify-center"
                        style={{ 
                            pointerEvents: username && password ? "auto" : "none",
                            opacity: username && password ? 1 : 0.5 
                        }}
                    />

                    <div className="flex items-center justify-center mb-4">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                                isFormValid 
                                    ? 'bg-green-500 hover:bg-green-700 text-white' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isRegister ? "Register" : "Login"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gray-500 hover:bg-gray-700 text-white ml-4`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                            setSuccess('');
                        }}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                    </button>
                </div>
            </div>
        </div>
    );
}