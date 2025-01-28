import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// , { useState }
import "../App.css";

function ActivityLogPage({ activityLog, setActivityLog }) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.updatedLog) {
      setActivityLog((prev) =>
        prev.map((log) =>
          log.id === location.state.updatedLog.id
            ? location.state.updatedLog
            : log
        )
      );
    }
  }, [location.state, setActivityLog]);

  const handleBack = () => {
    navigate(-1);
  };



  return (
    <div className="activity-log">
      <button className="back-btn" onClick={handleBack}>
        ⬅ Back
      </button>
      <h1>Activity Log</h1>
      {activityLog.length === 0 ? (
        <p>No activities to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Fuel Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.map((log) => (
              <tr key={log.id}>
                <td>{log.driverName}</td>
                <td>{log.fuelAmount}</td>
                <td>
                  <Link to="/single-log" state={{ post: log }}>
                    <button>View Log</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityLogPage;
