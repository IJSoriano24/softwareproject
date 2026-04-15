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

  const addToShoppingList = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in before adding ingredients to the shopping list.");
      return;
    }

    axios
      .post(
        `http://localhost:3000/shopping-list/add-meal/${_id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => alert(`"${name}" ingredients added to shopping list!`))
      .catch((error) => {
        const message = error.response?.data?.message || error.message;
        console.error("Failed to add to shopping list", message, error); 
        alert(`Failed to add to shopping list: ${message}`);
      });
  };

  return (
    <tr>
      <td>{name}</td>
      <td>

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
        <Link className="btn btn-sm btn-success me-2 edit-btn" to={"/edit-meal/" + _id}>
          Edit
        </Link>
        <Button onClick={deleteMeal} size="sm" variant="danger" className="me-2 delete-btn">
          Delete
        </Button>
                
          <Button onClick={addToShoppingList} size="sm" variant="success" className="me-2 cart-btn">
          🛒
        </Button>
      </td>
    </tr>
  );
};

export default MealTableRow;