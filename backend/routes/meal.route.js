// backend/routes/meal.route.js

const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const data = await Meal.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// READ All
router.get("/", async (req, res, next) => {
  try {
    const data = await Meal.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// READ One
router.get("/:id", async (req, res, next) => {
  try {
    const data = await Meal.findById(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const data = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted", data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

module.exports = router;
