import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Questions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state || {};

    // Extract and clean JSON data
    const cleanedQuizString = quiz
        ? quiz
            .replace(/```json\n/, '')     // Remove leading code block format
            .replace(/\n```$/, '')        // Remove trailing code block format
            .trim()                       // Trim any extra whitespace
        : '';

    // Log the cleaned JSON string for debugging
    console.log('Cleaned Quiz String:', cleanedQuizString);

    let parsedQuiz = { quiz: [] };
    try {
        parsedQuiz = JSON.parse(cleanedQuizString);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Quiz</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-red-500">Failed to load quiz data. Please check the console for errors.</p>
                </div>
            </div>
        );
    }

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answersVisible, setAnswersVisible] = useState(Array(parsedQuiz.quiz.length).fill(false));
    const [selectedOptions, setSelectedOptions] = useState(Array(parsedQuiz.quiz.length).fill(''));
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        setTimeLeft(15); // Reset timer for each question
    }, [currentQuestion]);

    const handleToggleAnswer = () => {
        const updatedVisibility = [...answersVisible];
        updatedVisibility[currentQuestion] = !updatedVisibility[currentQuestion];
        setAnswersVisible(updatedVisibility);
    };

    const handleOptionChange = (selectedValue) => {
        const updatedSelections = [...selectedOptions];
        updatedSelections[currentQuestion] = selectedValue;
        setSelectedOptions(updatedSelections);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < parsedQuiz.quiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const calculateResults = () => {
        const correctAnswers = parsedQuiz.quiz.map((question, index) => ({
            question: question.question,
            selectedOption: selectedOptions[index],
            correctOption: question.answer,
            isCorrect: selectedOptions[index] === question.answer
        }));

        const score = correctAnswers.filter(answer => answer.isCorrect).length;

        return { correctAnswers, score };
    };

    const handleSubmit = () => {
        const { correctAnswers, score } = calculateResults();
        console.log('Quiz submitted with answers:', selectedOptions);
        navigate('/results', { state: { correctAnswers, score } }); // Redirect to results page
    };

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Quiz</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <div className="text-lg font-medium text-gray-700 mb-2">
                            {parsedQuiz.quiz[currentQuestion].question}
                        </div>
                        <div className="mb-4">
                            {parsedQuiz.quiz[currentQuestion].options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id={`question-${currentQuestion}-option-${optIndex}`}
                                        name={`question-${currentQuestion}`}
                                        value={option}
                                        checked={selectedOptions[currentQuestion] === option}
                                        onChange={(e) => handleOptionChange(e.target.value)}
                                        className="mr-2 focus:ring-blue-500"
                                    />
                                    <label
                                        htmlFor={`question-${currentQuestion}-option-${optIndex}`}
                                        className="text-gray-700"
                                    >
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="text-lg text-gray-600 mb-4">
                            Time left: {timeLeft} seconds
                        </div>
                        <button
                            onClick={handleToggleAnswer}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {answersVisible[currentQuestion] ? 'Hide Answer' : 'Show Answer'}
                        </button>
                        {answersVisible[currentQuestion] && (
                            <div className="mt-2 text-lg text-gray-600">
                                Correct Answer: {parsedQuiz.quiz[currentQuestion].answer}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestion === 0}
                            className={`px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Previous Question
                        </button>
                        {currentQuestion < parsedQuiz.quiz.length - 1 ? (
                            <button
                                onClick={handleNextQuestion}
                                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Next Question
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Questions;
