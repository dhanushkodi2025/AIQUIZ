import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='381932449494-or3ipviqq84qn4dadqj47780ej5mlv4r.apps.googleusercontent.com'>
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
