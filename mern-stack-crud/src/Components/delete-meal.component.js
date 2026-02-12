//src/Components/delete-meal.component.js
// DeleteMeal Component for delete meal data
// Import Modules
import React from "react";
import axios from "axios";


// DeleteMeal Component
const DeleteMeal = (props) => {
  // onSubmit handler
  const onSubmit = () => {
    axios
      .delete("http://localhost:3000/meals/" + props.match.params.id)
      .then((res) => {
        if (res.status === 200) {
          alert("Meal successfully deleted");
          props.history.push("/meal-list");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Return delete confirmation
  return (
    <div className="delete-meal">
      <h3>Are you sure you want to delete this meal?</h3>
      <button onClick={onSubmit} className="btn btn-danger">
        Yes, Delete
      </button>
    </div>
  );
};

// Export DeleteMeal Component
export default DeleteMeal;
