import React from 'react';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';

const Profile = () => {
    const { user } = useAuth();
    console.log('User data in Profile:', user);
    
    if (!user) {
        return <div className="text-center text-red-500 font-semibold">No user data available.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                    <div className="flex flex-col items-center">
                        <img 
                            src={user.profilePic} 
                            alt="Profile" 
                            className="h-32 w-32 rounded-full object-cover border-4 border-blue-500 mb-4"
                        />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h1>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;