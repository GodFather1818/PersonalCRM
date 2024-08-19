import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarE() {
  return (
    <div className="relative">
    <style type="text/css" >
        {
          `
            .navbar-custom {
              border-bottom: 2px solid #e0e0e0;
              margin-bottom: 2vh;
              font-weight: bold;
              width: 100%'
              
            }
            @media (max-width: 576px) {
              .navbar-custom {
                height: 200px; 
              }
            }
            @media (min-width: 991px) {
              .navbar-custom {
                height: 6rem;
              }
            }
            .navbar-collapse {
              justify-content: flex-end;
            }
            .nav-link {
              color: black;
              font-weight: bold;
              margin-right: 1rem;
            }
            .nav-link:last-child {
              margin-right: 0;
            }
            @media (max-width: 992px) {
              .nav-link {
                margin: 0;
                padding: 0.5rem 1rem;
              }
            }
          
          `
        }
    </style>
    <Navbar expand="lg" className="navbar-custom shadow z-99">
      <Container >
        <Navbar.Brand href="#home" className="mr-6 font-Playwrite">Cordially</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="visible  flex justify-center items-center">
          
            <Nav className="">
              <Link to="/" className="text-black font-bold visible mr-4 nav-link">
                Home
              </Link>
              <Link to="/tasks" className="text-black font-bold visible ml-4 nav-link">
                Tasks
              </Link>
              <Link to="/contacts" className="text-black font-bold visible ml-4 nav-link">
                Contacts
              </Link>
              <Link to="/entries" className="text-black font-bold visible ml-4 nav-link">
                Journals
              </Link>
              <Link to="/password-manager" className="text-black font-bold visible ml-4 nav-link">
                Password Manager
              </Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavbarE;
