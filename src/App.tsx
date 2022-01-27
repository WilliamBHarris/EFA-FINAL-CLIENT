import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";



export type AppProps = {
  sessionToken: string | null;
  updateToken: (newToken: string) => void;
  setSessionToken: (sessionToken: string | null) => void;
};

export type SetSessionToken = {
  setSessionToken: (sessionToken: string) => void;
};

const App = () => {
  const [sessionToken, setSessionToken] = useState<string | null>("");

  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Register
                updateToken={updateToken}
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                updateToken={updateToken}
                sessionToken={sessionToken}
                setSessionToken={setSessionToken}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
