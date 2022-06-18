import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function NewUser() {
  const [role, setRole] = useState(false);
  console.log(role);
  return (
    <div>
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col
            md={6}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              marginTop: "20px",
              marginBottom: "20px",
              backgroundColor: "#F9F9F9",
            }}
          >
            <Form>
              <h3
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                Register
              </h3>

              <div>
                <Container fluid>
                  <Row className="mb-3 mt-2" >
                    <Col >
                      <Form.Check
                        label="Govt Official"
                        type="radio"
                        id="inline-radio-1"
                        name="group1"
                        onClick={() => setRole(true)}
                      ></Form.Check>
                    </Col>
                    <Col>
                      <Form.Check
                        label="Citizen"
                        type="radio"
                        id="inline-radio-2"
                        name="group1"
                        onClick={() => setRole(false)}
                      ></Form.Check>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>First Name</Form.Label>
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          type="text"
                          placeholder="Enter First Name"
                          name="First Name"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          type="text"
                          placeholder="Enter Last Name"
                          name="Last Name"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {role && (<><Form.Label>Govt. ID</Form.Label> <Form.Group className="mb-3" controlId="formBasicText">

                      <Form.Control
                        type="text"
                        placeholder="Enter your Govt Id"
                        name="First Name"
                      />
                    </Form.Group></>)}
                  </Row>
                  <Row>
                    <Form.Label>Email</Form.Label>
                  </Row>
                  <Row>
                    <Col md={9}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Enter Email"
                          name="Email"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Button variant="primary" type="submit">
                        Verify
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label>Mobile Number</Form.Label>
                  </Row>
                  <Row>
                    <Col md={9}>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          type="text"
                          placeholder="Enter Mobile Number"
                          name="Mobile"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Button variant="primary" type="submit">
                        Verify
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label>Password</Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label>Confirm Password</Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="password"
                      />
                    </Form.Group>
                  </Row>
                </Container>
              </div>

              <div className="d-grid d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
              <p style={{ textAlign: "right" }}>
                Already registered? <a href="/">Login</a>
              </p>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
}
export default NewUser;
