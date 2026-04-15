import React, { useState, useEffect } from "react";
import axios from "axios";
import MealForm from "./MealForm";
import { useParams, useNavigate } from "react-router-dom"; 

const formatLocalDate = (date) => {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const EditMeal = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    ingredients: [],
    timeprep: "",
    date: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  

  const onSubmit = (mealObject) => {
    axios
      .put("http://localhost:3000/meals/" + id, mealObject) 
      .then((res) => {
        if (res.status === 200) {
          alert("Meal successfully updated");
          navigate("/meal-list"); 
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/meals/edit-meal/" + id)
      .then((res) => {
        const { name, ingredients, timeprep, date } = res.data;
        setFormValues({
          name: name || "",
          ingredients: Array.isArray(ingredients) ? ingredients : [],
          timeprep: timeprep || "",
          date: date ? formatLocalDate(date) : "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]); 

  return (
    <MealForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Update Meal
    </MealForm>
  );
};

export default EditMeal;
