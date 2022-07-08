import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";

function DataTable(props) {
  const data = props.data;
  const genderOptions = {
    male: "male",
    female: "female",
    other: "others",
  };
  const placeOfDeathOptions = {
    Home: "Home",
    Institution: "Institution",
    Hospital: "Hospital",
    other: "Others",
  };
  const townorvillageOptions = {
    Town: "Town",
    Village: "Village",
  };
  const religionOptions = {
    Hindu: "Hindu",
    Muslim: "Muslim",
    Christian: "Christian",
    Shikh: "Shikh",
    Others: "Others",
  };
  const typeOfMedicalAttentionOptions = {
    "Medical Other than Institution": "Medical Other than Institution",
    Institution: "Institution",
    none: "none",
  };
  const medicallyCertifiedoptions = {
    true: "true",
    false: "false",
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );
    function afterFilter (newResult,newFilter){
      console.log(newResult);
      console.log(newFilter)

    }
  const options = {
    //paginationSize: 1,
    pageStartIndex: 1,
    sizePerPage: 5,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    //firstPageText: 'First',
    prePageText: "Back",
    nextPageText: "Next",
    //lastPageText: 'Last',
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
  };

  const columns = [
    {
      dataField: "aadhar",
      text: "Aadhaar",
      filter: textFilter(),
      headerStyle: () => {
        return { paddingLeft: "10px", paddingRight: "10px" };
      },
    },
    {
      dataField: "date",
      text: "Date of Death",
      sort: true,
      filter: textFilter({
        placeholder: "Enter Date",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "35px",
          paddingRight: "35px",
          whiteSpace: "nowrap",
        };
      },
        formatter: (cell, row) => (
          <small>{cell && (new Date(cell)).toGMTString()}</small>

      ),
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== "object") {
          dateObj = new Date(cell);
        }
        if (cell == null) {
          return;
        }
        return `${("0" + dateObj.getDate()).slice(-2)}/${(
          "0" +
          (dateObj.getMonth() + 1)
        ).slice(-2)}/${dateObj.getFullYear()}`;
      },
    },
    {
      dataField: "deadname",
      text: "Name of Deceased",
      sort: true,
      filter: textFilter({
        onFilter:filterVal => console.log(filterVal),
        placeholder: "Enter Name",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "25px",
          paddingRight: "25px",
          whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "gender",
      text: "Gender",
      formatter: (cell) => genderOptions[cell],
      filter: selectFilter({
        options: genderOptions,
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "father",
      text: "Father Name",
      filter: textFilter({
        placeholder: "Enter Name",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "35px",
          paddingRight: "35px",
          whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "mother",
      text: "Mother Name",
      filter: textFilter({
        placeholder: "Enter Name",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "35px",
          paddingRight: "35px",
          whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "spouse",
      text: "Spouse",
      filter: textFilter({
        placeholder: "Enter Name",
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "age",
      text: "Age",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Age",
        withoutEmptyComparatorOption:"true",
      }),
      headerStyle: () => {
        return { paddingLeft: "35px", paddingRight: "35px" };
      },
    },

    {
      dataField: "placeOfDeath",
      text: "Death Place Type",
      formatter: (cell) => placeOfDeathOptions[cell],
      filter: selectFilter({
        options: placeOfDeathOptions,
        placeholder: "Select Place Type",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "35px",
          paddingRight: "35px",
          whiteSpace: "nowrap",
        };
      },
      formatter: (cell, row) => <small>{cell}</small>,
    },

    {
      dataField: "addressAtDead",
      text: "Address at the time of Death",
      filter: textFilter({
        placeholder: "Enter Address",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "35px",
          paddingRight: "35px",
          whiteSpace: "nowrap",
        };
      },
      formatter: (cell, row) => <small>{cell}</small>,
    },
    {
      dataField: "informantName",
      text: "Informant Name",
      filter: textFilter({
        placeholder: "Enter Name",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "35px",
          paddingRight: "35px",
          whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "informantRelation",
      text: "Informant Relation",
      filter: textFilter({
        placeholder: "Enter Relation",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "25px",
          paddingRight: "25px",
          whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "district",
      text: "District",
      filter: textFilter(),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "townOrVillage",
      text: "Town/Village",
      formatter: (cell) => townorvillageOptions[cell],
      filter: selectFilter({
        options: townorvillageOptions,
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "torvName",
      text: "Town/Village Name",
      filter: textFilter(),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "deceasedstate",
      text: "State",
      filter: textFilter(),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },

    {
      dataField: "addressPermanent",
      text: "Permanent Address",
      filter: textFilter({
        placeholder: "Enter Address",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "35px",
          paddingRight: "35px",
          whiteSpace: "nowrap",
        };
      },
      formatter: (cell, row) => <small>{cell}</small>,
    },
    {
      dataField: "religion",
      text: "Religion",
      formatter: (cell) => religionOptions[cell],
      filter: selectFilter({
        options: religionOptions,
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "occupation",
      text: "Occupation",
      filter: textFilter(),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "typeOfMedicalAttention",
      text: "Type Of Medical Attention",
      formatter: (cell) => typeOfMedicalAttentionOptions[cell],
      filter: selectFilter({
        options: typeOfMedicalAttentionOptions,
        placeholder: "Select Type",
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
      formatter: (cell, row) => <small>{cell}</small>,
    },

    {
      dataField: "medicallyCertified",
      text: "Medically Certified",
      formatter: (cell) => medicallyCertifiedoptions[cell],
      filter: selectFilter({
        options: medicallyCertifiedoptions,
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },

    {
      dataField: "disease",
      text: "Cause of Death",
      filter: textFilter(),
      headerStyle: () => {
        return {
          paddingLeft: "25px",
          paddingRight: "25px",
          whiteSpace: "nowrap",
        };
      },
    },

    {
      dataField: "drinker",
      text: "Habitual Drinker(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
        withoutEmptyComparatorOption:"true",
      }),
      
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },

    {
      dataField: "panmasala",
      text: "Habitual Arecanut(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
        withoutEmptyComparatorOption:"true",
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },

    {
      dataField: "smoker",
      text: "Habitual Smoker(Years)",
      
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
        withoutEmptyComparatorOption:"true",
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "tobacco",
      text: "Habitual Tobacco(Years)",
      
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
        withoutEmptyComparatorOption:"true",
      }),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "pregnancydeath",
      text: "Death at time of Pregnancy",
      sort: true,
      filter: textFilter(),
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
    },
    {
      dataField: "signature",
      text: "Applicant Signature",
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
      formatter: (cell, row) => (
        <small><a href={cell} target="_blank" rel="noopener noreferrer">View</a></small>

    ),
    },
    {
      dataField: "goanburahCertificate",
      text: "Gaonburah Certificate",
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
      formatter: (cell, row) => (
        <small><a href={cell} target="_blank" rel="noopener noreferrer">View</a></small>

    ),
    },
    {
      dataField: "otherDocuments",
      text: "Other Document",
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
      formatter: (cell, row) => (
        <small><a href={cell} target="_blank" rel="noopener noreferrer">View</a></small>

    ),
    },
    {
      dataField: "deathCertificate",
      text: "Death Certificate",
      headerStyle: () => {
        return { paddingLeft: "25px", paddingRight: "25px" };
      },
      formatter: (cell, row) => (
            <small><a href={cell} target="_blank" rel="noopener noreferrer">View</a></small>
  
        ),
    },
  ];
  return (
    <BootstrapTable
      responsive
      hover
      keyField="_id"
      data={data}
      columns={columns}
      pagination={paginationFactory(options)}
      filter={filterFactory({afterFilter})}
      filterPosition="top"
      filtersClasses="text-center"
      headerClasses="text-center "
      bodyClasses="text-center "
      
    />
  );
}

export default DataTable;
