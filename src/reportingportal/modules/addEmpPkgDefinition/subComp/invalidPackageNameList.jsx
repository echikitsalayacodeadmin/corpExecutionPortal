import React, { Fragment } from "react";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { formatColumnName } from "../../../../assets/utils";

const InvalidPackageNameList = ({ rows = [] }) => {
  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).map((key) => {
          return {
            field: key,
            headerName: formatColumnName(key),
            width: 170,
            align: "left",
            headerAlign: "left",
          };
        })
      : [];

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

export default InvalidPackageNameList;
