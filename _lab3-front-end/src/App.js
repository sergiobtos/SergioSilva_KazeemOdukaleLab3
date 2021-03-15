import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import CreateStudent from './components/CreateStudent';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <Navbar.Collapse id="basic=navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/createStudent">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar.Toggle>
      </Navbar>

    <div>
    <Route render ={()=> < Home />} path="/home" />
    <Route render ={()=> < CreateStudent />} path="/createStudent" />
    </div>

    </Router>
  );
}

export default App;
