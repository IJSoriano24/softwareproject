// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import other React Components
import CreateMeal from "./Components/create-meal.component";
import EditMeal from "./Components/edit-meal.component";
import MealList from "./Components/meal-list.component";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-meal"} className="nav-link">
                  React MERN Stack App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-meal"} className="nav-link">
                    Create Meal
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/meal-list"} className="nav-link">
                    Meal List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route path="/" element={<CreateMeal />} />
                  <Route path="/create-meal" element={<CreateMeal />} />
                  <Route path="/edit-meal/:id" element={<EditMeal />} />
                  <Route path="/meal-list" element={<MealList />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
