import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Chat from "./components/Chat/Chat";

const App = () => {
  return (
    <>

        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router> 
    </>
  );
};

export default App;
