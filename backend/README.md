# JoltNotify - Collaborative Resource Reminder App

## Step-by-Step Backend Setup

### Step 1: Set Up the Project Directory

#### Create a New Project Directory

1. Open your terminal.
2. Create a new directory for your project and navigate into it:
   - Type: `mkdir joltnotify`
   - Press Enter.
   - Type: `cd joltnotify`
   - Press Enter.

#### Create a `backend` Folder

1. Inside the `joltnotify` directory, create a folder for the backend:
   - Type: `mkdir backend`
   - Press Enter.
   - Type: `cd backend`
   - Press Enter.

#### Initialize the Project with `npm`

1. Inside the `backend` directory, initialize a new Node.js project:
   - Type: `npm init -y`
   - Press Enter.

### Step 2: Install Essential Packages

#### Install Express, Mongoose, and dotenv

1. Run the following command to install the essential packages:
   - Type: `npm install express mongoose dotenv`
   - Press Enter.

### Step 3: Environment Variables

#### Create a `.env` File

1. Inside your `backend` directory, create a file named `.env`:
   - Use a text editor to create the file `.env` and save it in your `backend` directory.

#### Add Content to the `.env` File

2. Add the following content to the `.env` file:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`

### Step 4: Set Up Database Connection

#### Create a `db.js` File

1. Inside the `backend/config` directory, create a file named `db.js`.
   - Use a text editor to create the file and save it in the `backend/config` directory.

#### Add Content to the `db.js` File

2. Add the following content to the `db.js` file to set up the MongoDB connection:

   ```javascript
   const mongoose = require("mongoose");

   const connectDB = async () => {
     try {
       await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log("MongoDB connected");
     } catch (err) {
       console.error(err.message);
       process.exit(1);
     }
   };
   module.exports = connectDB;
   ```

### Step 5: Set Up Express Server

#### Create a `server.js` File

1. Inside the `backend` directory, create a file named `server.js`.
   - Use a text editor to create the file and save it in the `backend` directory.

#### Add Content to the `server.js` File

2. Add the following content to the `server.js` file to set up the Express server:

   ```javascript
   const express = require("express");
   const connectDB = require("./config/db");
   require("dotenv").config();

   const app = express();
   connectDB();

   app.use(express.json());

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

### Step 6: Run the Server

#### Start the Server

1. In your terminal, navigate to the `backend` directory.
2. Run the following command to start the server:
   - Type: `node server.js`
   - Press Enter.

You should see the message `Server running on port 5000` and `MongoDB connected` in your terminal.

### Step 7: Define Models

#### Create a `User` Model

1. Inside the `backend/models` directory, create a file named `User.js`.

   - Use a text editor to create the file and save it in the `backend/models` directory.

2. Add the following content to the `User.js` file to define the user schema:

   ```javascript
   const mongoose = require("mongoose");

   const UserSchema = new mongoose.Schema(
     {
       name: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       isDeleted: { type: Boolean, default: false },
     },
     { timestamps: true }
   );

   module.exports = mongoose.model("User", UserSchema);
   ```
