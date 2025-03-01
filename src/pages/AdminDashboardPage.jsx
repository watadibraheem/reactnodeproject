import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function AdminDashboardPage() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // ✅ Navigate to the last visited page
  };

  useEffect(() => {
    axios
      .get("http://localhost:8801/fuel-requests/pending-approval", {
        withCredentials: true,
      })
      .then((response) => {
        setPendingRequests(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching pending requests:",
          error.response?.data?.message || "Server error"
        );
      });
  }, []);

  // ✅ Handle Approve/Reject Actions
  const handleAction = async (id, action) => {
    try {
      let response;
      if (action === "approved") {
        response = await axios.put(
          `http://localhost:8801/fuel-requests/approve/${id}`,
          {},
          { withCredentials: true }
        );
      } else if (action === "rejected") {
        response = await axios.put(
          `http://localhost:8801/fuel-requests/reject/${id}`,
          {},
          { withCredentials: true }
        );
      }

      alert(response.data.message);

      // ✅ Remove the processed request from the list
      setPendingRequests(pendingRequests.filter((req) => req.id !== id));
    } catch (error) {
      console.error(
        `Error ${action} request:`,
        error.response?.data?.message || "Server error"
      );
    }
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
                <strong>Driver Name:</strong> {request.name} |
                <strong>Car Plate:</strong> {request.plate} |
                <strong>Fuel Amount:</strong> {request.amount} |
                <strong>User ID:</strong> {request.user_id} |
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
      <Link to="/register-user">
        <button className="register-user-btn">Create New User</button>
      </Link>
    </div>
  );
}

export default AdminDashboardPage;
