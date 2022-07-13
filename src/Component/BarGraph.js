import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar,Line } from "react-chartjs-2";
import { Col, Form, Row } from "react-bootstrap";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarGraph(props) {
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
        text:title,
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
  const Statistics = [];
  const labels = Object.keys(Data);
  Object.keys(Data).forEach(function (key) {
    Statistics.push(Data[key]);
  });
  const data = {
    labels,
    datasets: [
      {
        label: "All",
        data: Statistics,
        borderColor: "rgba(100,149,237)",
        backgroundColor: "rgba(100,149,237)",
      },
    ],
  };
  const changeGraph = (e) => {
    const Type = e.target.value;
    setGraphType(Type);
  };
  return (
    <>
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
    </>
  );
}

export default BarGraph;
