import React from 'react';
import Header from '../components/Header'; // Assuming Header component is in the same folder
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="w-1/2 bg-white p-6 shadow-md rounded-lg text-center">
                    <img src="./teacher.png" alt="Teacher Cartoon" className="mx-auto mb-4 h-60 w-50" />
                    <h2 className="text-2xl font-bold mb-2">Preparing Your Quiz...</h2>
                    <p className="text-gray-700 mb-6">Hold tight! Our AI is hard at work crafting the perfect set of questions just for you. It won't be long now!</p>
                    <div className="relative pt-1">
                        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
                            <div style={{ width: '75%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <FaSpinner className="animate-spin text-blue-600 text-3xl" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loading;