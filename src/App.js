import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


function App() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  const updateLog = (updatedLog) => {
    setActivityLog((prevLogs) =>
      prevLogs.map((log) => (log.id === updatedLog.id ? updatedLog : log))
    );
  };


  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              activityLog={activityLog}
              pendingRequests={pendingRequests}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/fuel-request"
          element={
            <FuelRequestPage
              setPendingRequests={setPendingRequests}
              setActivityLog={setActivityLog}
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminDashboardPage
              pendingRequests={pendingRequests}
              setPendingRequests={setPendingRequests}
              rejectedRequests={rejectedRequests}
              setRejectedRequests={setRejectedRequests}
              setActivityLog={setActivityLog}
            />
          }
        />
        <Route
          path="/activity-log"
          element={
            <ActivityLogPage
              activityLog={activityLog}
              setActivityLog={setActivityLog}
            />
          }
          key={activityLog.length}
        />
        <Route path="/single-log" element={<SingleLog />} />
        <Route
          path="/edit-log/:id"
          element={<EditLog updateLog={updateLog} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
