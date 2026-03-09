
import React, { useState, useEffect } from "react";
import axios from "axios";
import MealForm from "./MealForm";

//createmeal component
const CreateMeal = ({ closeModal }) => { 
  const [formValues, setFormValues] = useState({
    name: "",
    ingredients: "",
    timeprep: "",
  });

  const onSubmit = (mealObject) => {
    axios
      .post("http://localhost:3000/meals/", mealObject)
      .then((res) => {
        alert("Meal successfully created!");
        if (closeModal) closeModal(); 
       
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
