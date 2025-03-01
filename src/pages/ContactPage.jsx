import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "../App.css";

function ContactPage() {
  return (
    <div className="about-page">
      <h1>Contact Us</h1>
      <p>If you have any questions or need support, feel free to reach out:</p>
      <ul>
        <li>
          <FaEnvelope /> Email: ibraheemwatad35@gmail.com
        </li>
        <li>
          <FaPhone /> Phone: +123 456 789
        </li>
        <li>
          <FaMapMarkerAlt /> Address: Haifa, Israel
        </li>
      </ul>
    </div>
  );
}

export default ContactPage;
