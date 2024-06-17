import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarE() {
  return (
    <>
    <style type="text/css" >
        {
          `
            .navbar-custom {
              border-bottom: 2px solid #e0e0e0;
              margin-bottom: 2vh;
              background-color: #B7CEDE;
            }
          
          `
        }
    </style>
    <Navbar expand="lg" className="navbar-custom h-20">
      <Container>
        <Navbar.Brand href="#home" className="mr-6">Personal CRM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="visible flex justify-center items-center">
          
            <Nav className="w-full flex justify-center">
              <Link to="/" className="text-black font-bold visible mr-4">
                Home
              </Link>
              <Link to="/tasks" className="text-black font-bold visible ml-4">
                Tasks
              </Link>
              <Link to="/contacts" className="text-black font-bold visible ml-4">
                Contacts
              </Link>
            </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavbarE;
