import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation'; // ← Plugin Capacitor
import '../css/reason.css';

const Reason: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Request permission terlebih dahulu
        await Geolocation.requestPermissions();

        // Ambil lokasi sekarang
        const pos = await Geolocation.getCurrentPosition();
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        console.log('Lokasi:', pos.coords);
      } catch (error) {
        console.error('Gagal ambil lokasi:', error);
      }
    };

    fetchLocation();
  }, []);

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <h1>What do you use this app <br />for?</h1>
      <div>
        <button onClick={goToHome}>Weather Forecast</button>
        <button onClick={goToHome}>Doing things with AI</button>
        <button onClick={goToHome}>Just download</button>
      </div>

      {location && (
        <p style={{ marginTop: '20px', fontSize: '14px' }}>
          📍 Lokasi Anda: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </p>
      )}
    </div>
  );
};

export default Reason;
