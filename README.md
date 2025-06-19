# 📚 Book Review Platform

A full-stack book review web application with role-based access for **users** and **admins**, built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🌟 Features

- 🔍 Book search with title/author filter and rating dropdown
- 🧑‍💬 Add and view book reviews with star ratings
- ✍️ Edit personal bio in profile page
- 🔐 Role-based actions:
  - **Users** can search, view, and review books
  - **Admins** can also add/delete books and delete any review
- 📋 Pagination for browsing books
- 💅 Modern, consistent UI across all pages for both roles

---

## ⚙️ Setup Instructions

1. **Download/clone the repository** and open it in VS Code
   ```bash
   git clone https://github.com/NaveedBuhari/Book-Review-Platform.git

2. **Navigate to the root project folder and install dependencies:**
   ```bash
   cd server
   npm install

   # In a new terminal
   cd client
   npm install

3. **Run server**

   ```bash
   cd server
   node app.js

You should see: MongoDB connected and Server running on port 5000

4. **Run client:**
   Open a new terminal:
   ```bash
   cd client
   npm start

**NOTE**
-The node_modules folder is excluded from Git using .gitignore
-Be sure to run npm install separately inside both client/ and server/ before running the app.


