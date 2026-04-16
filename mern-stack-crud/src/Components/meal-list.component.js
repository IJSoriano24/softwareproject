import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Table, ButtonGroup, Button, Modal, Badge } from "react-bootstrap";
import MealTableRow from "./MealTableRow";
import ShoppingList from "./shopping-list.component";

const MealCalendarView = ({ onCreateMealForDate }) => {
  const [meals, setMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));

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

  //helper function to format date to YYYY-MM-DD for consistent comparison and display
  const formatLocalDate = (value) => {
    const d = new Date(value);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const mealsByDate = meals.reduce((map, meal) => {
    if (!meal.date) return map;
    const dayKey = formatLocalDate(meal.date);
    if (!map[dayKey]) map[dayKey] = [];
    map[dayKey].push(meal);
    return map;
  }, {});

  const mealDays = Object.fromEntries(
    Object.entries(mealsByDate).map(([date, mealList]) => [
      date,
      mealList.length,
    ]),
  );

  //Filter meals for the selected date
  const selectedDateStr = formatLocalDate(selectedDate);
  const filteredMeals = meals.filter((meal) => {
    if (!meal.date) return false;
    return formatLocalDate(meal.date) === selectedDateStr;
  });

  const visibleMonth = selectedDate.getMonth();
  const visibleYear = selectedDate.getFullYear();
  const mealDayEntries = Object.entries(mealDays)
    .map(([date, count]) => ({ date, count, dateObj: new Date(date) }))
    .filter(
      ({ dateObj }) =>
        dateObj.getMonth() === visibleMonth &&
        dateObj.getFullYear() === visibleYear,
    )
    .sort((a, b) => a.dateObj - b.dateObj);

  const DataTable = () => {
    return filteredMeals.map((res, i) => {
      return <MealTableRow obj={res} key={i} />;
    });
  };

  const renderAddMealControl = ({ date, view }) => {
    const dayKey = formatLocalDate(date);
    const hasMeals = !!mealDays[dayKey];

    return (
      <div style={{ position: "relative", minHeight: "40px" }}>
        {hasMeals && (
          <span
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#198754",
              display: "block",
            }}
            title={`${mealDays[dayKey]} meal(s)`}
          />
        )}
        {view === "month" && (
          <span
            className="calendar-add-meal-button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setSelectedDate(date);
              onCreateMealForDate?.(date);
            }}
            style={{
              position: "absolute",
              bottom: 4,
              right: 4,
              fontSize: "0.75rem",
              backgroundColor: "#878C67",
              padding: "2px 4px",
              borderRadius: "4px",
            }}
          >
            +
          </span>
        )}
      </div>
    );
  };

  //calender view/week view
  function getWeekStart(d) {
    const c = new Date(d);
    const day = c.getDay();
    c.setDate(c.getDate() - (day === 0 ? 6 : day - 1));
    c.setHours(0, 0, 0, 0);
    return c;
  }

  const addDays = (d, n) => {
    const c = new Date(d);
    c.setDate(c.getDate() + n);
    return c;
  };

  const shiftWeek = (delta) => setWeekStart((ws) => addDays(ws, delta * 7));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const weekEnd = addDays(weekStart, 6);
  const weekLabel = `${weekStart.toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
  })} – ${weekEnd.toLocaleDateString("en-IE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  const today = formatLocalDate(new Date());

  //week view
  return (
    <div className="container-fluid mt-4 px-5">
      {/* View toggle */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <ButtonGroup size="sm">
          <Button
            variant={
              view === "month" ? "view-btn view-btn--active" : "view-btn"
            }
            onClick={() => setView("month")}
          >
            Month
          </Button>
          <Button
            variant={view === "week" ? "view-btn view-btn--active" : "view-btn"}
            onClick={() => setView("week")}
          >
            Week
          </Button>
        </ButtonGroup>
      </div>

      {view === "week" && (
        <>
          {/* Week navigation */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => shiftWeek(-1)}
            >
              &#8592;
            </Button>
            <span
              className="fw-semibold"
              style={{ minWidth: 200, textAlign: "center" }}
            >
              {weekLabel}
            </span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => shiftWeek(1)}
            >
              &#8594;
            </Button>
          </div>

          {/* 7 day grid */}
          <div
            className="mb-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gap: "8px",
            }}
          >
            {weekDays.map((day) => {
              const key = formatLocalDate(day);
              const isToday = key === today;
              const dayMeals = mealsByDate[key] || [];

              return (
                <div
                  key={key}
                  className="border rounded p-2"
                  style={{
                    minHeight: 250,
                    backgroundColor: "#F7E4C6",
                    borderColor: isToday ? "#d3c3a0" : undefined,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {/* Day header */}
                  <div style={{ fontSize: "0.7rem", color: "#6c757d" }}>
                    {day.toLocaleDateString("en-IE", { weekday: "short" })}
                  </div>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      color: isToday ? "#7E6352" : undefined,
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {day.getDate()}
                  </div>

                  {/* buttons */}
                  {dayMeals.map((meal) => (
                    <button
                      key={meal._id || meal.id}
                      onClick={() => setSelectedMeal(meal)}
                      style={{
                        background: "#C6A189",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: 4,
                        padding: "3px 6px",
                        fontSize: "0.85rem",
                        textAlign: "left",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                      }}
                      title={meal.name}
                    >
                      {meal.name}
                    </button>
                  ))}

                  {/* Add button */}
                  <button
                    onClick={() => {
                      setSelectedDate(day);
                      onCreateMealForDate?.(day);
                    }}
                    style={{
                      marginTop: "auto",
                      background: "#d5dbae",
                      border: "1px solid #7E6352",
                      borderRadius: 4,
                      padding: "2px 6px",
                      fontSize: "0.85rem",
                      fontWeight: "800",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    + add
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Meal detail modal (week view) ── */}
      <Modal
        show={!!selectedMeal}
        onHide={() => setSelectedMeal(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedMeal?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="text-muted mb-3" style={{ fontSize: "1rem" }}>
            {selectedMeal?.date &&
              new Date(selectedMeal.date).toLocaleDateString("en-IE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </p>

          <table className="table table-sm table-borderless mb-0">
            <tbody>
              <tr>
                <td className="text-muted" style={{ width: 120 }}>
                  Ingredients
                </td>
                <td>
                  {selectedMeal?.ingredients?.map((ing) => ing.name).join(", ")}
                </td>
              </tr>

              <tr>
                <td className="text-muted">Prep time</td>
                <td>{selectedMeal?.timeprep} min</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>

        <Modal.Footer>
          {/* imported edit button */}
          <Button
            variant=""
            className="edit-btn"
            onClick={() => {
              window.location.href = `/edit-meal/${selectedMeal._id}`;
            }}
          >
            Edit Meal
          </Button>
          {/* imported delete button */}
          <Button
            variant=""
            className="delete-btn"
            onClick={() => {
              window.location.href = `/delete-meal/${selectedMeal._id}`;
            }}
          >
            Delete Meal
          </Button>

          {/* close button */}
          <Button
            variant=""
            className="edit-btn"
            onClick={() => setSelectedMeal(null)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* monthly overview */}
      {view === "month" && (
        //two column layout: calendar on left, meal list for selected date on right
        <div className="row">
          <div className="col-lg-5 col-md-12 mb-5">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="custom-calendar shadow-sm border-0 rounded"
              tileContent={renderAddMealControl}
            />
          </div>

          {/* the list of days with meals table */}
          <div className="col-lg-7 col-md-12 ">
            <div
              className="mb-4 shadow-lg rounded border p-3  list-table"
              style={{ maxHeight: 300, overflowY: "auto" }}
            >
              <h4 className="mb-3 text-center ">Days with meals</h4>
              <Table
                size="sm"
                striped
                bordered
                hover
                className="mb-0 list-table-headings"
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Meals</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mealDayEntries.length > 0 ? (
                    mealDayEntries.map(({ date, count, dateObj }) => (
                      <tr
                        key={date}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedDate(dateObj)}
                      >
                        <td>{dateObj.toDateString()}</td>
                        <td>{count}</td>
                        <td>
                          <button
                            className="btn btn-sm  view-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedDate(dateObj);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        No meal days in this calendar yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* meals for that selected date table */}
            <div
              className="shadow-sm rounded border p-3 list-table"
              style={{ maxHeight: 300, overflowY: "auto" }}
            >
              <h4 className="mb-3 text-center">
                Meals for {selectedDate.toDateString()}
              </h4>
              <div className="table-wrapper list-table-headings">
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
                        <td colSpan={4} className="text-center">
                          No meals planned for today.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className="mt-4" />
      <ShoppingList />
    </div>
  );
};

export default MealCalendarView;
