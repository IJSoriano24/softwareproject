import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../pages/Register";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe("Register component", () => {
  test("renders the registration form", () => {
    render(
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Register />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/register/i)).toBeInTheDocument();
  });

  test("submits the form and navigates to /login on success", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "User created" }),
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByDisplayValue(/register/i));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth/register"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "John",
            email: "john@example.com",
            password: "password123",
          }),
        }),
      );

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
