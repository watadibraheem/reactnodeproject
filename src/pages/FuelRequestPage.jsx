import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function FuelRequestPage() {
 const [formData, setFormData] = useState({
  name: "",
  plate: "",
  amount: "", 
});

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8801/fuel-requests",
        formData,
        {
          withCredentials: true, // Important for session handling
        }
      );

      alert(response.data.message); // Show success message
      setFormData({
        driverName: "",
        carPlate: "",
        fuelAmount: "",
      });
    } catch (error) {
      console.error(
        "Error submitting request:",
        error.response?.data?.message || "Server error"
      );
    }
  };

  return (
    <div className="fuel-request-page">
      {/* ✅ Back Button */}
      <button className="back-btn" onClick={handleBack}>
        ⬅ Back
      </button>
      <h1>Fuel Request</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Driver Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Car Plate Number:</label>
          <input
            type="text"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Requested Fuel Amount (Shekels):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submitRequest-btn" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default FuelRequestPage;