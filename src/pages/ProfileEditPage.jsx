import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ProfileEditPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    contact: "",
    profileImage: null, // Store uploaded image
  });

  const [preview, setPreview] = useState(); // Image preview
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch current user data when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:8801/users/check-session", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.user) {
          setFormData({
            email: response.data.user.email,
            phone: response.data.user.phone || "",
            contact: response.data.user.contact || "",
          });

          if (response.data.user.profile_image) {
            setPreview(
              `http://localhost:8801${response.data.user.profile_image}`
            );
          }
        }
      })
      .catch(() => setError("Failed to load user data."));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });

    // ✅ Preview selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("contact", formData.contact);
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    try {
      const response = await axios.put(
        "http://localhost:8801/users/update-profile",
        formDataToSend,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message || "Profile updated successfully!");
      navigate("/"); // ✅ Redirect to home or profile page
    } catch (error) {
      setError(error.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="profile-edit-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

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

        <label>Profile Picture:</label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview && (
          <img
            src={preview}
            alt="Profile Preview"
            className="profile-preview"
          />
        )}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileEditPage;
