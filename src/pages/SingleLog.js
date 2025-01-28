import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SingleLog() {
  const location = useLocation();
  const log = location.state?.post;
  const navigate = useNavigate();
  
  if (!log) {
    return <p>No log details found.</p>;
  }

  const handleBack = () => {
    navigate(-1);
  };



  return (
    <div className="single-log-container">
      <button className="back-btn" onClick={handleBack}>
        ⬅ Back
      </button>
      <h2>Log Details</h2>
      <p>
        <strong>Driver Name:</strong> {log.driverName}
      </p>
      <p>
        <strong>Fuel Amount:</strong> {log.fuelAmount} shekels
      </p>
      <p>
        <strong>Location:</strong> {log.stationLocation}
      </p>
      <p>
        <strong>Car Plate:</strong> {log.carPlate}
      </p>
      <p>
        <strong>Business Name:</strong> {log.businessName}
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