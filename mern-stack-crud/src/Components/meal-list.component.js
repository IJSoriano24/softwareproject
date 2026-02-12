//src/Components/meal-list.component.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import MealTableRow from "./MealTableRow";

const MealList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/meals/")
      .then(({ data }) => {
        setMeals(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return meals.map((res, i) => {
      return <MealTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Time Prep</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default MealList;
