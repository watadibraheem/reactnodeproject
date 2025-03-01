import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function ActivityLogPage() {
  const [activityLog, setActivityLog] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:8801/fuel-requests", { withCredentials: true })
      .then((response) => {
        setActivityLog(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching logs:",
          error.response?.data?.message || "Server error"
        );
      });
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  const handleDeleteLog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:8801/fuel-requests/${id}`,
        {
          withCredentials: true,
        }
      );

      alert(response.data.message || "Log deleted successfully!");

      // ✅ Remove the deleted log from the UI
      setActivityLog((prevLogs) => prevLogs.filter((log) => log.id !== id));
    } catch (error) {
      console.error(
        "Error deleting log:",
        error.response?.data?.message || "Server error"
      );
      alert(error.response?.data?.message || "Failed to delete log.");
    }
  };




  return (
    <div className="activity-log">
      <h1>Activity Log</h1>
      <button className="back-btn" onClick={handleBack}>
        ⬅ Back
      </button>
      {activityLog.length === 0 ? (
        <p>No activities to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Fuel Amount</th>
              <th>Plate Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.map((log) => (
              <tr key={log.id}>
                <td>{log.name}</td>
                <td>{log.amount}</td>
                <td>{log.plate}</td>
                <td>
                  <Link to="/single-log" state={{ post: log }}>
                    <button className="viewLog-btn">View Log</button>
                  </Link>
                  <button
                    className="viewLog-btn"
                    onClick={() => handleDeleteLog(log.id)}
                  >
                    Delete Log
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityLogPage;
