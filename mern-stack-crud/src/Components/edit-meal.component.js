import React, { useState, useEffect } from "react";
import axios from "axios";
import MealForm from "./MealForm";
import { useParams, useNavigate } from "react-router-dom"; 

const EditMeal = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    ingredients: "",
    timeprep: "",
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
      .get("http://localhost:3000/meals/" + id)
      .then((res) => {
        const { name, ingredients, timeprep } = res.data;
        setFormValues({ name, ingredients, timeprep });
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
