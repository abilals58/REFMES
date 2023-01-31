import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.png';
import "../components/navbar.css";

function Brand() {
    return (
      <>
      <Navbar className="py-4 " bg="white" expand="lg" >
      <Container style={{justifyContent: "center"}}>
        <Navbar.Brand>
            <a href="/"><img src={logo} style={{height: "72px"}} alt='logo'/></a>
        </Navbar.Brand>
      </Container>
    </Navbar>
      </>
    );
  }
  export default Brand;