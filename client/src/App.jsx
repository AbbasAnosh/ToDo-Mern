import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Navbar } from "./components/Navbar";

const App = () => {
  const isUserSignedIn = !!localStorage.getItem("token");
  return (
    <Router>
      <Navbar />
      <Routes>
        {isUserSignedIn && <Route path="/" element={<Home />} />}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
