//models/Student.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: { type: String },
  date: { type: Date },
  timeprep: { type: Number },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient' 
  }]
}, {
  collection: 'meals',
  timestamps: true
});

module.exports = mongoose.model("Meal", mealSchema);
