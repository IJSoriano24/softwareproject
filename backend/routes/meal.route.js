// backend/routes/meal.route.js

const express = require("express");
const router = express.Router();
const Meal = require("../models/Meal");

//create
router.post("/", async (req, res, next) => {
  try {
    const data = await Meal.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

//read all
router.get("/", async (req, res, next) => {
  try {
    const data = await Meal.find().populate("ingredients");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

//read one
router.get("/edit-meal/:id", async (req, res, next) => {
  try {
    const data = await Meal.findById(req.params.id).populate("ingredients");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

//update
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

//delete
router.delete("/:id", async (req, res, next) => {
  try {
    const data = await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted", data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


