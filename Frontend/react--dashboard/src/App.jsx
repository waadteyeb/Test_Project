import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Main from "./pages/main";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); 

  return (
    <>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/id/:id" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
