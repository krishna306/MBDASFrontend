import React from "react";
import { Col, Row, Carousel, Card, CardGroup } from "react-bootstrap";
import Slider from "react-slick";

function Home() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    cssEase: "linear",
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <Row style={{ marginLeft: "10%", width: "80%" }}>
        <Col className="text-center">
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                height="550px"
                className="d-block w-100"
                src="./Assets/Images/pic1.jpeg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                height="550px"
                className="d-block w-100"
                src="./Assets/Images/pic2.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                height="550px"
                className="d-block w-100"
                src="./Assets/Images/pic3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <div className="px-4">
        <CardGroup className="py-2 my-4">
          <Card>
            <Card.Body>
              <Card.Title
                className="text-center card-header"
                style={{ color: "white", backgroundColor: "#1E90FF" }}
              >
                Mortality Based Data Analytics System
              </Card.Title>
              <Card.Text className="text-justify py-2">
                The Mortality Based Data Analytics System(MBDAS) has been
                created to convert the on-paper death registration process into
                an online process(paperless). MBDAS helps in keeping track of
                the cause of deaths for various deceased, and provides an
                efficient platform to analyze this data based on different
                parameters and helps in taking a timely action to contain a disease spread.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title
                className="text-center card-header"
                style={{ color: "white", backgroundColor: "#1E90FF" }}
              >
                Data Entry Format
              </Card.Title>
              <Card.Text className="text-justify py-2">
                The format chosen for reporting the death of a person has been
                adopted by referring to the different death certficate formats
                available online issued by different government authorities.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title
                className="text-center card-header"
                style={{ color: "white", backgroundColor: "#1E90FF" }}
              >
                Data Analysis
              </Card.Title>
              <Card.Text className="text-justify py-2">
                A timely analysis of some quickly spreading disease in a
                community or globally can help in taking a suitable action to
                contain the disease.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>

      <hr />
      <div style={{ marginBottom: "30px" }}>
        <Slider {...settings}>
          <div>
            <img
              height="70px"
              className="p-2"
              src="./Assets/Images/Digital_India_logo.svg"
              alt="image1"
            />
          </div>

          <div>
            <img
              height="70px"
              width="60px"
              className="p-2"
              src="./Assets/Images/Seal_of_Assam.svg"
              alt="image2"
            />
          </div>
          <div>
            <img
              height="70px"
              className="p-2"
              src="./Assets/Images/NIC_logo.svg"
              alt="image5"
            />
          </div>
          <div>
            <img
              height="70px"
              className="p-2"
              src="./Assets/Images/mygov.png"
              alt="image4"
            />
          </div>
          <div>
            <img
              height="70px"
              className="p-2"
              src="./Assets/Images/indiagovin.svg"
              alt="image5"
            />
          </div>
          <div>
            <img
              height="70px"
              className="p-2"
              src="./Assets/Images/C-DAC_LogoTransp.png"
              alt="image5"
            />
          </div>
          <div>
            <img
              height="70px"
              className="p-2"
              src="./Assets/Images/PMOindia.svg.png"
              alt="image5"
            />
          </div>
          <div>
            <img
              height="70px"
              className="p-2"
              src="./Assets/Images/PMNRF.png"
              alt="image3"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Home;
