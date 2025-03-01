import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function RegisterUserPage() {
  const [formData, setFormData] = useState({
    business_name: "",
    email: "",
    password: "",
    role: "user", // Default role
    phone: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // For password validation errors
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = /.{8,}/; // At least 8 characters
    const hasUppercase = /[A-Z]/; // At least 1 uppercase letter
    const hasLowercase = /[a-z]/; // At least 1 lowercase letter
    const hasNumber = /\d/; // At least 1 number
    const hasSpecialChar = /[@$!%*?&]/; // At least 1 special character

    if (!minLength.test(password))
      return "Password must be at least 8 characters long.";
    if (!hasUppercase.test(password))
      return "Password must include at least 1 uppercase letter.";
    if (!hasLowercase.test(password))
      return "Password must include at least 1 lowercase letter.";
    if (!hasNumber.test(password))
      return "Password must include at least 1 number.";
    if (!hasSpecialChar.test(password))
      return "Password must include at least 1 special character (@$!%*?&).";

    return ""; // No errors, password is valid
  };


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:8801/users/register",
        formData,
        {
          withCredentials: true, // Required for session-based authentication
        }
      );

      alert("User registered successfully!", response.data.message);
      navigate("/admin-dashboard"); // ✅ Redirect back to Admin Dashboard
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="register-container">
      <h2>Create New User</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Business Name:</label>
        <input
          type="text"
          name="business_name"
          value={formData.business_name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {passwordError && <p className="password-error">{passwordError}</p>}

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Contact Person:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <button type="submit">Register User</button>
      </form>
    </div>
  );
}

export default RegisterUserPage;
