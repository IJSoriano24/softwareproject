//src/Components/MealTableRow.js

import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MealTableRow = (props) => {
  const { _id, name, ingredients, timeprep } = props.obj;

  const deleteMeal = () => {
    axios
      .delete("http://localhost:4000/meals/meals/" + _id)
      .then((res) => {
        if (res.status === 200) {
          alert("Meal successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{ingredients}</td>
      <td>{timeprep}</td>
      <td>
        <Link className="edit-link" to={"/edit-meal/" + _id}>
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
