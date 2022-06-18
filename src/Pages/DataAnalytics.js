import React from "react";
import SelectQuery from "../Component/SelectQuery";
import BarGraph from "../Component/BarGraph";
import LineGraph from "../Component/LineGraph";
import PieGraph from "../Component/PieGraph";
import DataTable from "../Component/DataTable";
import { Button, Col, Container, Row } from "react-bootstrap";

function DataAnalytics() {
  return (
    <div>
      <Container fluid className="my-4">
        <Row>
          <Col md={2}>
            <SelectQuery />
          </Col>
          <Col md={6} className="py-4">
            <DataTable />
          </Col>
          <Col md={4} className="py-4">
            <Row>
              <PieGraph />
            </Row>
            <Row>
              <BarGraph />
            </Row>
            <Row>
              <LineGraph />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DataAnalytics;
