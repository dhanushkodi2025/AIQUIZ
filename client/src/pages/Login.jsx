import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const handleSuccess = (credentialResponse) => {
        try {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            const userData = {
                email: credentialResponseDecoded.email,
                username: credentialResponseDecoded.name,
                profilePic: credentialResponseDecoded.picture
            };

            login(userData); // Set user data in context
            setIsLoggedIn(true);

            navigate('/home');
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    const handleError = () => {
        console.log('Login failed');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center flex-1">
                <div className="text-center mb-8">
                    <p className="text-lg text-gray-600 mb-4">Create your quiz in seconds!</p>
                </div>
                {!isLoggedIn && (
                    <div className="flex items-center justify-center w-full">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleError}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
