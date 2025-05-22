// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Reason from "./pages/Reason";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

const App: React.FC = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/reason" element={<Reason />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
         </Routes>
      </Router>
   );
};

export default App;
