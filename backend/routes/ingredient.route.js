const express = require("express");
const router = express.Router();
const Ingredient = require("../models/Ingredient");

router.get("/", async (req, res) => {
  try {
    const data = await Ingredient.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ingredients" });
  }
});

router.post("/find-or-create", async (req, res) => {
  try {
    const normalizedName = String(req.body?.name || "").trim().toLowerCase();
    if (!normalizedName) {
      return res.status(400).json({ message: "Ingredient name is required" });
    }

    let ingredient = await Ingredient.findOne({ name: normalizedName });
    if (!ingredient) {
      ingredient = await Ingredient.create({ name: normalizedName });
    }

    res.json(ingredient);
  } catch (err) {
    if (err.code === 11000) {
      const ingredient = await Ingredient.findOne({ name: String(req.body?.name || "").trim().toLowerCase() });
      return res.json(ingredient);
    }
    res.status(500).json({ message: "Failed to create ingredient", error: err.message });
  }
});

module.exports = router;