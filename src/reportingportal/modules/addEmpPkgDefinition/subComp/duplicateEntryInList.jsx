import React, { Fragment } from "react";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";

const DuplicateEntryInList = ({ rows = [] }) => {
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
        rows={rows.map((item, index) => ({
          id: index,
          ...item,
        }))}
        Gridheight={"60vh"}
      />
    </Fragment>
  );
};

export default DuplicateEntryInList;
