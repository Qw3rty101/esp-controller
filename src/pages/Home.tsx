import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import "@/css/home.css";
import { applyTimeTheme } from "@/utils/themeUtils";
import EspController from "@/components/EspController";
import Predict from "@/components/Predict";
import BarStatusFoot from "@/components/BarStatusFoot";
import { useDataStore } from "@/store/useDataStore";
import WeatherAi from "@/components/WeatherAi";

const Home = () => {
   const { resetUserData, dataUser } = useDataStore();
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

   const goToReset = () => {
      navigate("/settings");
      resetUserData();
   };

   return (
      <div>
         <div className="home-page">
            <div className="nav" onClick={goToReset}>
               <div className="nav-logo">
                  <img src="/icon.png" width={50} alt="logo" draggable={false} />
               </div>
               <div className="nav-item">
                  <h1>{dataUser?.name}</h1>
                  <FiLogOut className="reset" />
               </div>
            </div>

            <Predict />

            <EspController />

            <WeatherAi />
         </div>
         <footer>
            <p>&copy; 2023 Weather Prediction. All rights reserved.</p>
         </footer>
         <BarStatusFoot />
      </div>
   );
};

export default Home;
