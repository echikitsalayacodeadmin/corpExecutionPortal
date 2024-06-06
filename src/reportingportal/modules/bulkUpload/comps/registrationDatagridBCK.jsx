import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  useGridApiRef,
} from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "id", width: 90 },
  {
    field: "name",
    headerName: "name",
    width: 150,
    editable: true,
  },
  {
    field: "empId",
    headerName: "empId",
    width: 150,
    editable: true,
  },
  {
    field: "imageUrl",
    headerName: "imageUrl",
    width: 150,
    editable: true,
  },
  {
    field: "department",
    headerName: "department",
    width: 110,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "mobile",
    width: 110,
    type: "number",
    editable: true,
  },
  {
    field: "dateOfBirth",
    headerName: "dateOfBirth",
    width: 110,
    editable: true,
  },
  {
    field: "gender",
    headerName: "gender",
    width: 110,
    editable: true,
  },
  {
    field: "genderTypeString",
    headerName: "genderTypeString",
    width: 110,
    editable: true,
  },
  {
    field: "orgId",
    headerName: "orgId",
    width: 110,
    editable: true,
  },

  {
    field: "age",
    headerName: "age",
    width: 110,
    editable: true,
  },

  {
    field: "designation",
    headerName: "designation",
    width: 110,
    editable: true,
  },

  {
    field: "city",
    headerName: "city",
    width: 110,
    editable: true,
  },

  {
    field: "plant",
    headerName: "plant",
    width: 110,
    editable: true,
  },

  {
    field: "corpId",
    headerName: "corpId",
    width: 110,
    editable: true,
  },

  {
    field: "bloodGroup",
    headerName: "bloodGroup",
    width: 110,
    editable: true,
  },

  {
    field: "employmentType",
    headerName: "employmentType",
    width: 110,
    editable: true,
  },

  {
    field: "employmentTypeString",
    headerName: "employmentTypeString",
    width: 110,
    editable: true,
  },

  {
    field: "preEmploymentStatus",
    headerName: "preEmploymentStatus",
    width: 110,
    editable: true,
  },

  {
    field: "dateOfJoining",
    headerName: "dateOfJoining",
    width: 110,
    editable: true,
  },

  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const RegistrationDatagrid = ({ rows = [], setEditedList }) => {
  const apiRef = useGridApiRef();

  const getJson = (apiRef) => {
    // Select rows and columns
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    // Format the data. Here we only keep the value
    const data = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumnsField.forEach((field) => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    // Stringify with some indentation
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters

    console.log({ Test: apiRef.current.state.rows });
    return JSON.stringify(data, null, 2);
  };

  const processRowUpdate = React.useCallback(async (newRow) => {
    // Make the HTTP request to save in the backend
    console.log({ newRow: newRow });
    getJson(apiRef);
    return newRow;
  }, []);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ error });
  }, []);
  return (
    <Box sx={{ height: 720, width: "100%" }}>
      <DataGrid
        apiRef={apiRef}
        slots={{ toolbar: GridToolbar }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
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
      />
    </Box>
  );
};

export default RegistrationDatagrid;
