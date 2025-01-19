import React from "react";
// , { useState }
import "../App.css";

function AdminDashboardPage({
  pendingRequests,
  setPendingRequests,
  setActivityLog,
  rejectedRequests,
  setRejectedRequests,
}) {
  const handleAction = (id, action) => {
    const request = pendingRequests.find((req) => req.id === id);

    if (action === "approved") {
      setActivityLog((prev) => [...prev, { ...request, status: "Approved" }]);
    } 
    else if (action === "rejected") {
      setRejectedRequests((prev) => [
        ...prev,
        { ...request, status: "Rejected" },
      ]);
    }
    setPendingRequests(pendingRequests.filter((req) => req.id !== id));
    alert(`Request ${id} has been ${action}.`);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>Pending Requests</h2>

      {pendingRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul>
          {pendingRequests.map((request) => (
            <li key={request.id}>
              <strong>Driver Name:</strong> {request.driverName} |
              <strong>Car Plate:</strong> {request.carPlate} |
              <strong>Fuel Amount:</strong> {request.fuelAmount} |
              <strong>Business:</strong> {request.businessName} |
              <strong>Location:</strong> {request.stationLocation}
              <br />
              <button onClick={() => handleAction(request.id, "approved")}>
                Approve
              </button>
              <button onClick={() => handleAction(request.id, "rejected")}>
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
      <h2>Rejected Requests</h2>
      {rejectedRequests.length === 0 ? (
        <p>No rejected requests.</p>
      ) : (
        <ul>
          {rejectedRequests.map((request) => (
            <li key={request.id}>
              <strong>Driver Name:</strong> {request.driverName} |
              <strong>Car Plate:</strong> {request.carPlate} |
              <strong>Fuel Amount:</strong> {request.fuelAmount} |
              <strong>Business:</strong> {request.businessName} |
              <strong>Location:</strong> {request.stationLocation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboardPage;
