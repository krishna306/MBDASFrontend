import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Forget() {
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
              backgroundColor:"#F9F9F9"
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
                Forget Password
              </h3>

              <div>
                <Container fluid>
                  <Row>
                    <Form.Label>Email/Mobile</Form.Label>
                  </Row>
                  <Row>
                    <Col md={9}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Enter Email/Mobile"
                          name="Email_Mobile"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Button variant="primary" type="submit">
                        Send OTP
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label>Enter OTP</Form.Label>
                  </Row>
                  <Row>
                    <Col md={9}>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          type="text"
                          placeholder="Enter OTP"
                          name="OTP"
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
                    <Form.Label>New Password</Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Enter New Password"
                        name="Newpassword"
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
                  Submit
                </Button>
              </div>
              <p style={{ textAlign: "right" }}>
                Back To Login? <a href="/">Login</a>
              </p>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Forget;
