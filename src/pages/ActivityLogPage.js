import React from "react";
// , { useState }
import "../App.css";

function ActivityLogPage({ activityLog }) {
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
              <th>Car Plate</th>
              <th>Fuel Amount</th>
              <th>Business</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.map((log) => (
              <tr key={log.id}>
                <td>{log.driverName}</td>
                <td>{log.carPlate}</td>
                <td>{log.fuelAmount}</td>
                <td>{log.businessName}</td>
                <td>{log.stationLocation}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityLogPage;
