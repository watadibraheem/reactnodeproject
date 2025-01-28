import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboardPage({
  pendingRequests,
  setPendingRequests,
  setActivityLog,
  rejectedRequests,
  setRejectedRequests,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // ✅ Navigate to the last visited page
  };

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

      {/* ✅ Back Button */}
      <button className="back-btn" onClick={handleBack}>
        ⬅ Back
      </button>

      <h2 className="pending-requests">Pending Requests</h2>

      {pendingRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul>
          {pendingRequests.map((request) => (
            <li key={request.id}>
              <div className="request-info">
                <strong>Driver Name:</strong> {request.driverName} |
                <strong>Car Plate:</strong> {request.carPlate} |
                <strong>Fuel Amount:</strong> {request.fuelAmount} |
                <strong>Business:</strong> {request.businessName} |
                <strong>Location:</strong> {request.stationLocation}
              </div>
              <br />
              <div className="request-buttons">
                <button
                  className="approve-btn"
                  onClick={() => handleAction(request.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleAction(request.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="rejected-requests">
        <h2>Rejected Requests</h2>
        {rejectedRequests.length === 0 ? (
          <p>No rejected requests.</p>
        ) : (
          <ul>
            {rejectedRequests.map((request) => (
              <li key={request.id}>
                <div className="request-info">
                  <strong>Driver Name:</strong> {request.driverName} |
                  <strong>Car Plate:</strong> {request.carPlate} |
                  <strong>Fuel Amount:</strong> {request.fuelAmount} |
                  <strong>Business:</strong> {request.businessName} |
                  <strong>Location:</strong> {request.stationLocation}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
