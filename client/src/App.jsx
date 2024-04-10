import React, { useState } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Navbar } from "./components/Navbar";

const App = () => {
  const user = false;

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
