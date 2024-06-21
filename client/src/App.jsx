import React from "react";
import Home from "./page/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main className="h-screen w-full padding bg-dark-background">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
