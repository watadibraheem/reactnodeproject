import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleLog() {
  const location = useLocation();
  const log = location.state?.post;
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");

  const handleBack = () => {
    navigate("/activity-log");
  };

  useEffect(() => {
    if (log.user_id) {
      axios
        .get(`http://localhost:8801/users/${log.user_id}`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.user) {
            setBusinessName(response.data.user.business_name);
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching business name:",
            error.response?.data?.message || "Server error"
          );
        });
    }
  }, [log.user_id]);

  if (!log) {
    return <p>No log details found.</p>;
  }

  return (
    <div className="single-log-container">
      <button className="back-btn" onClick={handleBack}>
        ⬅ Back
      </button>
      <h2>Log Details</h2>
      <p>
        <strong>Driver Name:</strong> {log.name}
      </p>
      <p>
        <strong>Fuel Amount:</strong> {log.amount} shekels
      </p>
      <p>
        <strong>Car Plate:</strong> {log.plate}
      </p>
      <p>
        <strong>Business Name:</strong> {businessName || "Loading..."}
      </p>
      <p>
        <strong>Status:</strong> {log.status}
      </p>
      <Link to={`/edit-log/${log.id}`} state={{ log }}>
        <button>Edit Log</button>
      </Link>
    </div>
  );
}

export default SingleLog;
