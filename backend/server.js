const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch(() => {
    console.error("Database connection failed");
    process.exit(1);
  });

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/notes", require("./routes/noteRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Health check (useful for deployment)
app.get("/", (req, res) => {
  res.send("API is running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});