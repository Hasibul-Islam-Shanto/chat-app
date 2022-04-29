import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Chat from "./components/Chat/Chat";
import ChatProvider from "./context/ChatProvider";

const App = () => {
  return (
    <>
      <Router>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </ChatProvider>
      </Router>
    </>
  );
};

export default App;
