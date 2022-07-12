import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import ReCAPTCHA from "react-google-recaptcha";
import "./Form.css";
import { useSelector } from "react-redux";
import {
  useCreateApplicantMutation,
  useCreateDeceasedMutation,
} from "../services/appApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function DeceasedForm() {
  const [captchaValue, setCaptchaValue] = useState(null);
  // user from browser Storage
  const { user } = useSelector((state) => state.user);

  // Creating new applicant and deceased
  const [createApplicant, { isLoading }] = useCreateApplicantMutation();
  const [createDeceased] = useCreateDeceasedMutation();

  // applicant details
  const [isSubmit, setIsSubmit] = useState(false);
  //Files Uploading
  const [fileSelected, setFileSelected] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [field, setField] = useState("");

  //form submitting
  const [submittingFromData, setSubmittingFromData] = useState(false);

  // Printing form after filling up data
  const ComponentRef = useRef();
  const navigate = useNavigate();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
  });

  // form errors
  const [deceasedFormErrors, setDeceasedFormErrors] = useState({});
  const [applicantFormErrors, setApplicantFormErrors] = useState({});

  // Applicant's Details
  const [applicantField, setApplicantField] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    state: "",
    district: "",
    gender: "",
    pan: "",
    aadhar: "",
    subdivision: "",
    circleoffice: "",
    sig: "",
  });

  // Deceased Details
  const [deceasedField, setDeceasedField] = useState({
    date: "",
    aadhar: "",
    deadname: "",
    gender: "",
    father: "",
    mother: "",
    spouse: "",
    age: "",
    placeOfDeath: "",
    placedetails: "",
    informantName: "",
    informantRelation: "",
    deceasedstate: "",
    district: "",
    torvName: "",
    townOrVillage: "",
    addressAtDead: "",
    addressPermanent: "",
    religion: "",
    occupation: "",
    typeOfMedicalAttention: "",
    medicallyCertified: "",
    disease: "",
    smoker: "",
    tobacco: "",
    panmasala: "",
    drinker: "",
    pregnancydeath: "",
    signature: "",
    signatureDate: "",
  });

  // Files
  const [Files, setFiles] = useState({
    signature: "",
    deathCertificate: "",
    goanburahCertificate: "",
    otherDocuments: "",
  });

  useEffect(() => {
    if (Object.keys(applicantFormErrors).length === 0 && isSubmit) {
      console.log(applicantField);
    }
  }, [applicantField, applicantFormErrors, isSubmit]); // caution

  //User Login Verification
  if (!user) {
    return (
      <div className="text-center m-4">
        <h3>Please Login first...</h3>
      </div>
    );
  }

  //Upload files to cloudinary

  async function uploadFile(e) {
    e.preventDefault();
    if (!fileSelected) {
      return;
    }
    const data = new FormData();
    data.append("file", fileSelected);
    data.append("upload_preset", "fzvmeqjw");
    setUploadingFile(true);
    fetch("https://api.cloudinary.com/v1_1/dxu9wmzkp/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        Files[field] = res.url;
        setUploadingFile(false);
      })
      .catch((error) => {
        setUploadingFile(false);
        console.log(error);
      });
  }

  function handleFileValidation(e) {
    const file = e.target.files[0];
    // const regexFileExtension = /^.*\.(pdf|PDF)$/;

    if (file) {
      if (file.size > 2097152) {
        setFileSelected(null);
        return alert("Upload a file less than 2MB!");
      } else {
        setFileSelected(file);
      }
      setField(e.target.name);
    }
  }

  const handleApplicantInput = (e) => {
    setApplicantField({ ...applicantField, [e.target.name]: e.target.value });
  };

  const handleDeceasedInput = (e) => {
    setDeceasedField({ ...deceasedField, [e.target.name]: e.target.value });
  };

  // Form Data Submission
  const submitFormData = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      applicantField.firstname = user.firstname;
      applicantField.lastname = user.lastname;
      applicantField.email = user.email;
      applicantField.mobile = user.mobile;
      setApplicantFormErrors(validateApplicant(applicantField));
      const res = await createApplicant(applicantField);

      if (res.error) {
        alert(res.error);
      }
    } catch (error) {
      return alert(error.message);
    }
    try {
      setDeceasedFormErrors(validateDeceased(deceasedField));
      const obj = validateDeceased(deceasedField);
      deceasedField.signature = Files.signature;
      deceasedField.otherDocuments = Files.otherDocuments;
      deceasedField.goanburahCertificate = Files.goanburahCertificate;
      deceasedField.deathCertificate = Files.goanburahCertificate;
      if (Object.keys(obj).length === 0) {
        setSubmittingFromData(true);
        const res = await createDeceased(deceasedField);
        setSubmittingFromData(false);
        console.log(res);
        if (res.error && res.error.data.code === 11000) {
          if (res.error.data.keyPattern.aadhar === 1) {
            toast.error("Record of Deceased already there");
          }
        } else if (res.error) {
          alert(res.error);
        } else {
          toast.success("Form Submitted Successfully.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        alert("Something is wrong in form details, please look up!");
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  const validateApplicant = (values) => {
    const error = {};
    const regexPan = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    const regexAadhar =
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

    if (
      !values.gender ||
      values.gender === "null" ||
      values.gender === "" ||
      values.gender.length === 0
    ) {
      error.gender = "Gender is required";
    }

    if (
      values.pan ||
      values.pan !== "null" ||
      values.pan !== "" ||
      values.pan.length !== 0
    ) {
      if (!regexPan.test(values.pan)) {
        error.pan = "This is not a valid pan number format!";
      }
    }

    if (
      values.aadhar ||
      values.aadhar !== "null" ||
      values.aadhar !== "" ||
      values.aadhar.length !== 0
    ) {
      if (!regexAadhar.test(values.aadhar)) {
        error.aadhar = "This is not a valid aadhar format!";
      }
    }

    if (
      !values.state ||
      values.state === "null" ||
      values.state === "" ||
      values.state.length === 0
    ) {
      error.state = "State is required!";
    }

    if (
      !values.district ||
      values.district === "null" ||
      values.district === "" ||
      values.district.length === 0
    ) {
      error.district = "District is required!";
    }

    if (
      !values.subdivision ||
      values.subdivision === "" ||
      values.subdivision === "null" ||
      values.subdivision.length === 0
    ) {
      error.subdivision = "Please fill out the above field!";
    }
    if (
      !values.circleoffice ||
      values.circleoffice === "" ||
      values.circleoffice === "null" ||
      values.circleoffice.length === 0
    ) {
      error.circleoffice = "Please fill out the above field!";
    }

    return error;
  };

  const validateDeceased = (values) => {
    const error = {};
    const regexAadhar =
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
    const regexName = /^[a-zA-Z ]{2,30}$/;

    if (
      !values.aadhar ||
      values.aadhar === "" ||
      values.aadhar === "null" ||
      values.aadhar.length === 0
    ) {
      error.aadhar = "Aadhar is required!";
    } else if (!regexAadhar.test(values.aadhar)) {
      error.aadhar = "This is not a valid aadhar format!";
    }

    if (
      !values.deadname ||
      values.deadname === "" ||
      values.deadname === "null" ||
      values.deadname.length === 0
    ) {
      error.deadname = "Name of deceased is required!";
    } else if (!regexName.test(values.deadname)) {
      error.deadname = "Invalid name!";
    }

    if (
      !values.gender ||
      values.gender === "null" ||
      values.gender === "" ||
      values.gender.length === 0
    ) {
      error.gender = "Gender is required!";
    }

    if (values.father || values.father !== "" || values.father.length !== 0) {
      if (!regexName.test(values.father)) {
        error.father = "Invalid name";
      }
    }

    if (values.mother || values.mother !== "" || values.mother.length !== 0) {
      if (!regexName.test(values.mother)) {
        error.mother = "Invalid name!";
      }
    }

    if (values.spouse || values.spouse !== "" || values.spouse.length !== 0) {
      if (!regexName.test(values.spouse)) {
        error.spouse = "Invalid name!";
      }
    }

    if (
      values.age ||
      values.age !== "null" ||
      values.age !== "" ||
      values.age.length !== 0
    ) {
      if (values.age < 0 || values.age > 100) {
        error.age = "Invalid age!";
      }
    } else {
      error.age = "Please enter the age of deceased at the time of death!";
    }

    if (
      !values.placeOfDeath ||
      values.placeOfDeath === "null" ||
      values.placeOfDeath === "" ||
      values.placeOfDeath.length === 0
    ) {
      error.placeOfDeath = "Please choose a place of death!";
    }

    if (
      values.informantName ||
      values.informantName !== "" ||
      values.informantName.length !== 0
    ) {
      if (!regexName.test(values.informantName)) {
        error.informantName = "Invalid name!";
      }
    }

    if (
      !values.townOrVillage ||
      values.townOrVillage === "null" ||
      values.townOrVillage === "" ||
      values.townOrVillage.length === 0
    ) {
      error.townOrVillage = "Please choose an option!";
    }

    if (
      !values.deceasedstate ||
      values.deceasedstate === "null" ||
      values.deceasedstate === "" ||
      values.deceasedstate.length === 0
    ) {
      error.deceasedstate = "State is required!";
    }

    if (
      !values.district ||
      values.district === "null" ||
      values.district === "" ||
      values.district.length === 0
    ) {
      error.district = "District is required!";
    }

    if (
      !values.religion ||
      values.religion === "null" ||
      values.religion === "" ||
      values.religion.length === 0
    ) {
      error.religion = "Please choose a religion!";
    }

    if (
      !values.occupation ||
      values.occupation === "" ||
      values.occupation === "null" ||
      values.occupation.length === 0
    ) {
      error.occupation = "Occupation of deceased is required!";
    } else if (!regexName.test(values.occupation)) {
      error.occupation = "Invalid Occupation!";
    }

    if (
      !values.typeOfMedicalAttention ||
      values.typeOfMedicalAttention === "null" ||
      values.typeOfMedicalAttention === "" ||
      values.typeOfMedicalAttention.length === 0
    ) {
      error.typeOfMedicalAttention = "Required!";
    }

    if (
      values.medicallyCertified !== "true" &&
      values.medicallyCertified !== "false"
    ) {
      error.medicallyCertified =
        "Please choose whether death is medically certified or not!";
    }

    if (
      values.smoker ||
      values.smoker !== "null" ||
      values.smoker !== "" ||
      values.smoker.length !== 0
    ) {
      if (values.smoker < 0) {
        error.smoker =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.smoker > deceasedField.age) {
        error.smoker =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    if (
      values.tobacco ||
      values.tobacco !== "null" ||
      values.tobacco !== "" ||
      values.tobacco.length !== 0
    ) {
      if (values.tobacco < 0) {
        error.tobacco =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.tobacco > deceasedField.age) {
        error.tobacco =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    if (
      values.panmasala ||
      values.panmasala !== "null" ||
      values.panmasala !== "" ||
      values.panmasala.length !== 0
    ) {
      if (values.panmasala < 0) {
        error.panmasala =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.panmasala > deceasedField.age) {
        error.panmasala =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    if (
      values.drinker ||
      values.drinker !== "null" ||
      values.drinker !== "" ||
      values.drinker.length !== 0
    ) {
      if (values.drinker < 0) {
        error.drinker =
          "Please enter a valid number greater than or equal to 0!";
      } else if (values.drinker > deceasedField.age) {
        error.drinker =
          "Please enter a valid number less than or equal to the age of the deceased!";
      }
    }

    return error;
  };
  function onChange(value) {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  }
  // console.log(applicantField);
  // console.log(deceasedField);
  return (
    <>
      {/* <FormNav /> */}
      <ToastContainer />
      <div className="Formcontainer" style={{ marginBottom: "70px" }}>
        <div className="note" id="print">
          <h6>
            Note: Fields marked with asterisks (
            <b style={{ color: "rgb(255, 8, 8)" }}> * </b>) are mandatory
          </h6>
          <span
            className="material-icons"
            aria-hidden="true"
            style={{
              cursor: "pointer",
              float: "right",
              marginTop: "20px",
              marginRight: "10px",
              marginBottom: "0",
              marginLeft: "0",
              color: "yellowgreen",
            }}
            onClick={handlePrint}
          >
            &#xe8ad;
          </span>
        </div>

        <Form onSubmit={submitFormData} ref={ComponentRef}>
          <div className="formheading">
            <h4>Death Certificate Application Form</h4>
          </div>
          {/* form part 1 starts */}
          <div className="descrip">
            <b>
              <u>Applicant's Details</u>
            </b>
          </div>
          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Applicant's Name
                    <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={user.firstname}
                    required
                    disabled
                  />
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={user.lastname}
                    required
                    disabled
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Applicant Gender
                    <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="gender"
                    onChange={handleApplicantInput}
                    required
                  >
                    <option value="null">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.gender}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Mobile Number
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="tel"
                    maxLength="10"
                    name="mobile"
                    value={user.mobile}
                    disabled
                    required
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>PAN number</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(PAN Number)"
                    maxLength="10"
                    name="pan"
                    onChange={handleApplicantInput}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.pan}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Aadhar card Number</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Aadhar card Number)"
                    maxLength="14"
                    name="aadhar"
                    onChange={handleApplicantInput}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.aadhar}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Email Id</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control type="email" value={user.email} disabled />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
          </div>

          <div className="descrip">
            <b>
              <u>Address Details of Applicant</u>
            </b>
          </div>

          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    State<sup style={{ color: "rgb(255, 8, 8)" }}>* </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="state"
                    onChange={handleApplicantInput}
                    required
                  >
                    <option value="null">SELECT STATE</option>
                    <option value="assam">ASSAM</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.state}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    District<sup style={{ color: "rgb(255, 8, 8)" }}>* </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="district"
                    onChange={handleApplicantInput}
                    required
                  >
                    <option value="null">Choose District</option>

                    {applicantField.state === "assam" && (
                      <>
                        <option value="baksa">Baksa</option>
                        <option value="barpeta">Barpeta</option>
                        <option value="biswanath">Biswanath</option>
                        <option value="bongaigaon">Bongaigaon</option>
                        <option value="cachar">Cachar</option>
                        <option value="charaideo">Charaideo</option>
                        <option value="chirang">Chirang</option>
                        <option value="daranng">Daranng</option>
                        <option value="dhemaji">Dhemaji</option>
                        <option value="dhubri">Dhubri</option>
                        <option value="dibrugarh">Dibrugarh</option>
                        <option value="dima hasao">Dima Hasao</option>
                        <option value="goalpara">Goalpara</option>
                        <option value="hailankandi">Hailankandi</option>
                        <option value="hojai">Hojai</option>
                        <option value="jorhat">Jorhat</option>
                        <option value="kamrup metropolitan">
                          Kamrup Metropolitan
                        </option>
                        <option value="kamrup rural">Kamrup Rural</option>
                        <option value="karbi anglong">Karbi Anglong</option>
                        <option value="karimganj">Karimganj</option>
                        <option value="kokrajhar">Kokrajhar</option>
                        <option value="lakhimpur">Lakhimpur</option>
                        <option value="majuli">Majuli</option>
                        <option value="morigaon">Morigaon</option>
                        <option value="nagaon">Nagaon</option>
                        <option value="nalbari">Nalbari</option>
                        <option value="sivasagar">Sivasagar</option>
                        <option value="sonitpur">Sonitpur</option>
                        <option value="south salmara mankachar">
                          South Salmara Mankachar
                        </option>
                        <option value="tinsukia">Tinsukia</option>
                        <option value="udalguri">Udalguri</option>
                        <option value="west karbi anglong">
                          West Karbi Anglong
                        </option>
                      </>
                    )}
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.district}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Sub-Division
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Sub-division)"
                    name="subdivision"
                    onChange={handleApplicantInput}
                    required
                    value={applicantField.subdivision}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.subdivision}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Circle Office
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Circle Office)"
                    name="circleoffice"
                    onChange={handleApplicantInput}
                    required
                    value={applicantField.circleoffice}
                  />
                  <span style={{ color: "red" }}>
                    {applicantFormErrors.circleoffice}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
          </div>

          {/* form part 1 ends  */}

          {/* form part 2 starts */}
          <div className="descrip">
            <b>
              <u>Deceased Details</u>
            </b>
          </div>
          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Aadhar card Number of the deceased{" "}
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(Aadhar card Number)"
                    maxLength="14"
                    name="aadhar"
                    onChange={handleDeceasedInput}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.aadhar}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Date of Death:
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="date"
                    name="date"
                    format="dd/mm/yyyy"
                    max={new Date().toJSON().slice(0, 10)}
                    onChange={handleDeceasedInput}
                    required
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Name of Deceased:
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="deadname"
                    onChange={handleDeceasedInput}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.deadname}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Gender of Deceased
                    <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="gender"
                    onChange={handleDeceasedInput}
                    required
                  >
                    <option value="null">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.gender}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Name of Father</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="father"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.father}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Name of Mother</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="mother"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.mother}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Name of Husband/wife</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="spouse"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.spouse}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Age of Deceased [on January 1 of the current calender]
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    name="age"
                    // min={0}
                    // max={200}
                    onChange={handleDeceasedInput}
                    required
                  />
                  <span style={{ color: "red" }}>{deceasedFormErrors.age}</span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Place of Death
                    <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="placeOfDeath"
                    onChange={handleDeceasedInput}
                    required
                  >
                    <option value="null">Select</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Institution">Institution</option>
                    <option value="Home">House</option>
                    <option value="other">Other Place</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.placeOfDeath}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Place Details (Name or Address)
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="placedetails"
                    onChange={handleDeceasedInput}
                    required
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Informants Name</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="informantName"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.informantName}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Informant's Relation with Deceased</Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="informantRelation"
                    onChange={handleDeceasedInput}
                  >
                    <option value="null">Select</option>
                    <option value="relative">Relative</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Town/Village Name:
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="torvName"
                    onChange={handleDeceasedInput}
                    required
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Is it Town/Village
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="townOrVillage"
                    onChange={handleDeceasedInput}
                    required
                  >
                    <option value="null">Select</option>
                    <option value="Town">Town</option>
                    <option value="Village">Village</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.townOrVillage}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased State
                    <sup style={{ color: "rgb(255, 8, 8)" }}>* </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="deceasedstate"
                    onChange={handleDeceasedInput}
                    required
                  >
                    <option value="null">SELECT STATE</option>
                    <option value="assam"> ASSAM</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.deceasedstate}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased District
                    <sup style={{ color: "rgb(255, 8, 8)" }}>* </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select name="district" onChange={handleDeceasedInput}>
                    <option value="null">Choose District</option>
                    {deceasedField.deceasedstate === "assam" && (
                      <>
                        <option value="baksa">Baksa</option>
                        <option value="barpeta">Barpeta</option>
                        <option value="biswanath">Biswanath</option>
                        <option value="bongaigaon">Bongaigaon</option>
                        <option value="cachar">Cachar</option>
                        <option value="charaideo">Charaideo</option>
                        <option value="chirang">Chirang</option>
                        <option value="daranng">Daranng</option>
                        <option value="dhemaji">Dhemaji</option>
                        <option value="dhubri">Dhubri</option>
                        <option value="dibrugarh">Dibrugarh</option>
                        <option value="dima hasao">Dima Hasao</option>
                        <option value="goalpara">Goalpara</option>
                        <option value="hailankandi">Hailankandi</option>
                        <option value="hojai">Hojai</option>
                        <option value="jorhat">Jorhat</option>
                        <option value="kamrup metropolitan">
                          Kamrup Metropolitan
                        </option>
                        <option value="kamrup rural">Kamrup Rural</option>
                        <option value="karbi anglong">Karbi Anglong</option>
                        <option value="karimganj">Karimganj</option>
                        <option value="kokrajhar">Kokrajhar</option>
                        <option value="lakhimpur">Lakhimpur</option>
                        <option value="majuli">Majuli</option>
                        <option value="morigaon">Morigaon</option>
                        <option value="nagaon">Nagaon</option>
                        <option value="nalbari">Nalbari</option>
                        <option value="sivasagar">Sivasagar</option>
                        <option value="sonitpur">Sonitpur</option>
                        <option value="south salmara mankachar">
                          South Salmara Mankachar
                        </option>
                        <option value="tinsukia">Tinsukia</option>
                        <option value="udalguri">Udalguri</option>
                        <option value="west karbi anglong">
                          West Karbi Anglong
                        </option>
                      </>
                    )}
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.district}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Address at the time of Death
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="(In English)"
                    name="addressAtDead"
                    onChange={handleDeceasedInput}
                    required
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Permanent Address:
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="(In English)"
                    name="addressPermanent"
                    onChange={handleDeceasedInput}
                    required
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Religion
                    <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="religion"
                    onChange={handleDeceasedInput}
                    required
                  >
                    <option value="null">Select</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.religion}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Deceased Occupation
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="text"
                    placeholder="(In English)"
                    name="occupation"
                    onChange={handleDeceasedInput}
                    required
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.occupation}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Type of Medical Attention received before death
                    <sup style={{ color: "rgb(255, 8, 8)" }}>*</sup>
                  </Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Select
                    name="typeOfMedicalAttention"
                    onChange={handleDeceasedInput}
                    required
                  >
                    <option value="null">Select</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Medical Other than Institution">
                      Medical Other than Institution
                    </option>
                    <option value="none">No Medical Attention</option>
                  </Form.Select>
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.typeOfMedicalAttention}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Death Cause Medically Certified
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Check
                    label="Yes"
                    type="radio"
                    value="true"
                    name="medicallyCertified"
                    onChange={handleDeceasedInput}
                    style={{ marginTop: "2px" }}
                  />
                  <Form.Check
                    label="No"
                    type="radio"
                    value="false"
                    name="medicallyCertified"
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.medicallyCertified}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    cause of Death
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Select
                    name="disease"
                    onChange={handleDeceasedInput}
                    required
                  >
                    <option value="null">Select</option>
                    <option value="COVID-19">COVID-19</option>
                    <option value="Cancer">Cancer</option>
                    <option value="Organ Failure">Organ Failure</option>
                    <option value="Dengu">Dengu</option>
                    <option value="Malaria">Malaria</option>
                    <option value="Natural Calamity">Natural Calamity</option>
                    <option value="Pregnancy">Pregnancy</option>
                    <option value="Accident">Accident</option>
                    <option value="Suicide">Suicide</option>
                    <option value="Narcotics">Narcotics</option>
                    <option value="Heart  Attack">Heart  Attack</option>
                    <option value="other">
                      others
                    </option>
                  </Form.Select>
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Smoker then for how many years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    name="smoker"
                    // min={0}
                    // max={deceasedField.age}
                    onChange={handleDeceasedInput}
                    type="number"
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.smoker}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Tobacco Chewer in any form for how many years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    name="tobacco"
                    // min={0}
                    // max={deceasedField.age}
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.tobacco}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Arecanut(including Panmasala) user for how many
                    years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    name="panmasala"
                    onChange={handleDeceasedInput}
                    type="number"
                    // min={0}
                    // max={deceasedField.age}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.panmasala}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Habitual Drinker for how many years
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    name="drinker"
                    // min={0}
                    // max={deceasedField.age}
                    onChange={handleDeceasedInput}
                  />
                  <span style={{ color: "red" }}>
                    {deceasedFormErrors.drinker}
                  </span>
                </Col>

                <Col xs={3}></Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    If Female death, did death occur while Pregnant at time of
                    delivery or 6 weeks after end of Pregnancy
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Check
                    label="Yes"
                    type="radio"
                    id="yes"
                    value="true"
                    name="pregnancydeath"
                    onChange={handleDeceasedInput}
                    style={{ marginTop: "2px" }}
                    disabled={deceasedField.gender === "male"}
                  />
                  <Form.Check
                    label="No"
                    default="false"
                    type="radio"
                    id="no"
                    value="false"
                    name="pregnancydeath"
                    onChange={handleDeceasedInput}
                    disabled={deceasedField.gender === "male"}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Signature of the Applicant
                    <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="signature"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "signature" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.signature !== "" && (
                    <a href={Files.signature}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </div>

          {/* form part 3 starts */}

          <div className="descrip">
            Upload supporting documents (Supported formats .jpeg/jpg/png) (max.
            2MB)
          </div>

          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Certificate of Death issued from Private Hospital/Nursing
                    home
                  </Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="deathCertificate"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "deathCertificate" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.deathCertificate !== "" && (
                    <a href={Files.deathCertificate}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>Goanburah Certificate</Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="goanburahCertificate"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "goanburahCertificate" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.goanburahCertificate !== "" && (
                    <a href={Files.goanburahCertificate}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  {" "}
                  <Form.Label>Other Documents</Form.Label>
                </Col>
                <Col xs={5}>
                  <Form.Control
                    type="file"
                    name="otherDocuments"
                    accept="image/*"
                    onChange={handleFileValidation}
                  />
                </Col>
                <Col xs={3}>
                  {uploadingFile && field === "otherDocuments" ? (
                    <Spinner
                      animation="border"
                      variant="primary mt-0 text-center"
                    />
                  ) : (
                    <Button variant="primary" onClick={uploadFile}>
                      Upload
                    </Button>
                  )}
                </Col>
                <Col xs={1}>
                  {Files.otherDocuments !== "" && (
                    <a href={Files.otherDocuments}>
                      <h5 className="mt-2">View...</h5>
                    </a>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </div>

          {/* <!-- form part 3 ends --> */}

          {/* <!-- form part 4 starts --> */}

          <hr />

          <div className="conatinerFluid">
            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Location <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  <Form.Control type="text" placeholder="Location" required />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Row>
                <Col xs={3}>
                  <Form.Label>
                    Date <sup style={{ color: "rgb(255, 8, 8)" }}> * </sup>
                  </Form.Label>
                </Col>
                <Col xs={6}>
                  {" "}
                  <Form.Control
                    type="date"
                    name="signatureDate"
                    format="dd/mm/yyyy"
                    max={new Date().toJSON().slice(0, 10)}
                    onChange={handleDeceasedInput}
                  />
                </Col>
                <Col xs={3}></Col>
              </Row>
            </Form.Group>
          </div>

          <hr />
          <div style={{ marginLeft: "3%" }} className="my-2">
            <ReCAPTCHA
              sitekey="6Ld8Q9QgAAAAAFQ4f1dnE8tDPpt-Eh1WbXKPjGWj"
              onChange={onChange}
            />
          </div>

          <Row style={{ width: "50%", textAlign: "center" }}>
            <Col>
              <Button
                variant="danger"
                className="mx-5"
                type="reset"
                value="Reset"
              >
                Reset
              </Button>
            </Col>
            <Col>
              {submittingFromData ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button
                  variant="primary"
                  className="mx-5"
                  value="Reset"
                  type="submit"
                  disabled={captchaValue === null}
                >
                  Submit
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </div>
      <button
        id="scrollToTopButton"
        title="Go to top"
        className="ml-5"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <i
          className="fa fa-angle-double-up"
          aria-hidden="true"
          style={{ color: "black", fontWeight: "bolder" }}
        ></i>
      </button>
    </>
  );
}
