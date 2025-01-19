import React from "react";
import { Link } from 'react-router-dom';
import "../App.css"; 

function HomePage({ activityLog }) {
  return (
    <div className="home-page">
      <h1>Welcome to the Fuel Management System</h1>
      <p>
        This system helps manage fueling requests, approvals, and activity
        tracking in real-time.
      </p>
      <div className="home-navigation">
        <Link to="/fuel-request">
          <button>Submit a Fuel Request</button>
        </Link>
        <Link to="/admin-dashboard">
          <button>Admin Dashboard</button>
        </Link>
        <Link to="/activity-log">
          <button>View Activity Log</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;