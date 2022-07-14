import React, { useState, useEffect } from "react";
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
  const [inputErrors, setinputErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
      console.log(inputField);
    }
  }, [inputField, inputErrors, isSubmit]);

  // Error for form new user fields

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
    setIsSubmit(true);
    if (user && user.role === "admin") {
      inputField.role = "admin";
    }
    setinputErrors(validateInput(inputField));
    const obj = validateInput(inputField);

    if (Object.keys(obj).length === 0) {
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
    } else if (obj.notMatch) {
      alert(obj.notMatch);
    } else {
      alert("Something is wrong in form details, please look!");
    }
  };

  const validateInput = (values) => {
    const error = {};
    const regexMobile = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (
      !values.firstname ||
      values.firstname === "" ||
      values.firstname.length === 0
    ) {
      error.firstname = "First name is required!";
    }

    if (
      !values.lastname ||
      values.lastname === "" ||
      values.lastname.length === 0
    ) {
      error.lastname = "Last name is required!";
    }

    if (values.mobile || values.mobile !== "" || values.mobile.length !== 0) {
      if (!regexMobile.test(values.mobile)) {
        error.mobile = "Invalid mobile number format!";
      }
    } else {
      error.mobile = "Mobile number is required!";
    }

    if (values.email || values.email !== "" || values.email.length !== 0) {
      if (!regexEmail.test(values.email)) {
        error.email = "Invalid email format!";
      }
    } else {
      error.email = "Email is required!";
    }

    if (
      values.password ||
      values.password !== "" ||
      values.password.length !== 0
    ) {
      if (values.password.length < 8) {
        error.password = "Password length should be greater than 8!";
      } else if (!strongRegex.test(values.password)) {
        error.password =
          "Password must contain atleast 1 uppercase 1 numeric and 1 special character from [!@#$%^&*]";
      }
    } else {
      error.password = "Password field is required!";
    }

    if (
      values.cpassword ||
      values.cpassword !== "" ||
      values.cpassword.length !== 0
    ) {
      if (values.cpassword.length < 8) {
        error.cpassword = "Password length should be greater than 8!";
      } else if (!strongRegex.test(values.cpassword)) {
        error.cpassword =
          "Password must contain atleast 1 uppercase 1 numeric and 1 special character from [!@#$%^&*]";
      }
    } else {
      error.cpassword = "Confirm password field is required!";
    }

    if (!error.password && !error.cpassword) {
      if (values.password !== values.cpassword) {
        error.notMatch = "Password and confirm password field should match!";
      }
    }

    return error;
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
            <Form onSubmit={handleSignup}>
              <h3
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                {user && user.role === "admin" ? "Add New Admin" : "Sign Up"}
              </h3>

              <div>
                <Container fluid>
                  <Row>
                    <Col>
                      <Form.Label>
                        First Name
                        <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                      </Form.Label>
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
                          onChange={inputHandler}
                        />
                        <span style={{ color: "red", fontSize: "0.8rem" }}>
                          {inputErrors.firstname}
                        </span>
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
                        <span style={{ color: "red", fontSize: "0.8rem" }}>
                          {inputErrors.lastname}
                        </span>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Form.Label>
                      Email<span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        value={inputField.email}
                        onInput={(e) =>
                          (e.target.value = ("" + e.target.value).toLowerCase())
                        }
                        onChange={inputHandler}
                      />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {inputErrors.email}
                      </span>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label>
                      Mobile Number
                      <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Control
                        type="tel"
                        placeholder="Enter Mobile Number"
                        name="mobile"
                        maxLength="10"
                        value={inputField.mobile}
                        onChange={inputHandler}
                      />
                      <h6
                        style={{
                          paddingTop: "10px",
                          fontSize: "0.8rem",
                          color: "blue",
                        }}
                      >
                        Please provide valid mobile number required to reset
                        password
                      </h6>
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {inputErrors.mobile}
                      </span>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label>
                      Password<span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                    </Form.Label>
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
                        value={inputField.password}
                        onChange={inputHandler}
                      />

                      <div>
                        <Button
                          style={{
                            position: "absolute",
                            right: "14px",
                            bottom: inputErrors.password ? "25px" : "1px",
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                          onClick={handleClickp}
                        >
                          {visibilityp ? <VscEyeClosed /> : <VscEye />}
                        </Button>
                      </div>
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {inputErrors.password}
                      </span>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label>
                      Confirm Password
                      <span style={{ color: "rgb(255, 8, 8)" }}>*</span>
                    </Form.Label>
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
                        onChange={inputHandler}
                      />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>
                        {inputErrors.cpassword}
                      </span>
                      <div>
                        <Button
                          style={{
                            position: "absolute",
                            right: "14px",
                            bottom: inputErrors.cpassword ? "25px" : "1px",
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
                  {isLoading && (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}{" "}
                  Register
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
