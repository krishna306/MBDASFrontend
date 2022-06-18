import React from "react";
import { Navbar, Container, Row, Col, Nav, NavDropdown } from "react-bootstrap";

function Header() {
  return (
   

    <Container fluid>
      <Row
        style={{ backgroundColor: "#D3FCFF", borderBottom: "2px solid black" }}
        className="py-4"
      >
        <Col md={3} sm={3} xs={3}>
          <img src="./Assets/Images/emblem.png" style={{ width: "100px" }}></img>
        </Col>
        <Col md={6} sm={6} xs={6}className="text-center">
          <p
            className="hindiHeading"
            style={{
              fontFamily: ["Hindi", "sans-serif"],
              fontWeight: "bolder",
              fontSize: "25px",
            }}
          >
            মৃত্যু আধাৰিত তথ্য বিশ্লেষণ প্ৰণালী
          </p>
          <p
            className="englishHeading"
            style={{ fontWeight: "bold", fontSize: "25px" }}
          >
            MORTALITY BASED DATA ANALYTICS SYSTEM
          </p>
        </Col>
        <Col md={3} sm={3} xs={3} className="" style ={{textAlign:"right"}}>
          <img src="./Assets/images/logo2.png" style={{ width: "100px" }}></img>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
