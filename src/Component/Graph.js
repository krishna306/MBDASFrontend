import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Row, Col, Form } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

function Graph(props) {
  const [graphType, setGraphType] = useState("pie");
  const Data = props.data.data;
  const title = props.data.title;
  const Statistics = [];
  const keys = Object.keys(Data);
  Object.keys(Data).forEach(function (key) {
    Statistics.push(Data[key]);
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        font: {
          size: 20,
        },
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: false,
        text: title,
        font: {
          size: 20,
        },
      },
    },
    scales: {
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
  const data = {
    labels: keys,
    datasets: [
      {
        label: title,
        data: Statistics,
        backgroundColor: [
          "rgba(229,43,124,0.4)",

          "rgba(223,229,43,0.4)",
          "rgba(229,111,43,0.6)",
          "rgba(161,229,43,0.6)",
          "rgba(186,43,229,0.6)",
          "rgba(0,100,0,0.6)",
          "rgba(43,142,229,0.5)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(70,130,180,0.6)",
          "rgba(30,144,255,0.5)",
          "rgba(176,196,222,0.6)",
          "rgba(123,104,238,0.6)",
          "rgba(255, 99, 132, 0.4)",

          "rgba(85,69,69,0.6)",
          "rgba(132,128,13,0.6)",
          "rgba(253,165,87,0.6)",
          "rgba(128,0,0,0.6)",
          "rgba(165,42,42,0.6)",
          "rgba(205,92,92,0.6)",
          "rgba(0,128,128,0.6)",
          "rgba(95,158,160,0.6)",
          "rgba(139,0,139,0.6)",
          "rgba(199,21,133,0.6)",
          "rgba(210,105,30,0.6)",
          "rgba(244,164,96,0.6)",

          "rgba(255,105,180,0.6)",
          "rgba(218,112,214,0.6)",
        ],
        borderColor: [
          "rgba(229,43,124,1)",

          "rgba(223,229,43,1)",
          "rgba(229,111,43,1)",
          "rgba(161,229,43,1)",
          "rgba(186,43,229,1)",

          "rgba(0,100,0,1)",
          "rgba(43,142,229,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(70,130,180,1)",
          "rgba(30,144,255,1)",
          "rgba(176,196,222,1)",
          "rgba(123,104,238,1)",
          "rgba(255, 99, 132, 1)",

          "rgba(0,100,0,1)",
          "rgba(223,229,43,1)",
          "rgba(229,111,43,1)",
          "rgba(161,229,43,1)",
          "rgba(186,43,229,1)",
          "rgba(229,43,124,1)",

          "rgba(85,69,69,1)",
          "rgba(132,128,13,1)",
          "rgba(253,165,87,1)",
          "rgba(128,0,0,1)",
          "rgba(165,42,42,1)",
          "rgba(205,92,92,1)",
          "rgba(0,128,128,1)",
          "rgba(95,158,160,1)",
          "rgba(139,0,139,1)",
          "rgba(199,21,133,1)",
          "rgba(210,105,30,1)",
          "rgba(244,164,96,1)",

          "rgba(255,105,180,1)",
          "rgba(218,112,214,1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const changeGraph = (e) => {
    const Type = e.target.value;
    console.log(Type);
    setGraphType(Type);
  };
  return (
    <div style={{ borderRadius: "10px" }} className="p-4 ml-2">
      <Row>
        <Col sm={7}>
          <h5 style={{ whiteSpace: "no-wrap" }}>{title}</h5>
        </Col>
        <Col sm={5}>
          <Form.Select
            name="typeofgraph"
            style={{ width: "140px", height: "35px" }}
            onChange={changeGraph}
            required
          >
            <option value="pie">Select Graph</option>
            <option value="pie">Pie</option>
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
        {graphType === "pie" && (
          <Pie
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
export default Graph;
