import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const SearchResults = (props) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const rows = props.docList;
  const columns = [
    {
      field: "fullName",
      headerAlign: "center",
      align: "center",
      headerName: "Name",
      width: 100,
    },

    {
      field: "age",
      headerAlign: "center",
      align: "center",
      headerName: "Age",
      width: 100,
    },

    {
      field: "gender",
      headerAlign: "center",
      align: "center",
      headerName: "Gender",
      width: 100,
    },

    {
      field: "email",
      headerAlign: "center",
      align: "center",
      headerName: "Email",
      width: 100,
    },

    {
      field: "mobile",
      headerAlign: "center",
      align: "center",
      headerName: "Mobile No.",
      width: 150,
    },

    {
      field: "guardianFirstName",
      headerAlign: "center",
      align: "center",
      headerName: "Guardian Name",
      width: 250,
    },

    {
      field: "rmpNo",
      headerAlign: "center",
      align: "center",
      headerName: "Reg No.",
      width: 150,
    },
    {
      field: "specialization",
      headerAlign: "center",
      align: "center",
      headerName: "Specialization",
      width: 150,
    },
    {
      field: "fees",
      headerAlign: "center",
      align: "center",
      headerName: "Fees",
      width: 150,
    },
  ];
  console.log({ selectionModel: selectionModel });

  return (
    <Box sx={{ height: "53vh", p: 2, background: "#fff" }}>
      <Box style={{ display: "flex", height: "100%" }}>
        <Box style={{ flexGrow: 1 }}>
          <DataGrid
            getRowId={(row) => row.docId}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
              props.onRowSelect(newSelectionModel, props.docList);
            }}
            selectionModel={selectionModel}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableMultipleSelection
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResults;
