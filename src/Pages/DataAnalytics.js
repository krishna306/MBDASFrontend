import React, { useState } from "react";
import BarGraph from "../Component/BarGraph";
import LineGraph from "../Component/LineGraph";
import Graph from "../Component/Graph";
import { Col, Container, Row, Button, Spinner } from "react-bootstrap";
import { useGetAllDeceasedQuery } from "../services/appApi";
import { useSelector } from "react-redux";
import PageNotFound from "./PageNotFound";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import TableModule from "./Columns";
function DataAnalytics() {
  // get current user from loacal Browser Storage
  const { user } = useSelector((state) => state.user);

  // Get All Data of Deceased from Database  and processed data
  const { data, isLoading, isError } = useGetAllDeceasedQuery();
  const [processedData, setProcessedData] = useState([]);

  // Filter Dataset for different graphs
  const [genderdata, setGenderData] = useState({});
  const [townOrVillageData, setTownOrVillageData] = useState({});
  const [diseaseData, setDiseaseData] = useState({});
  const [districtData, setDistrictData] = useState({});
  const [ailmentData, setAilmentData] = useState([]);

  const [lineGraphStatistics, setLineGraphStatistics] = useState({});
  const [yearDeathData, setYearDeathData] = useState({});

  // use State variable for taracking data extraction for graphs
  const [dataLoaded, setDataLoaded] = useState(false);
  const [t, setT] = useState(false);
  const [d, setD] = useState(false);
  const [l, setL] = useState(false);
  const [torvill, setTorvill] = useState(false);
  const [dis, setDis] = useState(false);
  const [district, setDistrict] = useState(false);
  const [ail, setAil] = useState(false);

  let extractedData = {};
  let yeardeathData = {};
  let lineGraphData = {};
  let node = React.createRef();
  async function extractData(entity) {
    extractedData = {};
    if (!isLoading) {
      for (let item of processedData) {
        extractedData[item[entity]] = extractedData[item[entity]]
          ? extractedData[item[entity]] + 1
          : 1;
      }
      if (entity === "gender") {
        setGenderData(extractedData);
      }
      if (entity === "townOrVillage") {
        setTownOrVillageData(extractedData);
      }
      if (entity === "disease") {
        setDiseaseData(extractedData);
      }
      if (entity === "district") {
        setDistrictData(extractedData);
      }
    }
  }
  function extractDeathInYearData() {
    if (!isLoading) {
      for (let item of processedData) {
        yeardeathData[item.date.slice(0, 4)] = yeardeathData[
          item.date.slice(0, 4)
        ]
          ? yeardeathData[item.date.slice(0, 4)] + 1
          : 1;
      }
      setYearDeathData(yeardeathData);
    }
  }
  function extractDataForLineGraph() {
    if (!isLoading) {
      for (let item of processedData) {
        const year = item.date.slice(0, 4);
        lineGraphData[year] = {
          male: 0,
          female: 0,
          other: 0,
        };
      }
      for (let item of processedData) {
        if (item.gender === "male") {
          lineGraphData[item.date.slice(0, 4)].male = lineGraphData[
            item.date.slice(0, 4)
          ].male
            ? lineGraphData[item.date.slice(0, 4)].male + 1
            : 1;
        } else if (item.gender === "other") {
          lineGraphData[item.date.slice(0, 4)].other = lineGraphData[
            item.date.slice(0, 4)
          ].other
            ? lineGraphData[item.date.slice(0, 4)].other + 1
            : 1;
        } else {
          lineGraphData[item.date.slice(0, 4)].female = lineGraphData[
            item.date.slice(0, 4)
          ].female
            ? lineGraphData[item.date.slice(0, 4)].female + 1
            : 1;
        }
      }
      setLineGraphStatistics(lineGraphData);
    }
  }

  async function extractAilmentData() {
    var Ailment = {};
    if (!isLoading) {
      for (let item of processedData) {
        if (item.drinker > 0) {
          Ailment["Drinker"] = Ailment["Drinker"] ? Ailment["Drinker"] + 1 : 1;
        }
        if (item.smoker > 0) {
          Ailment["Smoker"] = Ailment["Smoker"] ? Ailment["Smoker"] + 1 : 1;
        }
        if (item.tobacco > 0) {
          Ailment["Tobacco"] = Ailment["Tobacco"] ? Ailment["Tobacco"] + 1 : 1;
        }
        if (item.panmasala > 0) {
          Ailment["Arecanut"] = Ailment["Arecanut"]
            ? Ailment["Arecanut"] + 1
            : 1;
        }
      }
      setAilmentData(Ailment);
    }
  }

  if (!user || user.role !== "admin") {
    return <PageNotFound />;
  }

  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <h5 className="mt-2">Loading...</h5>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center m-4">
        <h3>Some Error Occured</h3>
      </div>
    );
  }
  if (!t || !torvill || !dis || !district || !ail) {
    extractData("gender");
    setT(true);
    extractData("townOrVillage");
    setTorvill(true);
    extractData("disease");
    setDis(true);
    extractData("district");
    setDistrict(true);
    extractData("disease");
    setDis(true);
    extractAilmentData();
    setAil(true);
  }
  if (!d) {
    extractDeathInYearData();
    setD(true);
  }
  if (!l) {
    extractDataForLineGraph();
    setL(true);
  }

  function handleClick() {
    setDataLoaded(true);
    setProcessedData(node.filterContext.data);
    setT(false);
    setD(false);
    setL(false);
    setDis(false);
    setDistrict(false);
    setTorvill(false);
    setAil(false);
  }
  return (
    <Container fluid style={{ overflow: "hidden" }}>
      <Row className="mx-4">
       <Col className="mt-2">
       <h3 className="text-decoration-underline">Enter data field values to perform Data Analysis</h3>
       </Col>
        <Col className="d-flex justify-content-end mt-1 mr-4">
        
          <Button
            name="click-me"
            style={{ width: "200px"}}
            onClick={handleClick}
          >
            Load Data to Graph
          </Button>
        </Col>
        <Row>
          <Col className="py-2">
            <div className="random">
              <BootstrapTable
                responsive
                keyField="_id"
                data={data}
                columns={TableModule.columns}
                pagination={paginationFactory(TableModule.options)}
                filter={filterFactory()}
                filterPosition="top"
                filtersClasses="text-center"
                headerClasses="text-center "
                bodyClasses="text-center "
                ref={(res) => {
                  node = res;
                }}
              />
            </div>
          </Col>
        </Row>
      </Row>
      
      {dataLoaded && (
        <>
          <hr style={{ height: "2px", color: "black" }} />
          <Row className="mt-4">
            <Row className="text-center text-decoration-underline">
              <h3>Graphical Analysis</h3>
            </Row>
            <Row>
              <Col className="mb-2">
                <Graph
                  data={{ data: genderdata, title: "Gender wise Death Toll" }}
                />
              </Col>
              <Col className="mb-2">
                <Graph
                  data={{
                    data: townOrVillageData,
                    title: "Town/Village wise Death Toll",
                  }}
                />
              </Col>
              <Col className="mb-2">
                <Graph data={{ data: diseaseData, title: "Cause of Death" }} />
              </Col>
            </Row>

            <Row>
              <Col className="mb-2">
                <Graph
                  data={{
                    data: districtData,
                    title: "District wise Death Toll",
                  }}
                />
              </Col>
              <Col>
                <Graph
                  data={{
                    data: ailmentData,
                    title: "Substance Addiction Statistics",
                  }}
                ></Graph>
              </Col>
              <Col className="mb-2">
                <BarGraph
                  data={{ data: yearDeathData, title: "Year wise Death toll" }}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <LineGraph
                  data={{
                    data: lineGraphStatistics,
                    title: "Year wise death toll of male female and other",
                  }}
                />
              </Col>
            </Row>
          </Row>
        </>
      )}
    </Container>
  );
}

export default DataAnalytics;
