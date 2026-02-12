// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const mealRoute = require("./routes/meal.route");
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
// Optimized MongoDB Connection in server.js
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/meals", mealRoute);

// 404 Error
app.use((req, res) => {
  res.status(404).send("Error 404: Not Found!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message);
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json("Welcome to the Meal API!");
});

// Export app for testing
