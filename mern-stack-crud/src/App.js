//import react
import React from "react";

//import bootstrap
import { Nav, Navbar, Container, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

//import custom CSS
import "./App.css";

//import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//import other React Components
import CreateMeal from "./Components/create-meal.component";
import EditMeal from "./Components/edit-meal.component";
import MealList from "./Components/meal-list.component";

//app component
const App = () => {

const [show, setShow] = React.useState(false);
const [selectedCreateDate, setSelectedCreateDate] = React.useState(new Date());
const handleClose = () => setShow(false);
const handleShow = (date = new Date()) => {
  setSelectedCreateDate(date);
  setShow(true);
};

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
               
                <Button variant="primary" onClick={() => handleShow()} className="me-2">
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

      {/* modal containing component */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add a New Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* close modal when meal is successfully added */}
            <CreateMeal closeModal={handleClose} selectedDate={selectedCreateDate} />
          </Modal.Body>
        </Modal>

        

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route path="/" element={<MealList onCreateMealForDate={handleShow} />} />
                  <Route path="/meal-list" element={<MealList onCreateMealForDate={handleShow} />} />
                  <Route path="/edit-meal/:id" element={<EditMeal />} />
                  <Route path="/shopping-list" element={<ShoppingList />} />
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
