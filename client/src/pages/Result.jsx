import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

const Results = () => {
    const location = useLocation();
    const { correctAnswers, score } = location.state || {};

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Quiz Results</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-lg text-gray-700 mb-4">
                        <p className="font-bold">Your Score: {score} out of {correctAnswers.length}</p>
                    </div>
                    {correctAnswers.map((answer, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-md">
                            <div className="font-semibold text-gray-800">{answer.question}</div>
                            <div className={`mt-2 ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                Your Answer: {answer.selectedOption}
                            </div>
                            <div className="mt-1 text-gray-600">
                                Correct Answer: {answer.correctOption}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Results;
