import React, { useState } from 'react';
import Header from '../components/Header';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
        { question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript that is used with React to describe what the UI should look like." },
        { question: "What are components?", answer: "Components are reusable pieces of UI in React that can have their own state and logic." },
        { question: "What is state in React?", answer: "State is an object that holds the dynamic data of a component and determines its behavior." },
        { question: "What are props in React?", answer: "Props are inputs to a React component that allow data to be passed from one component to another." },
        { question: "What is useState?", answer: "useState is a React hook that allows you to add state to a functional component." },
        { question: "What is useEffect?", answer: "useEffect is a React hook that lets you perform side effects in function components." },
        { question: "What is a hook in React?", answer: "Hooks are functions that let you use React state and lifecycle features in functional components." },
        { question: "What is a virtual DOM?", answer: "The virtual DOM is a lightweight in-memory representation of the real DOM used by React to optimize UI updates." },
        { question: "How do you handle events in React?", answer: "Events in React are handled using event handlers, which are functions passed to elements as props." }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b-2 border-gray-300 pb-4">
                            <button 
                                onClick={() => toggleAnswer(index)} 
                                className="w-full text-left text-xl font-semibold text-gray-800"
                            >
                                {faq.question}
                            </button>
                            {openIndex === index && (
                                <p className="mt-2 text-gray-600">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;