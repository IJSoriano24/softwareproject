// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const mealRoute = require("./routes/meal.route");
const authRoute = require("./routes/auth");
const shoppingListRoute = require('./routes/shoppingList.route');
const app = express();




// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//MongoDB Connection
//Optimized MongoDB Connection in server.js
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//Routes
app.use("/api/auth", authRoute);
app.use("/meals", mealRoute);
app.use("/ingredients", require("./routes/ingredient.route"));
app.use('/shopping-list', shoppingListRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || "Server error" });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json("Welcome to the Meal API!");
});

// 404 Error
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.status(404).send("Error 404: Not Found!");
});

