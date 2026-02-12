import React, { useState, useEffect } from "react";
import axios from "axios";
import MealForm from "./MealForm";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks

const EditMeal = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    ingredients: "",
    timeprep: "",
  });

  // 1. Get the ID from the URL using hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. onSubmit handler
  const onSubmit = (mealObject) => {
    axios
      .put("http://localhost:3000/meals/" + id, mealObject) // Use 'id' directly
      .then((res) => {
        if (res.status === 200) {
          alert("Meal successfully updated");
          navigate("/meal-list"); // Use navigate instead of props.history
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // 3. Load data from server
  useEffect(() => {
    // Note: Changed port from 4000 to 3000 and updated path to match your route
    axios
      .get("http://localhost:3000/meals/" + id)
      .then((res) => {
        const { name, ingredients, timeprep } = res.data;
        setFormValues({ name, ingredients, timeprep });
      })
      .catch((err) => console.log(err));
  }, [id]); // Add id as dependency

  return (
    <MealForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Update Meal
    </MealForm>
  );
};

export default EditMeal;
