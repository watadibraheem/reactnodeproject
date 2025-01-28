import React, { useState } from "react";
import "../App.css";

function FuelRequestPage({ setPendingRequests, setActivityLog }) {
  const [fuelRequests, setFuelRequests] = useState([]); // Store all requests
  const [formData, setFormData] = useState({
    driverName: "",
    carPlate: "",
    fuelAmount: "",
    businessName: "",
    stationLocation: "Station A", // Default to Station A
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      ...formData,
      status: formData.fuelAmount > 200 ? "Pending Approval" : "Auto-Approved",
    };

    setFuelRequests([...fuelRequests, newRequest]);

    if (formData.fuelAmount > 200) {
      setPendingRequests((prev) => {
        return [...prev, newRequest];
      });
    } else {
      setActivityLog((prev) => {
        return [...prev, newRequest];
      });
    }

    setFormData({
      driverName: "",
      carPlate: "",
      fuelAmount: "",
      businessName: "",
      stationLocation: "Station A",
    });
  };

  return (
    <div className="fuel-request-page">
      <h1>Fuel Request</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Driver Name:</label>
          <input
            type="text"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Car Plate Number:</label>
          <input
            type="text"
            name="carPlate"
            value={formData.carPlate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Requested Fuel Amount (Shekels):</label>
          <input
            type="number"
            name="fuelAmount"
            value={formData.fuelAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name of the Business:</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Station Location:</label>
          <select
            name="stationLocation"
            value={formData.stationLocation}
            onChange={handleChange}
            required
          >
            <option value="Station A">Station A</option>
            <option value="Station B">Station B</option>
          </select>
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default FuelRequestPage;