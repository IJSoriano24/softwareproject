// Import React
import React from "react";

//Import popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col, Button, Modal } from "react-bootstrap";
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

const [show, setShow] = React.useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/meal-list"} className="nav-link">
                  Sustainable Future
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                {/* 1. The Trigger Button */}
                <Button variant="primary" onClick={handleShow} className="me-2">
                  Create New Meal
                </Button>

                <Nav>
                  <Link to={"/meal-list"} className="nav-link">
                    Meal Planner
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        {/* 2. The Modal containing the Component */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add a New Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* We pass handleClose so the form can shut the modal on success */}
            <CreateMeal closeModal={handleClose} />
          </Modal.Body>
        </Modal>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route path="/" element={<MealList />} />
                  <Route path="/meal-list" element={<MealList />} />
                  <Route path="/edit-meal/:id" element={<EditMeal />} />
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
