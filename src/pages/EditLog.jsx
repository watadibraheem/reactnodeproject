import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

function EditLog() {
  const { id } = useParams(); // Get log ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  const log = location.state?.log;
  const [formData, setFormData] = useState(log || {});

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8801/fuel-requests/${id}`,
        formData,
        { withCredentials: true }
      );

      alert(response.data.message || "Log updated successfully!");
      navigate("/activity-log"); // ✅ Redirect to Activity Log
    } catch (error) {
      console.error("Error updating log:", error.response?.data?.message || "Server error");
    }
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
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fuel Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Car Plate:</label>
          <input
            type="text"
            name="plate"
            value={formData.plate || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditLog;
