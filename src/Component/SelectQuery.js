import React, { useState } from "react";
import { Row, Form, Container, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
function SelectQuery() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTIme] = useState(null);
  const district = [
    "Dima Hasao",
    "Bajali",
    "Hojai",
    "Karbi Anglong",
    "Tamulpur",
    "West Karbi Anglong",
    "Morigaon",
    "Nagaon",
    "Cachar",
    "Hailakandi",
    "Karimganj",
    "Charaideo",
    "Dhemaji",
    "Dibrugarh",
    "Golaghat",
    "Jorhat",
    "Lakhimpur",
    "Majuli",
    "Sivasagar",
    "Tinsukia",
    "Biswanath",
    "Darrang",
    "Sonitpur",
    "Udalguri",
    "Baksa",
    "Barpeta",
    "Bongaigaon",
    "Chirang",
    "Dhubri",
    "Goalpara",
    "Nalbari",
    "Kamrup Metropolitan",
    "Kamrup Rural",
    "Kokrajhar",
    "South Salmara-Mankachar",
  ];
  district.sort();
  
  return (
    <Container>
      <Row className="py-2 mt-4" style={{border:"1px solid grey", borderRadius:"5px"}}>
        <Row style={{marginLeft:"1px",fontWeight:"bolder"}}>Timeline</Row>
      <Row>
        <Col style={{ width: "10px" }}>From</Col>
        <Col >
          <DatePicker
            selected={startTime}
            onChange={(starttime) => setStartTime(starttime)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date(1990, 1, 1)}
            maxDate={new Date()}
            className=""
            showYearDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            placeholderText="DD/MM/YYYY"
           
          />
        </Col>
      </Row>

      <Row className="my-2">
        <Col style={{ width: "10px" }}>To</Col>
        <Col>
          <DatePicker
            selected={endTime}
            onChange={(endtime) => setEndTIme(endtime)}
            className="mt-1"
            dateFormat="dd/MM/yyyy"
            minDate={startTime}
            maxDate={new Date()}
            showYearDropdown
            placeholderText="DD/MM/YYYY"
            yearDropdownItemNumber={100}
            scrollableYearDropdown
          />
        </Col>
      </Row>
      </Row>
      
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Others</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Age Group</option>
          <option value="1">Child (below 18)</option>
          <option value="2">Adult (between 18 to 60)</option>
          <option value="3">Old (above 60)</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Place of Death</option>
          <option value="1">Hospital</option>
          <option value="2">Institution</option>
          <option value="2">House</option>
          <option value="3">Other Place</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>State</option>
          <option value="1">Assam</option>
          <option value="2">Other</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>District</option>
          {district.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </Form.Select>
      </Row>
      <Row>
        <Form.Select>
          <option value="2">Town</option>
          <option value="2">Village</option>
        </Form.Select>
      </Row>

      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Religion</option>
          <option value="1">Hindu</option>
          <option value="2">Muslim</option>
          <option value="3">Christian</option>
          <option value="4">Others</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Occupation</option>
          <option value="1">Doctor</option>
          <option value="2">Teacher</option>
          <option value="3">Labour</option>
          <option value="2">Farmer</option>
          <option value="2">Other</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Medical Attention</option>
          <option value="1">Instiitutional</option>
          <option value="2">Non Institutional</option>
          <option value="3">No Medical Attention</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Disease</option>
          <option value="1">Cancer</option>
          <option value="2">Covid</option>
          <option value="3">Other</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Type of Death</option>
          <option value="1">Accidental</option>
          <option value="2">Sucidal</option>
          <option value="2">Pregnancy</option>
          <option value="3">other</option>
        </Form.Select>
      </Row>
      <Row className="my-2">
        <Form.Select aria-label="Default select example">
          <option>Habitual Addiction</option>
          <option value="1">Tobacco</option>
          <option value="2">Alcohol</option>
          <option value="3">Smoker</option>
          <option value="2">Arecanut</option>
          <option value="2">Drugs</option>
        </Form.Select>
      </Row>
      <hr />
      <Row className="mt-4  justify-content-center">
        <Button variant="primary" style={{ width: "150px" }}>
          Reset
        </Button>
      </Row>
    </Container>
  );
}

export default SelectQuery;
