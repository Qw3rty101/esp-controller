import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Geolocation } from "@capacitor/geolocation";
import { useDataStore } from "@/store/useDataStore";
import "@/css/reason.css";
import toast from "react-hot-toast";
import { FiArrowRight, FiMapPin, FiUser, FiCheckCircle } from "react-icons/fi";

const Reason: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useDataStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (step !== 1) return;

    const fetchLocation = async () => {
      try {
        const pos = await Geolocation.getCurrentPosition();
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setStep(2);
      } catch (error) {
        console.error("Gagal ambil lokasi:", error);
        setPermissionDenied(true);
      }
    };

    fetchLocation();
  }, [step]);

  const requestPermissionAgain = async () => {
    try {
      await Geolocation.requestPermissions();
      setPermissionDenied(false);
      setStep(1);
    } catch (err) {
      console.error("Gagal request permission:", err);
    }
  };

  const handleSubmit = async (utility: string) => {
    if (!location || !name) {
      toast.error("Lokasi dan nama harus diisi");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      lat: location.latitude,
      lon: location.longitude,
      utility,
      name,
    };

    try {
      await setUserData(payload);
      navigate("/home");
    } catch (err) {
      console.error("Gagal submit ke backend:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((stepNumber) => (
        <div
          key={stepNumber}
          className={`step ${step === stepNumber ? 'active' : ''} ${step > stepNumber ? 'completed' : ''}`}
        >
          {step > stepNumber ? (
            <FiCheckCircle className="step-icon" />
          ) : (
            <span>{stepNumber}</span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="reason-container">
      <StepIndicator />
      
      <div className="step-content">
        {step === 1 && (
          <div className="step-1">
            <div className="icon-circle">
              <FiMapPin size={32} />
            </div>
            <h1>Enable Location Access</h1>
            <p>We need your location to provide accurate weather information</p>
            
            {permissionDenied ? (
              <button className="primary-button" onClick={requestPermissionAgain}>
                Allow Location Access
              </button>
            ) : (
              <div className="loading-spinner"></div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="step-2">
            <div className="icon-circle">
              <FiUser size={32} />
            </div>
            <h1>What's Your Name?</h1>
            <p>Let us know how to address you</p>
            
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="name-input"
            />
            
            <button
              className="primary-button"
              onClick={() => {
                if (!name.trim()) return toast.error("Please enter your name");
                setStep(3);
              }}
              disabled={!name.trim()}
            >
              Continue <FiArrowRight />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step-3">
            <h1>How will you use this app?</h1>
            <p>Select your primary use case</p>
            
            {isSubmitting ? (
              <div className="submitting-overlay">
                <div className="loading-spinner"></div>
                <p>Setting up your experience...</p>
              </div>
            ) : (
              <div className="option-grid">
                <button onClick={() => handleSubmit("weather_forecast")} className="option-card">
                  <div className="option-icon weather-icon">🌤️</div>
                  <h3>Weather Forecast</h3>
                  <p>Get accurate weather updates</p>
                </button>
                
                <button onClick={() => handleSubmit("ai_stuff")} className="option-card">
                  <div className="option-icon ai-icon">🤖</div>
                  <h3>AI Assistant</h3>
                  <p>Smart tools and features</p>
                </button>
                
                <button onClick={() => handleSubmit("just_download")} className="option-card">
                  <div className="option-icon explore-icon">🔍</div>
                  <h3>Just Exploring</h3>
                  <p>Checking out the app</p>
                </button>
              </div>
            )}
            
            {location && (
              <div className="location-info">
                <FiMapPin size={14} />
                <span>
                  {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reason;