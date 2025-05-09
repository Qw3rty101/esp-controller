import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/reason.css'

const Reason: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <h1>What do you use this app <br />for?</h1>
      <div>
        <button onClick={goToHome}>
          Weather Forecast
        </button>
        <button onClick={goToHome}>
          Doing things with AI
        </button>
        <button onClick={goToHome}>
          Just download
        </button>
      </div>
    </div>
  );
};

export default Reason;
