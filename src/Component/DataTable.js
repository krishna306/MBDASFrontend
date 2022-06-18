import React from "react";
import { Table } from "react-bootstrap";
// import "./DataTable.css";
function DataTable() {
  return (
    <div style={{ display: "flex", height: "900px", overFlowY: "auto" }}>
      <Table responsive striped  hover>
        <thead>
          <tr>
            {Array.from({ length: 12 }).map((_, index) => (
              <th key={index}>Table heading</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 12 }).map((_, index) => (
            <tr>
              {Array.from({ length: 12 }).map((_, index) => (
                <td key={index}>Table cell {index}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DataTable;
