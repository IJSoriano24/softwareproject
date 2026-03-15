
import React from "react";
import axios from "axios";
import MealForm from "./MealForm";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

//createmeal component
const CreateMeal = ({ closeModal, selectedDate }) => {
  const formValues = {
    name: "",
    ingredients: [],
    timeprep: "",
    date: (selectedDate || new Date()).toISOString().split('T')[0],
  };

 const onSubmit = (mealObject) => {
  const hasLocalIngredients = mealObject.ingredients.some((ing) => String(ing._id).startsWith("tmp-"));

  if (hasLocalIngredients) {
    alert("Please wait while we process the ingredients. If the issue persists, try again.");
    return;
  }


    const ingredientIds = mealObject.ingredients
    .map((ing) => ing?._id)
    .filter((id) => id && !String(id).startsWith("tmp-"));

  const finalMealData = {
    name: mealObject.name,
    timeprep: mealObject.timeprep, 
    date: mealObject.date,
    ingredients: ingredientIds,
  };

  axios
    
    .post(`${API_BASE_URL}/meals/`, finalMealData) 

    

    .then((res) => {
      alert("Meal successfully created!");
      if (closeModal) closeModal(); 
      window.location.reload();
    })
    .catch((err) => {
      console.error("The error is:", err.response || err);
      alert("Error: " + (err.response?.data?.message || err.message));
    });
};

  return (
    <MealForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Create Meal
    </MealForm>
  );
};

export default CreateMeal;
