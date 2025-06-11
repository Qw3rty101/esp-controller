// src/pages/Home.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiGeminiLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

import "@/css/home.css";
import { applyTimeTheme } from "@/utils/themeUtils";
import EspController from "@/components/EspController";
import Predict from "@/components/Predict";
import BarStatusFoot from "@/components/BarStatusFoot";

const Home = () => {

   const navigate = useNavigate();

   // Set theme
   useEffect(() => {
      const body = document.body;
      body.classList.add("home-page");
      applyTimeTheme();
      return () => {
         // Cleanup
         body.classList.remove("home-page");
         body.classList.forEach((cls) => {
            if (cls.startsWith("theme-")) {
               body.classList.remove(cls);
            }
         });
      };
   }, []);

   const goToSettings = () => {
      navigate("/settings");
   };

   return (
      <div>
         <div className="home-page">
            <div className="nav" onClick={goToSettings}>
               <FiSettings className="settings" />
            </div>

            <Predict />

            <EspController />

            <div className="weather-ai">
               <span className="ai-icon">
                  <RiGeminiLine />
               </span>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum, illum?
               </p>
               <input type="text" placeholder="Ask anything" />
            </div>
         </div>
         <BarStatusFoot />
      </div>
   );
};

export default Home;
