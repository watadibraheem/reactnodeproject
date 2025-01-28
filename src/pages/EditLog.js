import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function EditLog({ updateLog }) {
  const { id } = useParams(); // Get log ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  const log = location.state?.log;

  const handleBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState(log || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLog({ ...formData, id });
    alert("Log updated successfully!");
    navigate("/activity-log", { state: { updatedLog: formData } });
  };

  if (!log) {
    return <p>Loading log details...</p>;
  }

  return (
    <div className="edit-log-container">
      <button className="back-btn" onClick={handleBack}>
        ⬅ Back
      </button>

      <h2>Edit Log</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Driver Name:</label>
          <input
            type="text"
            name="driverName"
            value={formData.driverName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fuel Amount:</label>
          <input
            type="number"
            name="fuelAmount"
            value={formData.fuelAmount || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="stationLocation"
            value={formData.stationLocation || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Car Plate:</label>
          <input
            type="text"
            name="carPlate"
            value={formData.carPlate || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Business Name:</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
          >
            <option value="Approved">Approved</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditLog;
