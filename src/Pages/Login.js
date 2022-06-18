import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi"
function Login() {
  function createCaptcha() {
    let letters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let a = letters[Math.floor(Math.random() * letters.length)];
    let b = letters[Math.floor(Math.random() * letters.length)];
    let c = letters[Math.floor(Math.random() * letters.length)];
    let d = letters[Math.floor(Math.random() * letters.length)];
    let code = a + b + c + d;
    return code;
  }

  //navigate function
  let navigate = useNavigate();
  const [loginUser,{isLoading,data}] = useLoginUserMutation();
  const captcha = createCaptcha();
  const [inputField, setInputFiled] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    setInputFiled({ ...inputField, [e.target.name]: e.target.value });
  };
  console.log(inputField);
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  const handleLogin= async (e)=>{
    e.preventDefault();
    try{
     const res = await loginUser(inputField);
     console.log(res);
      navigate("/form");
    }
    catch (e){
      console.log(e);
    }
 }
  if (loginWithOtp) {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="OTP" name="email" />
      </Form.Group>
    );
  }
  return (
    <div>
      <Container fluid className="my-4">
        <Row>
          <Col
            md={4}
            style={{
              marginLeft: "50px",
              borderRadius: "5px",
              border: "2px solid black",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Form className="login-form" onSubmit={handleLogin}>
              <h3 className="pb-2">Log in</h3>
              <Row className="mb-2">
                <Col>
                  <Form.Check
                    label="Govt Official"
                    type="radio"
                    id="inline-radio-1"
                    name="group1"
                  ></Form.Check>
                </Col>
                <Col>
                  <Form.Check
                    label="Citizen"
                    type="radio"
                    id="inline-radio-2"
                    name="group1"
                  ></Form.Check>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email/Mobile(Log In With OTP)"
                  name="email"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mb-2">
                Log In With OTP
              </Button>
              <div
                style={{
                  width: "100%",
                  height: "18px",
                  borderBottom: "2px solid black",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#fff",
                    paddingTop: "10x",
                  }}
                >
                  OR
                </span>
              </div>

              <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Email/Mobile"
                  name="email"
                  value={inputField.email}
                  onChange={inputHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={inputField.password}
                  onChange={inputHandler}
                />
              </Form.Group>

              <Row>
                <Col
                  md={2}
                  style={{
                    backgroundColor: "grey",
                    border: "1px solid black",
                    borderRadius: "5px",
                    width: "80px",
                    height: "35px",
                    marginLeft: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ fontSize: "25px" }}>{captcha}</span>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="Enter Captcha"
                      name="Captcha"
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Button>Verify</Button>
                </Col>
              </Row>

              <Button variant="primary" type="submit" style={{ width: "100%" }} >
                Log In With Password
              </Button>
              <p style={{ fontSize: "15px" }}>
                <Link to="/forget"> Forgot Password?</Link>
              </p>
              <p style={{ fontSize: "15px" }}>
                New User? <Link to="/register">Register here</Link>
              </p>
            </Form>
          </Col>
          <Col md={7} className="text-center justify-content-center">
            <p>
              loremUllamco cillum qui sit nostrud magna voluptate reprehenderit.
              Consequat voluptate est duis do elit sunt adipisicing. Duis in
              labore id reprehenderit aliquip qui deserunt et voluptate. Minim
              ut laboris duis duis voluptate aliquip nulla esse pariatur aliquip
              culpa quis.
            </p>
            <p>
              loremUllamco cillum qui sit nostrud magna voluptate reprehenderit.
              Consequat voluptate est duis do elit sunt adipisicing. Duis in
              labore id reprehenderit aliquip qui deserunt et voluptate. Minim
              ut laboris duis duis voluptate aliquip nulla esse pariatur aliquip
              culpa quis.
            </p>
            <p>
              loremUllamco cillum qui sit nostrud magna voluptate reprehenderit.
              Consequat voluptate est duis do elit sunt adipisicing. Duis in
              labore id reprehenderit aliquip qui deserunt et voluptate. Minim
              ut laboris duis duis voluptate aliquip nulla esse pariatur aliquip
              culpa quis.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
