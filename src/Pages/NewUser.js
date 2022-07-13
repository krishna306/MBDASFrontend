import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSignupUserMutation } from "../services/appApi";
import PageNotFound from "./PageNotFound";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
function NewUser() {
  const [visibilityp, setVisibilityp] = useState(false);
  const [visibilitycp, setVisibilitycp] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [signup, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [inputField, setInputField] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  const inputHandler = (e) => {
    e.preventDefault();
    setValidated(true);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  if (user && user.role === "citizen") {
    return <PageNotFound />;
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (user && user.role === "admin") {
      inputField.role = "admin";
    }
    const res = await signup(inputField);
    if (res.error && res.error.data.code === 11000) {
      toast.error(`${res.error.data.keyValue.email} already used`);
    } else if (res.error && res.error.status === 400) {
      toast.error("Some error Occurred");
    } else {
      if (user && user.role === "admin") {
        toast.success("New admin successfully Created..");
        setTimeout(() => {
          navigate("/adminDashboard");
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1000);
        toast.success("Registered Successfully");
      }
    }
  };

  function onChange(value) {
    setCaptchaValue(value);
  }

  const handleClickp = () => {
    setVisibilityp((prevValue) => !prevValue);
  };
  const handleClickcp = () => {
    setVisibilitycp((prevValue) => !prevValue);
  };

  return (
    <div>
      <ToastContainer />
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
            <Form noValidate validated={validated} onSubmit={handleSignup}>
              <h3
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                Sign Up
              </h3>

              <div>
                <Container fluid>
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
                          name="firstname"
                          value={inputField.firstname}
                          required
                          onChange={inputHandler}
                        />
                        <Form.Control.Feedback type="invalid">
                          First Name is required!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          type="text"
                          placeholder="Enter Last Name"
                          name="lastname"
                          value={inputField.lastname}
                          onChange={inputHandler}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Form.Label>Email</Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        value={inputField.email}
                        required
                        onInput={(e) =>
                          (e.target.value = ("" + e.target.value).toLowerCase())
                        }
                        onChange={inputHandler}
                      />
                      <Form.Control.Feedback type="invalid">
                        Email is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label>Mobile Number</Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Control
                        type="tel"
                        placeholder="Enter Mobile Number"
                        name="mobile"
                        maxLength="10"
                        value={inputField.mobile}
                        required
                        onChange={inputHandler}
                      />
                      <spam
                        style={{
                          paddingTop: "10px",
                          fontSize: "0.7rem",
                          color: "blue",
                        }}
                      >
                        Please provide valid mobile number required to reset
                        password
                      </spam>
                    </Form.Group>

                    <Form.Control.Feedback type="invalid">
                      Mobile is required!
                    </Form.Control.Feedback>
                  </Row>
                  <Row>
                    <Form.Label>Password</Form.Label>
                  </Row>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                      style={{ position: "relative" }}
                    >
                      <Form.Control
                        type={visibilityp ? "text" : "password"}
                        placeholder="Enter Password"
                        name="password"
                        required
                        value={inputField.password}
                        onChange={inputHandler}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password is required!
                      </Form.Control.Feedback>
                      <div>
                        <Button
                          style={{
                            position: "absolute",
                            right: "14px",
                            bottom: "1px",
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                          onClick={handleClickp}
                        >
                          {visibilityp ? <VscEyeClosed /> : <VscEye />}
                        </Button>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label>Confirm Password</Form.Label>
                  </Row>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                      style={{ position: "relative" }}
                    >
                      <Form.Control
                        type={visibilitycp ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="cpassword"
                        value={inputField.cpassword}
                        required
                        onChange={inputHandler}
                      />
                      <Form.Control.Feedback type="invalid">
                        Confirm Password is required!
                      </Form.Control.Feedback>
                      <div>
                        <Button
                          style={{
                            position: "absolute",
                            right: "14px",
                            bottom: "1px",
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                          onClick={handleClickcp}
                        >
                          {visibilitycp ? <VscEyeClosed /> : <VscEye />}
                        </Button>
                      </div>
                    </Form.Group>
                  </Row>
                </Container>
              </div>
              <div className="my-2" style={{ marginLeft: "3%" }}>
                <ReCAPTCHA
                  sitekey="6Ld8Q9QgAAAAAFQ4f1dnE8tDPpt-Eh1WbXKPjGWj"
                  onChange={onChange}
                />
              </div>

              <div className="d-grid d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={captchaValue === null}
                >
                 {isLoading && <Spinner animation="border" variant="light"  size="sm"/>} Register
                </Button>
              </div>
              <p style={{ textAlign: "right" }}>
                Already registered? <a href="/login">Login</a>
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
