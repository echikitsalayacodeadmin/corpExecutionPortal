import React, { Fragment } from "react";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { Box } from "@mui/material";
import CustomAutocomplete from "../../../../assets/customAutocomplete";

const AddBulkPackage = ({ selectedEmpType, setSelectedEmpType, rows = [] }) => {
  const columns = [
    {
      field: "packageName",
      headerName: "Package Name",
      width: 200,
      editable: false,
    },
    {
      field: "bloodPackageName",
      headerName: "Blood Package Name",
      width: 150,
      editable: false,
    },
    {
      field: "cbc",
      headerName: "Cbc",
      width: 110,
      editable: false,
    },
    {
      field: "urine",
      headerName: "Urine",
      width: 110,
      type: "number",
      editable: false,
    },
    {
      field: "fitness",
      headerName: "Fitness",
      width: 110,
      editable: false,
    },
    {
      field: "eye",
      headerName: "Eye",
      width: 110,
      editable: false,
    },

    {
      field: "audiometry",
      headerName: "Audiometry",
      width: 110,
      editable: false,
    },

    {
      field: "pft",
      headerName: "Pft",
      width: 110,
      editable: false,
    },

    {
      field: "ecg",
      headerName: "Ecg",
      width: 110,
      editable: false,
    },

    {
      field: "sugar",
      headerName: "Sugar",
      width: 110,
      editable: false,
    },

    {
      field: "stoolSample",
      headerName: "Stool Sample",
      width: 110,
      editable: false,
    },

    {
      field: "xray",
      headerName: "Xray",
      width: 200,
      editable: false,
    },
    {
      field: "sbilirubin",
      headerName: "Sbilirubin",
      width: 130,
      editable: false,
    },
    {
      field: "employmentType",
      headerName: "Employment Type",
      width: 130,
      editable: false,
    },
  ];
  return (
    <Fragment>
      <Box sx={{ gap: 2 }}>
        <CustomAutocomplete
          options={[
            // "AHC",
            "ONROLL",
            "CONTRACTOR",
            "PRE_EMPLOYMENT",
            // "NOT_PROVIDED",
            // "NOT_MAPPED",
            // "CSR",
          ]}
          value={selectedEmpType || null}
          onChange={(event, newValue, reason) => {
            setSelectedEmpType(newValue);
            if (reason === "clear") {
              setSelectedEmpType(null);
            }
          }}
          label="Select Employment Type"
          placeholder="Select Employment Type"
          required={true}
          asterickColor={"red"}
          getOptionLabel={(option) => option || null}
        />
        <CustomDataGridLayout
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
          checkboxSelection={false}
          hideFooterPagination={false}
          rowHeight={30}
          columns={columns}
          rows={rows}
          Gridheight={"65vh"}
        />
      </Box>
    </Fragment>
  );
};

export default AddBulkPackage;
