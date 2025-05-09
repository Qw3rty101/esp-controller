// src/pages/Home.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../css/home.css";

import { RiGeminiLine } from "react-icons/ri";
import { BsCpu } from "react-icons/bs";

import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { FaArrowsAltV } from "react-icons/fa";

import { FiSettings } from "react-icons/fi";
import {
   // WiDaySunny,              // Cuaca cerah penuh saat siang (Sunny)
   // WiDaySunnyOvercast,       // Matahari sedikit tertutup awan (Mostly Sunny)
   WiDayCloudy, // Berawan sebagian saat siang (Partly Sunny)
   // WiDayCloudyHigh,          // Awan tinggi saat siang (Intermittent Clouds)
   // WiDayHaze,                // Kabut/bercahaya samar (Hazy Sunshine)
   WiCloudy, // Awan tebal/mendung (Cloudy)
   WiCloud, // Umum untuk berawan (Cloud umum)
   // WiFog,                    // Kabut tebal (Fog)
   // WiShowers,                // Hujan ringan terus-menerus (Showers)
   // WiDayShowers,             // Hujan ringan saat siang (Partly Sunny w/ Showers)
   WiThunderstorm, // Badai petir (T-Storms)
   // WiStormShowers,           // Hujan badai (Storm dengan hujan)
   // WiDayStormShowers,        // Hujan badai siang hari (Mostly Cloudy w/ T-Storms)
   // WiRain,                   // Hujan deras (Rain)
   // WiSnowWind,               // Salju + angin kencang (Blizzard atau Snowstorm)
   // WiDaySnowWind,            // Salju + angin saat siang hari
   // WiSnow,                   // Salju umum (Snow)
   // WiSnowflakeCold,          // Kondisi sangat dingin / suhu beku (Cold)
   // WiSleet,                  // Hujan es (Sleet)
   // WiRainMix,                // Campuran hujan dan salju (Rain and Snow)
   // WiHot,                    // Cuaca panas ekstrem (Hot)
   // WiStrongWind,             // Angin kencang (Windy)
   // WiNightClear,             // Langit cerah di malam hari (Clear Night)
   // WiNightAltCloudy,         // Malam berawan penuh (Mostly Cloudy Night)
   // WiNightAltPartlyCloudy,   // Malam sebagian berawan (Partly Cloudy Night)
   // WiNightAltCloudyHigh,     // Awan tinggi di malam hari (Intermittent Clouds Night)
   WiNightFog, // Kabut di malam hari (Foggy Night)
   // WiNightAltShowers,        // Hujan ringan di malam hari (Partly Cloudy w/ Showers Night)
   // WiNightAltStormShowers,   // Badai hujan malam (Mostly Cloudy w/ T-Storms Night)
   // WiNightAltThunderstorm,   // Badai petir malam hari (Thunderstorms Night)
   // WiNightAltSnowWind,       // Salju + angin di malam hari
   // WiNightAltSnow            // Salju di malam hari
} from "react-icons/wi";

import "../css/home.css";

const Home: React.FC = () => {
   useEffect(() => {
      document.body.classList.add("home-page");
      return () => {
         document.body.classList.remove("home-page");
      };
   }, []);

   const navigate = useNavigate();

   const goToSettings = () => {
      navigate("/settings");
   };

   return (
      <>
         <div className="nav" onClick={goToSettings}>
            <FiSettings className="settings" />
         </div>

         <div className="header">
            <small>Karawang Timur, Warungbambu</small>
            <h1 className="inform-title">
               Wilayah anda saat ini , Hujan deras
               <WiDayCloudy />
            </h1>
         </div>

         <div className="predict">
            {[
               <WiNightFog />,
               <WiCloudy />,
               <WiCloud />,
               <WiThunderstorm />,
            ].map((Icon, index) => (
               <div className="weather" key={index}>
                  <div className="icon">{Icon}</div>
                  <div className="weather-text">
                     <p>20°</p>
                     <small>19.00</small>
                  </div>
               </div>
            ))}
         </div>

         <div className="info">
            <div className="humidity">
               <p className="title-info">Kelembapan</p>
               <p className="data-info">78%</p>
            </div>
            <div className="temperature">
               <p className="title-info">Temperature</p>
               <p className="data-info">18°c</p>
            </div>
         </div>

         <div className="esp">
            <BsCpu className="cpu-icon" />
            Esp Weather Controller
         </div>

         <div className="stat-esp">
            <div className="stat-column">
               <div className="stat-item">
                  <WiHumidity className="icon" />
                  <div className="value">38.4</div>
                  <b className="label">Humidity</b>
               </div>
               <div className="stat-item">
                  <FaTemperatureHigh className="icon" />
                  <div className="value">31.8</div>
                  <b className="label">Temperature</b>
               </div>
            </div>
            <div className="stat-column">
               <div className="stat-item">
                  <FaWind className="icon" />
                  <div className="value">100.87</div>
                  <b className="label">Pressure</b>
               </div>
               <div className="stat-item">
                  <FaArrowsAltV className="icon" />
                  <div className="value">47.69</div>
                  <b className="label">Altitude</b>
               </div>
            </div>
         </div>

         <div className="weather-ai">
            <RiGeminiLine className="ai-icon" />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Voluptatum, illum?
            </p>
            <input type="text" placeholder="Ask anything" />
         </div>
      </>
   );
};

export default Home;
