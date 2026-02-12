//src/Components/edit-meal.component.js

// EditMeal Component for update meal data
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import MealForm from "./MealForm";

// EditMeal Component
const EditMeal = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  //onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put(
        "http://localhost:4000/meals/meals/" + props.match.params.id,
        studentObject,
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Meal successfully updated");
          props.history.push("/meal-list");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get("http://localhost:4000/meals/update-meal/" + props.match.params.id)
      .then((res) => {
        const { name, ingredients, timeprep } = res.data;
        setFormValues({
          name,
          ingredients,
          timeprep,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return meal form
  return (
    <MealForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Update Meal
    </MealForm>
  );
};

// Export EditMeal Component
export default EditMeal;
