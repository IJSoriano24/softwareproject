import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MealTableRow = (props) => {
  const { _id, name, ingredients, timeprep } = props.obj;

  const deleteMeal = () => {
    axios
      .delete("http://localhost:3000/meals/" + _id) 
      .then((res) => {
        if (res.status === 200) {
          alert("Meal successfully deleted");
          window.location.reload();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        {/* FIX: Use 'ingredients' directly, not 'meal.ingredients' */}
        {ingredients && ingredients.length > 0
          ? ingredients.map((ing) => (
              <span key={ing._id} className="badge bg-light text-dark me-1 border">
                {ing.name}
              </span>
            ))
          : "No ingredients"}
      </td>
      <td>{timeprep}</td>
      <td>
        <Link className="btn btn-sm btn-success me-2" to={"/edit-meal/" + _id}>
          Edit
        </Link>
        <Button onClick={deleteMeal} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default MealTableRow;