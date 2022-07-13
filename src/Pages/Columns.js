import filterFactory, {
    textFilter,
    selectFilter,
    numberFilter,
    Comparator
  } from "react-bootstrap-table2-filter";
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total ml-2">
      <strong>
      Showing {from} to {to} of {size} Results
      </strong>
    </span>
  );
  const genderOptions = {
    male: "Male",
    female: "Female",
    other: "Other",
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
      text: "Year of Death (YYYY-MM-DD)",
      sort: true,
      filter: textFilter({
        placeholder: "Enter Date",
      }),
      headerStyle: () => {
        return {
          paddingLeft: "10px",
          paddingRight: "10px",
          // whiteSpace: "nowrap",
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
        return `${dateObj.getFullYear()}-${(
          "0" +
          (dateObj.getMonth() + 1)
        ).slice(-2)}-${("0" + dateObj.getDate()).slice(-2)}`;
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
        comparators:["Select Constraint",Comparator.EQ,Comparator.NE, Comparator.GT,Comparator.LT,Comparator.GE,Comparator.LE,],
        defaultValue :{Comparator:"Select Constraint"},
        withoutEmptyComparatorOption:true

      }),
      headerStyle: () => {
        return { paddingLeft: "30px", paddingRight: "30px" };
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
          // whiteSpace: "nowrap",
        };
      },
    },
    {
      dataField: "drinker",
      text: "Habitual Drinker(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter No. of Years",
        comparators:["Select Constraint",Comparator.EQ,Comparator.NE, Comparator.GT,Comparator.LT,Comparator.GE,Comparator.LE,],
        defaultValue :{Comparator:"Select Constraint"},
        withoutEmptyComparatorOption:true
        
      }),
    },
    {
      dataField: "panmasala",
      text: "Habitual Arecanut(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter No. of Years",
        comparators:["Select Constraint",Comparator.EQ,Comparator.NE, Comparator.GT,Comparator.LT,Comparator.GE,Comparator.LE,],
        defaultValue :{Comparator:"Select Constraint"},
        withoutEmptyComparatorOption:true
      }),
    },
    {
      dataField: "smoker",
      text: "Habitual Smoker(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter No. of Years",
        comparators:["Select Constraint",Comparator.EQ,Comparator.NE, Comparator.GT,Comparator.LT,Comparator.GE,Comparator.LE,],
        defaultValue :{Comparator:"Select Constraint"},
        withoutEmptyComparatorOption:true
        
      }),
    },
    {
      dataField: "tobacco",
      text: "Habitual Tobacco(Years)",
      sort: true,
      filter: numberFilter({
        placeholder: "Enter No. of Years",
        comparators:["Select Constraint",Comparator.EQ,Comparator.NE, Comparator.GT,Comparator.LT,Comparator.GE,Comparator.LE,],
        defaultValue :{Comparator:"Select Constraint"},
        withoutEmptyComparatorOption:true
  
      }),
    },
  ];
  const TableModule = {columns,options};
 export default TableModule ;