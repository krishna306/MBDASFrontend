import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {
  useLoginUserMutation,
  useLoginOtpUserMutation,
} from "../services/appApi";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
function Login() {
  const [visibility, setVisibility] = useState(false);
  const [obj, setObj] = useState({ OTP: "", emailMobile: "+91" });
  const [result, setResult] = useState("");
  const { user } = useSelector((state) => state.user);
  //navigate function
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [loginOtpUser] = useLoginOtpUserMutation();
  const [inputField, setInputFiled] = useState({
    email: "",
    password: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [verifyStatus, setVerifyStatus] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const inputHandler = (e) => {
    setInputFiled({ ...inputField, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(inputField.email !=="" || inputField.password !==""){
      try {
        const res = await loginUser(inputField);
        if (res.error && res.error.status === 400) {
          toast.error(res.error.data);
        } else {
          toast.success("Logged In");
          setTimeout(() => {
            if (res.data.user.role === "admin") {
              navigate("/adminDashboard");
            } else {
              navigate("/form");
            }
          }, 2000);
          
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      toast.error("Please provide valid details")
    }
  };

  const verifyotp = async () => {
    try {
      await result.confirm(obj.OTP);
      setVerifyStatus(1);
      try {
        const res = await loginOtpUser({ mobile: obj.emailMobile.slice(3) });
        if(res.error){
          setTimeout(()=> {
            window.location.reload();
          },1000)
          toast.error(res.error.data);
        }
        else {
          toast.success("Logged In...");
          setTimeout(()=> {
            if(res.data.user.role ==="admin"){
              navigate("/adminDashboard");
            }
            else {
              navigate("/form");
            }
            
          },1000)
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      setVerifyStatus(-1);
      setTimeout(() => {
        setVerifyStatus(0);
      }, 1000);
      console.log(err.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await setUpRecaptha(obj.emailMobile);
      setResult(response);
      toast.success("OTP sent Successfully");
      setOtpSent(true);
    } catch (err) {
      toast.error("Invalid Mobile number");
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
  //google recaptcha
  function onChange(value) {
    setCaptchaValue(value);
  }

  //view-password
  const handleClick = () => {
    setVisibility((prevValue) => !prevValue);
  }
  return (
    <div>
      
      <ToastContainer />
      <Container className="">
        <Row>
          <Col md={3}></Col>
          <Col
            md={6}
            style={{
              border: "2px solid black",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              backgroundColor: "#F9F9F9",
              borderRadius: "10px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Form className="login-form" onSubmit={handleLogin}>
              <h3 className="pb-2">Log in</h3>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Mobile(Log In With OTP)"
                  name="email"
                  maxLength={13}
                  value={obj.emailMobile}
                  onChange={(e) =>
                    setObj((state) => ({
                      ...state,
                      emailMobile: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                disabled={otpSent}
                className="mb-2"
                onClick={handleSubmit}
              >
                Log In With OTP
              </Button>

              <div id="recaptcha-container"></div>
              {otpSent && (
                <>
                  <Row>
                    <Form.Label>
                      Enter OTP
                      <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                    </Form.Label>
                  </Row>
                  <Row>
                    <Row >
                      <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control
                          type="text"
                          placeholder="Enter OTP"
                          name="OTP"
                          value={obj.OTP}
                          required
                          onChange={(e) =>
                            setObj((state) => ({
                              ...state,
                              OTP: e.target.value,
                            }))
                          }
                        />
                      </Form.Group>
                    </Row>
                    <Row >
                      <Button
                        variant="primary"
                        onClick={verifyotp}
                        disabled={verifyStatus === 1}
                        style={{
                          width:"150px",
                          marginLeft:"3%",
                          backgroundColor:
                            verifyStatus !== 0 &&
                            (verifyStatus === 1 ? "green" : "red"),
                        }}
                      >
                        {verifyStatus !== 0
                          ? verifyStatus === 1
                            ? "Verified"
                            : "Not Verified"
                          : "Verify and login"}
                      </Button>
                    </Row>
                  </Row>
                </>
              )}


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

              <Form.Group className="mb-3 mt-4">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={inputField.email}
                  onChange={inputHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3" style={{position: "relative"}}>
                <Form.Control
                  type={visibility ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={inputField.password}
                  onChange={inputHandler}
                />
                <div>
                  <Button style={{
                      position: "absolute", 
                      right: "10px", 
                      bottom: "1px", 
                      backgroundColor: "white", 
                      color: "black", 
                      border: "none"
                  }} onClick={handleClick}>{visibility ? <VscEyeClosed /> : <VscEye />}</Button>
                </div>
              </Form.Group>

              <div className="my-2">
                <ReCAPTCHA
                  sitekey="6Ld8Q9QgAAAAAFQ4f1dnE8tDPpt-Eh1WbXKPjGWj"
                  onChange={onChange}
                />
              </div>

              <Button
                variant="primary"
                type="submit"
                disabled={captchaValue === null}
                style={{ width: "100%" }}
              >
               {isLoading && <Spinner variant="light" animation="border" size="sm"/>}  Log In With Password
              </Button>
              <p style={{ fontSize: "15px" }}>
                <Link to="/forget"> Forgot Password?</Link>
              </p>
              <p style={{ fontSize: "15px" }}>
                New User? <Link to="/register">Register here</Link>
              </p>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
