// src/App.tsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import Home from "./pages/home/Home";
import MyCards from "./pages/my-card/MyCards";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import MyFavorites from "./pages/my-favorites/MyFavorites";
import About from "./pages/about/About";
import CardDetails from "./components/card-details/CardDetails";
import "./styles/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/mycards" element={<MyCards />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/cards/:id"
          element={
            <CardDetails
              cardId={""}
              open={false}
              handleClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
