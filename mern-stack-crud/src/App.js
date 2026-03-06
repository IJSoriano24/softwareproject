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
                <Link to={"/create-meal"} className="nav-link">
                  Sustainable Future
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">

                <div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

              <Nav>
  {/* Modal Component */}
  <Button variant="outline-light" onClick={handleShow}>
    Launch Demo Modal
  </Button>


  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Sustainable Future Tip</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Link to={"/create-meal"} className="nav-link">
        Add your meal
      </Link>
                
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</Nav>



                <Nav>
                  <Link to={"/meal-list"} className="nav-link">
                    Meal Planner
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
