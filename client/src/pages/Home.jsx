import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleCreateQuiz = () => {
        navigate('/quiz-start'); // Navigate to the QuizStart route
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h2 className="text-xl font-bold mb-2">Start Quiz</h2>
                            <button
                                onClick={handleCreateQuiz}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                            >
                                Create Quiz
                            </button>
                        </div>
                        <div className="bg-white p-4 shadow-md rounded-lg">
                            <h2 className="text-xl font-bold mb-2">Hot Topics</h2>
                            <p>List of hot topics goes here...</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-white p-4 shadow-md rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Recent</h2>
                        <p>Recent activities go here...</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;