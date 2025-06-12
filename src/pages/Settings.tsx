import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "@/css/settings.css";

const Settings: React.FC = () => {
   const navigate = useNavigate();

   const goToSettings = () => {
      navigate("/home");
   };

   return (
      <div className="profile-container">
         {/* Header */}
         <div className="profile-header">
            <button className="back-button" onClick={goToSettings}>Back</button>
            <button className="settings-button">Settings</button>
         </div>

         {/* Content */}
         <div className="profile-content">
            <div className="edit-icon">
               <FaRegEdit />
            </div>
            <h1 className="profile-name">Siraj Nurul Bil Haq</h1>
            <p className="profile-location">Karawang Timur, Warungbambu</p>
            <p className="profile-bio">Doing things with AI</p>
         </div>
      </div>
   );
};

export default Settings;
