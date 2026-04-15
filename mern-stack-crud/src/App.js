//import react
import React from "react";

//import bootstrap
import { Nav, Navbar, Container, Row, Col, Button, Modal, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

//import custom CSS
import "./App.css";

//import from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

//import other React Components
import CreateMeal from "./Components/create-meal.component";
import EditMeal from "./Components/edit-meal.component";
import MealList from "./Components/meal-list.component";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

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
          <Navbar className="header">
            <Container >
              <Navbar.Brand>
                <Link to={"/meal-list"} className="nav-link" style={{color: "#B9BF90", fontWeight: "800"}}>
                  Sustainable Future
                </Link>
              </Navbar.Brand>

<Nav className="justify-content-end align-items-center">
  <Button variant="" onClick={() => handleShow()} className="me-2 create-new-btn">
    Create New Meal
  </Button>

  <Link to={"/meal-list"} className="nav-link me-2 view-btn">
    Meal Planner
  </Link>

  {/* Settings Dropdown */}
  <NavDropdown title="Settings" id="basic-nav-dropdown" align="end">
    <NavDropdown.Item as={Link} to="/edit-profile">
      Edit Profile
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={() => {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }}>
      Logout
    </NavDropdown.Item>
  </NavDropdown>
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

                <Route path="/" element={<Navigate to="login" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/meal-list" element={<MealList onCreateMealForDate={handleShow} />} />
                  <Route path="/edit-meal/:id" element={<EditMeal />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
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
