import React, { Fragment, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import { BASE_URL } from "../../../../assets/constants";
import { saveData } from "../../../assets/reportingServices";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

const initialData = [
  {
    id: 1,
    packageName: "Pack-A",
    bloodPackageName: "Blood",
    xray: false,
    cbc: false,
    urine: false,
    fitness: false,
    eye: false,
    audiometry: false,
    pft: false,
    ecg: false,
    sugar: false,
    sbilirubin: false,
    stoolSample: false,
    employmentType: "",
    date: dayjs().format("YYYY-MM-DD"),
  },
];

const AddPackageManually = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
  setResponse,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState(initialData);
  const [nextId, setNextId] = useState(2);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [rowModesModel, setRowModesModel] = React.useState({});

  const addRow = () => {
    const newPackageName = `Pack-${String.fromCharCode(65 + rows.length)}`;
    const newRow = {
      id: nextId,
      packageName: newPackageName,
      bloodPackageName: "",
      xray: false,
      cbc: false,
      urine: false,
      fitness: false,
      eye: false,
      audiometry: false,
      pft: false,
      ecg: false,
      sugar: false,
      sbilirubin: false,
      stoolSample: false,
      employmentType: "",
      date: dayjs().format("YYYY-MM-DD"),
    };
    setRows([...rows, newRow]);
    setNextId(nextId + 1);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "packageName",
      headerName: "Package Name",
      width: 130,
      editable: true,
    },
    {
      field: "bloodPackageName",
      headerName: "Blood Package Name",
      width: 150,
      editable: true,
    },
    {
      field: "xray",
      headerName: "X-ray",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "cbc",
      headerName: "CBC",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "urine",
      headerName: "Urine",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "fitness",
      headerName: "Fitness",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "eye",
      headerName: "Eye",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "audiometry",
      headerName: "Audiometry",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "pft",
      headerName: "PFT",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "ecg",
      headerName: "ECG",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "sugar",
      headerName: "Sugar",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "sbilirubin",
      headerName: "S. Bilirubin",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "stoolSample",
      headerName: "Stool Sample",
      type: "boolean",
      width: 90,
      editable: true,
    },
    {
      field: "employmentType",
      headerName: "Employment Type",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        // "AHC",
        "ONROLL",
        "CONTRACTOR",
        "PRE_EMPLOYMENT",
        // "NOT_PROVIDED",
        // "NOT_MAPPED",
        // "CSR",
      ],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleAddPackagesMannualy = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    const url =
      BASE_URL +
      `org/addBulkPackageDetails/${corpId}?campCycleId=${campCycleId || ""}`;
    const payload = rows.map(({ id, ...rest }) => rest);
    const result = await saveData(url, payload);
    if (result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Successfully Saved`, {
        variant: "success",
      });
      setResponse(result.data);
    }
  };

  return (
    <Fragment>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={addRow}>
          Add Package
        </Button>
        <Box style={{ height: "59vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection={false}
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
          />
        </Box>
        <AppBar
          position="fixed"
          color="inherit"
          sx={{
            top: "auto",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth={false}>
            <Toolbar>
              <Grid
                container
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  lg={7}
                  md={7}
                  sm={12}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    onClick={handleAddPackagesMannualy}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </Fragment>
  );
};

export default AddPackageManually;
