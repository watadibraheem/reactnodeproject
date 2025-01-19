import React from "react";
import "../App.css";

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About the Fuel Management System</h1>
      <p>
        This system streamlines fuel requests and approvals, providing a
        seamless way to manage fuel usage for businesses. Key features include:
      </p>
      <ul>
        <li>Submitting fuel requests</li>
        <li>Approval workflows for requests above 200 shekels</li>
        <li>Activity logs for tracking completed fueling tasks</li>
      </ul>
      <p>
        Designed to optimize fueling operations and ensure transparency in fuel
        usage.
      </p>
    </div>
  );
}

export default AboutPage;
