import React from "react";
import { Link } from "react-router-dom";
// , { useState }
import "../App.css";

function ActivityLogPage({ activityLog }) {
  console.log("ActivityLogPage received:", activityLog); // Debugging
  return (
    <div className="activity-log">
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
