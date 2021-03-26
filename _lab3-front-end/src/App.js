import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//

import CreateStudent from './components/CreateStudent';
import Home from './components/Home';
import SignIn from './components/SignIn';
import List from './components/List';
import ShowCourse from './components/ShowCourse' ;
import EditCourse from './components/EditCourse';
import ListCourses from './components/ListCourses';

function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
            <Nav.Link href="/signin">Sign In</Nav.Link>
            <Nav.Link href="/list">List of Students</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />         
          <Route render ={()=> < CreateStudent />} path="/create" />
          <Route render ={()=> < SignIn />} path="/signin" />
          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < ShowCourse />} path="/showcourse/:id" />
          <Route render ={()=> < EditCourse />} path="/editcourse/:id" />
          <Route render ={()=> < ListCourses />} path="/courses" />
      </div>

    </Router>


  );
}

export default App;

