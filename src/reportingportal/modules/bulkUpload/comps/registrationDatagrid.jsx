import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: false,
  },
  {
    field: "empId",
    headerName: "Employee ID",
    width: 150,
    editable: false,
  },
  {
    field: "department",
    headerName: "Department",
    width: 110,
    editable: false,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 110,
    type: "number",
    editable: false,
  },
  {
    field: "dateOfBirth",
    headerName: "Date Of Birth",
    width: 110,
    editable: false,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 110,
    editable: false,
  },

  {
    field: "age",
    headerName: "Age",
    width: 110,
    editable: false,
  },

  {
    field: "designation",
    headerName: "Designation",
    width: 110,
    editable: false,
  },

  {
    field: "city",
    headerName: "City",
    width: 110,
    editable: false,
  },

  {
    field: "plant",
    headerName: "Plant",
    width: 110,
    editable: false,
  },

  {
    field: "bloodGroup",
    headerName: "Blood Group",
    width: 110,
    editable: false,
  },

  {
    field: "employmentType",
    headerName: "Employment Type",
    width: 130,
    editable: false,
  },
  {
    field: "fathersName",
    headerName: "Father Name",
    width: 200,
    editable: false,
  },
  {
    field: "dateOfJoiningTypeString",
    headerName: "Date of Joining",
    width: 130,
    editable: false,
  },
  {
    field: "packageName",
    headerName: "Package Name",
    width: 130,
    editable: false,
  },
  {
    field: "grade",
    headerName: "Grade",
    width: 130,
    editable: false,
  },
  {
    field: "contractorName",
    headerName: "Contractor Name",
    width: 130,
    editable: false,
  },
  {
    field: "formNo",
    headerName: "Form No",
    width: 130,
    editable: false,
  },
  {
    field: "pathPackage",
    headerName: "Path Package",
    width: 130,
    editable: false,
  },
];

const RegistrationDatagrid = ({ rows = [] }) => {
  return (
    <Box sx={{ height: 640, width: "100%" }}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[100]}
        checkboxSelection
        disableRowSelectionOnClick
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
};

export default RegistrationDatagrid;
