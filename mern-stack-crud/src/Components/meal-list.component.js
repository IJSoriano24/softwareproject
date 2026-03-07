import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { Table } from "react-bootstrap";
import MealTableRow from "./MealTableRow";

const MealCalendarView = () => {
  const [meals, setMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const filteredMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.date).toDateString();
    return mealDate === selectedDate.toDateString();
  });

  const DataTable = () => {
    return filteredMeals.map((res, i) => {
      return <MealTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate} 
            className="shadow-sm border-0 rounded"
          />
        </div>
        
        <div className="col-md-8">
          <h4 className="mb-3">Meals for {selectedDate.toDateString()}</h4>
          <div className="table-wrapper">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ingredients</th>
                  <th>Time Prep</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeals.length > 0 ? (
                  DataTable()
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">No meals planned for today.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCalendarView;