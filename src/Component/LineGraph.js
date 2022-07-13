import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineGraph(props) {
  const [graphType, setGraphType] = useState("bar");
  const Data = props.data.data;
  const title = props.data.title;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels:{
          font:{
            size:14
          }
        },
      },
     
      title: {
        display: false,
        text: "Year wise death toll of male female and other",

        font: {
          size: 20,
        },
      },
    },
    scales:{
      y: {
        beginAtZero: true,
        ticks: {
          color: "black",
          font: {
            size: 14,
            weight: "bold",
          },
         
        },
      },
      x: {
        ticks: {
          color: "black",
          font: {
            size: 14,
            weight:"bold",
          },
        },
      },
    },
  };
  const Statistics1 = [];
  const Statistics2 = [];
  const Statistics3 = [];
  const labels = Object.keys(Data);
  Object.keys(Data).forEach(function (key) {
    Statistics1.push(Data[key].male);
  });
  Object.keys(Data).forEach(function (key) {
    Statistics2.push(Data[key].female);
  });
  Object.keys(Data).forEach(function (key) {
    Statistics3.push(Data[key].other);
  });
  const data = {
    labels,
    datasets: [
      {
        label: "Male",
        data: Statistics1,
        borderColor: "rgba(229,43,124,0.4)",
        backgroundColor:  "rgba(229,43,124,1)",
      },
      {
        label: "Female",
        data: Statistics2,
        borderColor: "rgba(223,229,43,0.4)",
        backgroundColor: "rgba(223,229,43,1)",
      },
      {
        label: "Other",
        data: Statistics3,
        borderColor: "rgba(229,111,43,0.6)",
        backgroundColor:  "rgba(229,111,43,1)",
      },
    ],
  };
  const changeGraph = (e) => {
    const Type = e.target.value;
    console.log(Type);
    setGraphType(Type);
  };
  return (
    <div
      className="p-4 ml-2"
    >
      <Row>
        <Col sm={8}>
          <h5 style={{ whiteSpace: "no-wrap" }}>{title}</h5>
        </Col>
        <Col sm={4}>
          <Form.Select
            name="typeofgraph"
            style={{ width: "140px", height: "35px" }}
            onChange={changeGraph}
            required
          >
            <option value="bar">Select Graph</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {graphType === "bar" && (
          <Bar
            data={data}
            options={options}
            className="p-2"
            style={{ maxHeight: "400px" }}
          />
        )}
        {graphType === "line" && (
          <Line
            data={data}
            options={options}
            className="p-2"
            style={{ maxHeight: "400px" }}
          />
        )}
      </Row>
    </div>
  );
}

export default LineGraph;
