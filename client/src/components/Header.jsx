import React, { useState } from 'react';
import { FaHome, FaUser, FaSignOutAlt, FaBars, FaCog, FaQuestionCircle, FaHistory, FaBell } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    console.log(user.profilePic);

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="teacher.png" alt="Logo" className="h-8 w-8 mr-2" />
                    <span className="text-white text-xl font-bold">AppName</span>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <FaBars className="text-white text-2xl" />
                    </button>
                </div>
                <div className={`md:flex space-x-6 items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <Link to="/home" className="text-white flex items-center space-x-2">
                        <FaHome />
                    </Link>
                    <Link to="/profile" className="text-white flex items-center space-x-2">
                        <FaUser />
                    </Link>
                    <Link to="/settings" className="text-white flex items-center space-x-2">
                        <FaCog />
                    </Link>
                    <Link to="/faq" className="text-white flex items-center space-x-2">
                        <FaQuestionCircle />
                    </Link>
                    <Link to="/history" className="text-white flex items-center space-x-2">
                        <FaHistory />
                    </Link>
                    <Link to="/notifications" className="text-white flex items-center space-x-2">
                        <FaBell />
                    </Link>
                    <a href="#logout" className="text-white flex items-center space-x-2" onClick={logout}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </a>
                    {user && (
                        <div className="flex items-center space-x-2 ml-4">
                            <img src={user.profilePic} alt="Profile" className="h-8 w-8 rounded-full" />
                            <span className="text-white">{user.username}</span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;