import filterFactory, {
    textFilter,
    selectFilter,
    numberFilter,
  } from "react-bootstrap-table2-filter";
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Results
    </span>
  );
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
  const options = {
    pageStartIndex: 1,
    sizePerPage: 5,
    prePageText: "Back",
    nextPageText: "Next",
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
      dataField: "date",
      text: "Date of Death",
      sort: true,
      filter: textFilter({
        placeholder: "Enter Date",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "10px",
          paddingRight: "10px",
          whiteSpace: "nowrap",
        };
      },
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
      dataField: "age",
      text: "Age",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Age",

      }),
      headerStyle: () => {
        return { paddingLeft: "15px", paddingRight: "15px" };
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
          paddingLeft: "10px",
          paddingRight: "10px",
          whiteSpace: "nowrap",
        };
      },
      formatter: (cell, row) => <small>{cell}</small>,
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
      dataField: "disease",
      text: "Cause of Death",
      filter: textFilter(),
      headerStyle: () => {
        return {
          paddingLeft: "25px",
          paddingRight: "25px",
        };
      },
    },
    {
      dataField: "drinker",
      text: "Habitual Drinker(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
        
      }),
    },
    {
      dataField: "panmasala",
      text: "Habitual Arecanut(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
    
      }),
    },
    {
      dataField: "smoker",
      text: "Habitual Smoker(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
        
      }),
    },
    {
      dataField: "tobacco",
      text: "Habitual Tobacco(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter Year",
  
      }),
    },
  ];
  const TableModule = {columns,options};
 export default TableModule ;