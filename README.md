# 📚 Book Review Platform

A full-stack book review platform with different interfaces for regular users and admins. Users can browse, search, and review books, while admins can manage books and moderate reviews. It is built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🔥 Features

### 👤 Users
- View all books with pagination.
- Search books by title or author.
- Filter books based on minimum rating.
- View individual book details.
- Submit reviews (rating + comment).
- Edit personal bio from profile page.

### 🛡️ Admins
- All user features +
- Add new books directly from the interface.
- Delete any book.
- Delete any user review (moderation).
- Admin tag appears next to their reviews.

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
- The node_modules folder is excluded from Git using .gitignore
- Be sure to run npm install separately inside both client/ and server/ before running the app.
- This project uses a local MongoDB instance running on port 27017. Ensure MongoDB is installed and running locally before starting the server. Alternatively, you may update the connection string in server/app.js to use a remote MongoDB service like MongoDB Atlas if preferred.


