import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Loading from './Loading'; // Import the Loading component

const QuizStart = () => {
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [numOptions, setNumOptions] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleGenerateQuiz = async () => {
        setLoading(true); // Start loading

        const prompt = `As a quiz generator, create a quiz of ${numQuestions} questions on the topic of '${topic}' with difficulty level '${difficulty}' and ${numOptions} options per question. Provide the response strictly in JSON format with the following structure:

        {
          "quiz": [
            {
              "question": "Sample question?",
              "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
              "answer": "Option 1"
            },
          ]
        }

        Ensure there is no extra text or whitespace outside of the JSON format.`;

        try {
            const response = await axios.post('http://localhost:3000/generate-quiz', {
                topic,
                numQuestions,
                difficulty,
                numOptions,
                prompt
            });

            navigate('/questions', { state: { quiz: response.data.quiz } });
        } catch (error) {
            console.error('Error generating quiz:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <>
            <Header />
            {loading ? (
                <Loading /> // Show loading screen if loading
            ) : (
                <div className="container mx-auto p-4 flex justify-center">
                    <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2">
                        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Quiz</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Topic</label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">No. of Questions</label>
                                <input
                                    type="number"
                                    value={numQuestions}
                                    onChange={(e) => setNumQuestions(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Select Difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">No. of Options</label>
                                <div className="mt-1 space-y-2">
                                    {[2, 3, 4, 5].map((option) => (
                                        <label key={option} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={numOptions === String(option)}
                                                onChange={(e) => setNumOptions(e.target.value)}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleGenerateQuiz}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuizStart;
