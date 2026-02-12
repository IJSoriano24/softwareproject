// src/Components/create-meal.component.js

// CreateMeal Component for add new meal
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import MealForm from "./MealForm";

// CreateMeal Component
const CreateMeal = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    ingredients: "",
    timeprep: "",
  });
  // onSubmit handler
  const onSubmit = (mealObject) => {
    axios
      .post("http://localhost:3000/meals/", mealObject)
      .then((res) => {
        alert("Meal successfully created!");
      })
      .catch((err) => {
        console.error("The error is:", err.response || err);
        alert("Error: " + (err.response?.data?.message || err.message));
      });
  };

  // Return meal form
  return (
    <MealForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Create Meal
    </MealForm>
  );
};

// Export CreateMeal Component
export default CreateMeal;
