// models/Student.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    timeprep: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true,
    collection: "meals",
  },
);

module.exports = mongoose.model("Meal", mealSchema);
