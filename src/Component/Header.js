import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  Button,
  Offcanvas,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../services/appApi";
function Header() {
  let navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const [logout,{isLoading}] = useLogoutUserMutation();
  async function handleLogout() {
    try {
      const res = await logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <Navbar  key="md" expand="md"  style ={{backgroundColor:"#E0FFFF"}} className="mb-3" sticky="top">
        <Container fluid>
          <Col sm={1}>
            <Row>
              <Navbar.Brand href="/">

                <img
                  src="./Assets/Images/emblem.png"
                  style={{ height: "80px", width: "80px" }}
                  alt="emblem"
                ></img>
              </Navbar.Brand>
            </Row>
          </Col>
          <Col>
            {/* <Row>
              <Navbar.Brand href="/" style={{ color: "#007bff" }}>
                <b>মৃত্যু ভিত্তিক তথ্য বিশ্লেষণ ব্যৱস্থা</b>
              </Navbar.Brand>
            </Row> */}
            <Row>
              <Navbar.Brand href="/" style={{ color: "#007bff" }}>
                <b>MORTALITY BASED DATA ANALYTICS SYSTEM</b>
              </Navbar.Brand>
            </Row>
          </Col>

          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Body>
              <Nav variant="pills" style ={{}}  className="justify-content-end  flex-grow-1 pe-3" >
                <Nav.Item>
                  <Nav.Link href ="/"eventKey="/" ><b style={{ fontSize: '20px' }}>Home</b></Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  {!user && <Nav.Link href="/register" eventKey="/register"><b style={{ fontSize: '20px' }} >Sign up</b></Nav.Link>}
                </Nav.Item>
                <Nav.Item>
                  {!user && <Nav.Link href="/login" eventKey="login"><b style={{ fontSize: '20px' }}>Login</b></Nav.Link>}
                </Nav.Item>
                <Nav.Item>
                  {user && <Nav.Link href="/form" eventKey="/form"><b style={{ fontSize: '20px' }}>Form</b></Nav.Link>}
                </Nav.Item>
                <Nav.Item>
                  {user && user.role === "admin" && (
                    <Nav.Link href="/adminDashboard" eventKey="/adminDashboard"><b style={{ fontSize: '20px' }}>Admin Dashboard</b></Nav.Link>
                  )}
                </Nav.Item>
                <Nav.Item>

                  {user && user.role === "admin" && (
                    <Nav.Link href="/dataanalytics"><b style={{ fontSize: '20px' }}>Data Analysis</b></Nav.Link>
                  )}
                </Nav.Item>

                {user && (
                  <Button variant="outline-danger" className="ml-2" onClick={handleLogout} style={{ fontSize: '20px' }}>
                    {isLoading && <Spinner animation="grow" variant="danger" size ="sm" />} Logout
                  </Button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
