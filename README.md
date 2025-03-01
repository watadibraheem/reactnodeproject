# Fuel Management System 🚗⛽

The **Fuel Management System** is designed to streamline fuel requests and approvals efficiently. This system allows **users** to submit fuel requests, **admins** to manage approvals for high-value requests, and **tracks all actions** via an activity log.

---

## 🚀 Features

### ✅ Submit Fuel Requests

- Users can submit fuel requests by providing:
  - **Driver Name**
  - **Car Plate Number**
  - **Requested Fuel Amount**
  - **Business Name**
  - **Location**
- **Approval System:**
  - **Requests ≤ 200 shekels** → Auto-approved ✅.
  - **Requests > 200 shekels** → Requires **admin approval** 🚦.

---

### 🛠️ **Admin Dashboard**
- Admins can:
  - **Approve/Reject** fuel requests over **200 shekels**.
  - **View and manage** pending and rejected requests.
  - **Register new users** (Only admins can add users).
  - **Delete fuel requests** when necessary.

---

### 📋 **Activity Log**
- **Tracks all fuel requests** (Approved, Auto-Approved, Rejected).
- Displays key details:
  - **Driver Name**
  - **Car Plate Number**
  - **Fuel Amount**
  - **Business Name**
  - **Status** (Auto-Approved/Admin-Approved/Rejected)

---

### 👤 **User Profile Management**
**(New Feature)**
- Users can **edit their profile**:
  - **Update Email, Phone, Contact Person**.
  - **Upload a Profile Picture** 📸 (Stored using **Multer**).
- Profile pictures are displayed throughout the app.

---

### ❌ **Delete Log Feature**
**(New Feature)**
- Users can **delete their own logs**, and admins can delete **any** log.
- Deleted logs are **removed from the database** permanently.

---

### 🔒 **Security Updates**
- **Password Validation** in the **Register Page**:
  - **Minimum 8 characters**.
  - **At least 1 uppercase letter**.
  - **At least 1 lowercase letter**.
  - **At least 1 number**.
  - **At least 1 special character** (@, $, !, %, *, ?, &).

---

## 🏗️ **How It Works**
### **1️⃣ Requests ≤ 200 Shekels**
- ✅ **Auto-approved** & logged **immediately**.
- 📜 **Appears in the activity log**.

### **2️⃣ Requests > 200 Shekels**
- 🚦 **Requires Admin Approval**.
- 📍 **Appears in Admin Dashboard** for review.

### **3️⃣ Admin Actions**
- 🟢 **Approved Requests** → Move to **Activity Log**.
- 🔴 **Rejected Requests** → Saved in a **separate rejected list**.

---

## **🛠️ Tech Stack**
- **Frontend**: React.js ⚛️
- **Backend**: Node.js + Express.js 🚀
- **Database**: MySQL 🗄️
- **Authentication**: Sessions (Express-Session) 🔐
- **File Uploads**: Multer 🖼️

---

## **📌 Additional Notes**
- **Profile Pictures are uploaded** & stored **using Multer**.
- **Admins can manage users** & control fuel requests.
- **Activity Logs provide full transparency** on fuel requests.

---

🚀 **Project is now fully functional with new features!** 🎯  
✅ **Updated with Profile Management, Log Deletion, Security Fixes, and Improved UI!**  

---
