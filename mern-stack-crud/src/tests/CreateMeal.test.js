import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CreateMeal from "../Components/create-meal.component";

jest.mock("../Components/MealForm", () => {
  return function DummyMealForm({ children, onSubmit, initialValues }) {
    return (
      <div>
        <button
          onClick={() =>
            onSubmit({
              name: "Pasta",
              timeprep: 20,
              date: "2026-04-16",
              ingredients: [{ _id: "ing001" }],
            })
          }
        >
          Submit
        </button>
        {children}
      </div>
    );
  };
});

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
  jest.clearAllMocks();
});

describe("CreateMeal component", () => {
  test("renders with the Create Meal label", () => {
    render(<CreateMeal selectedDate={new Date("2026-04-16")} />);
    expect(screen.getByText(/create meal/i)).toBeInTheDocument();
  });

  test("submits a new meal successfully via axios POST", async () => {
    mock.onPost("http://localhost:3000/meals/").reply(201);

    window.alert = jest.fn();
    delete window.location;
    window.location = { reload: jest.fn() };

    render(<CreateMeal selectedDate={new Date("2026-04-16")} />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mock.history.post.length).toBe(1);
    });

    expect(window.alert).toHaveBeenCalledWith("Meal successfully created!");
  });
});
