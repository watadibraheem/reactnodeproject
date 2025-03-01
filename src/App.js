import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FuelRequestPage from "./pages/FuelRequestPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ActivityLogPage from "./pages/ActivityLogPage";
import SingleLog from "./pages/SingleLog";
import EditLog from "./pages/EditLog";
import LoginPage from "./pages/LoginPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import ProfileEditPage from "./pages/ProfileEditPage";


function App() {
  const [user, setUser] = useState(null);

  // Check if user is already logged in (session exists)
  useEffect(() => {
    axios
      .get("http://localhost:8801/users/check-session", {
        withCredentials: true,
      })
      .then((response) => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {user ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/fuel-request" element={<FuelRequestPage />} />
            <Route path="/activity-log" element={<ActivityLogPage />} />
            <Route path="/single-log" element={<SingleLog />} />
            <Route path="/edit-log/:id" element={<EditLog />} />
            <Route path="/register-user" element={<RegisterUserPage />} />
            {user && (
              <Route path="/edit-profile" element={<ProfileEditPage />} />
            )}

            {/* ✅ Admin Only Route */}
            {user.role === "admin" ? (
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            ) : (
              <Route
                path="/admin-dashboard"
                element={<Navigate to="/" replace />}
              />
            )}
          </>
        ) : (
          <Route path="*" element={<LoginPage setUser={setUser} />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
