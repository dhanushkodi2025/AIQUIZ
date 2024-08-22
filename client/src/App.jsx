import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Correct file path
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import QuizStart from './pages/QuizStart';
import Loading from './pages/Loading';
import Questions from './pages/Questions';
import Result from './pages/Result';
import FAQ from './pages/FAQ';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz-start" element={<QuizStart />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/results" element={<Result />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
