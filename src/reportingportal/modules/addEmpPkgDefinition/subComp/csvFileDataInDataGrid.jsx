import React, { Fragment } from "react";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";

const CsvFileDataInDataGrid = ({ rows = [] }) => {
  const columns = [
    {
      field: "empId",
      headerName: "Employee ID",
      width: 200,
      editable: false,
    },
    {
      field: "packageName",
      headerName: "Package Name",
      width: 200,
      editable: false,
    },
  ];
  return (
    <Fragment>
      <CustomDataGridLayout
        disableRowSelectionOnClick={true}
        disableSelectionOnClick={true}
        checkboxSelection={false}
        hideFooterPagination={false}
        rowHeight={30}
        columns={columns}
        rows={rows}
        Gridheight={"60vh"}
      />
    </Fragment>
  );
};

export default CsvFileDataInDataGrid;
