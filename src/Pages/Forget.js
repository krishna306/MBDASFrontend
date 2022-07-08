import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Forget() {
  const [user, setUser] = useState({
    EmailMobile: "",
    OTP: "",
    NewPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [result, setResult] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user.EmailMobile);
      const response = await setUpRecaptha(user.EmailMobile);
      setResult(response);
      toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch (err) {
      toast.error("Invalid mobile number");
      console.log(err);
    }
  };

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const verifyotp = async () => {
    try {
      await result.confirm(user.OTP);
      setVerifyStatus(1);
    } catch (err) {
      setVerifyStatus(-1);
      setTimeout(()=>{
        setVerifyStatus(0);
      },1000);
      console.log(err.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
     // Axios.post("http://localhost:8000/users/forgotpassword", {
       Axios.post("https://mbdas.herokuapp.com/users/forgotpassword", {
        mobile: user.EmailMobile.slice(3),
        password: user.NewPassword,
      })
        .then(function (response) {
          if (response.data.code === 200) {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
            toast.success(response.data.message);
          }
        })
        .catch(function (error) {
          if (error.response.data.code === 400) {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
            toast.error(error.response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
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
            <Form onSubmit={handleForgotPassword}>
              <h3
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                Forget Password
              </h3>
              <Row>
                <Form.Label>
                  Mobile
                  <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                </Form.Label>
              </Row>
              <Row>
                <Col md={9}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="+91XXXXXXXXXX"
                      name="EmailMobile"
                      value={user.EmailMobile}
                      required
                      onChange={handleInputs}
                      maxLength={13}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={otpSent}
                    onClick={handleSubmit}
                  >
                    Send OTP
                  </Button>
                  <div id="recaptcha-container"></div>
                </Col>
              </Row>
              {otpSent && (
                <>
                  <Row>
                    <Form.Label>
                      Enter OTP
                      <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Col md={9}>
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          type="text"
                          placeholder="Enter OTP"
                          name="OTP"
                          value={user.OTP}
                          required
                          onChange={handleInputs}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="primary"
                        onClick={verifyotp}
                        disabled={verifyStatus === 1}
                        style={{
                          backgroundColor:
                            verifyStatus !== 0 &&
                            (verifyStatus === 1 ? "green" : "red"),
                        }}
                      >
                        {verifyStatus !== 0
                          ? verifyStatus === 1
                            ? "Verified"
                            : "Not Verified"
                          : "Verify"}
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
              {verifyStatus === 1 && (
                <>
                  <Row>
                    <Form.Label>
                      New Password
                      <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Enter New Password"
                        name="NewPassword"
                        value={user.NewPassword}
                        required
                        onChange={handleInputs}
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Label>
                      Confirm Password
                      <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        required
                        onChange={handleInputs}
                      />
                    </Form.Group>
                  </Row>
                  <div className="d-grid d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </>
              )}

              <p style={{ textAlign: "right" }}>
                Back To Login? <a href="/login">Login</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Forget;
