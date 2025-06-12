// src/pages/Landing.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/css/landing.css'

const Landing: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/reason');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="divcenter column">
      <h1 className="slide-up">⛅ Weather Vision</h1>
    </div>
  );
};

export default Landing;
