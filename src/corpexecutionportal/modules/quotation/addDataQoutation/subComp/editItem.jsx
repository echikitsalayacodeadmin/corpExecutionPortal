import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import {
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import { BASE_URL } from "../../../../../assets/constants";
import { getData, updateData } from "../../../../assets/corpServices";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import CustomDataGridLayout from "../../../../../assets/globalDataGridLayout/customDataGridLayout";

const EditItem = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchItemList = async () => {
    const url = BASE_URL + "quotation/list";
    const response = await getData(url);
    if (response?.data) {
      setIsLoading(false);
      console.log({ SUCCESS: response?.data });
      setItemList(sortArrayBySequence(response?.data));
    } else {
      setIsLoading(false);
      console.log({ ERROR: response?.error });
      setItemList([]);
    }
  };

  useEffect(() => {
    fetchItemList();
  }, []);

  const initialRows = itemList || [];
  const [selectedQoutationDataType, setSelectedQoutationDataType] = useState({
    label: "AHC",
    value: "AHC",
  });

  const handleUpdate = async (updatedRow) => {
    console.log({ handleUpdate: updatedRow });
    const url = BASE_URL + "quotation/data/update/item";
    let Obj = {};
    if (updatedRow.quotationDataType === "OHC") {
      Obj = {
        isActive: updatedRow.isActive,
        id: updatedRow.id,
        sequence: updatedRow.sequence,
        quotationDataType: "OHC",
        categoryTitle: updatedRow.categoryTitle,
        packageTitle: updatedRow.packageTitle,
        packageName: updatedRow.packageName,
        packageDescription: updatedRow.packageDescription,
        noOfStaff: updatedRow.noOfStaff,
        perMonthCost: updatedRow.perMonthCost,
        totalCostPerMonth: updatedRow.totalCostPerMonth,
      };
    } else if (updatedRow.quotationDataType === "AHC") {
      Obj = {
        isActive: updatedRow.isActive,
        id: updatedRow.id,
        testName: updatedRow.testName,
        description: updatedRow.description,
        bestPrice: updatedRow.bestPrice,
        throwAwayPrice: updatedRow.throwAwayPrice,
        quotePrice: updatedRow.quotePrice,
        quotationDataType: updatedRow.quotationDataType,
        sequence: updatedRow.sequence,
      };
    }

    console.log({ Obj });

    const result = await updateData(url, Obj);
    if (result && result.data) {
      console.log("SUCCESS POST", result.data);
      enqueueSnackbar("Saved Successfully!", {
        variant: "success",
      });
      fetchItemList();
    } else if (result && result.error) {
      console.log("SUCCESS POST", result.error);
      enqueueSnackbar("An Error Occurred", {
        variant: "error",
      });
    }
  };

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    const editedRow = rows.find((row) => row.id === id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    handleUpdate(updatedRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "sequence",
      headerName: "Sequence",
      width: 110,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    ...(selectedQoutationDataType.value === "OHC"
      ? [
          {
            field: "categoryTitle",
            headerName: "Category Title",
            width: 170,
            editable: true,
          },
          {
            field: "packageTitle",
            headerName: "Package Title",
            width: 170,
            editable: true,
          },
          {
            field: "packageName",
            headerName: "PackageName",
            width: 170,
            editable: true,
          },
          {
            field: "packageDescription",
            headerName: "Package Description",
            width: 170,
            editable: true,
          },
          {
            field: "noOfStaff",
            headerName: "NoOfStaff",
            width: 120,
            editable: true,
          },
          {
            field: "perMonthCost",
            headerName: "PerMonthCost",
            width: 110,
            editable: true,
          },
          {
            field: "totalCostPerMonth",
            headerName: "Total Cost Per Month",
            width: 170,
            editable: true,
          },
        ]
      : []),
    ...(selectedQoutationDataType.value === "AHC"
      ? [
          {
            field: "testName",
            headerName: "Test Name",
            width: 170,
            editable: true,
          },

          {
            field: "description",
            headerName: "Description",
            width: 200,
            editable: true,
          },
          {
            field: "throwAwayPrice",
            headerName: "Throw Away Price",
            width: 150,
            editable: true,
          },
          {
            field: "bestPrice",
            headerName: "Best Price",
            width: 100,
            editable: true,
          },
          {
            field: "quotePrice",
            headerName: "Quote Price",
            width: 100,
            editable: true,
          },
          {
            field: "quotationDataType",
            headerName: "Quotation Data Type",
            width: 200,
            align: "center",
            headerAlign: "center",
            editable: true,
            type: "singleSelect",
            valueOptions: ["OHC", "AHC"],
          },
        ]
      : []),
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
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
        ];
      },
    },
  ];

  console.log({ rows });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <CustomAutocomplete
              label={"Select quotation Data Type"}
              placeholder={"Select Quotation Data Type"}
              options={[
                { label: "AHC", value: "AHC" },
                { label: "OHC", value: "OHC" },
              ]}
              value={selectedQoutationDataType}
              onChange={(event, newValue, reason) => {
                setSelectedQoutationDataType(newValue);
                if (reason === "clear") {
                  setSelectedQoutationDataType({
                    label: "AHC",
                    value: "OHC",
                  });
                }
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CustomDataGridLayout
              columns={columns}
              rows={itemList.filter(
                (item) =>
                  item.quotationDataType === selectedQoutationDataType.value
              )}
              rowHeight={40}
              Gridheight={"100%"}
              getRowId={(row) => row?.id}
              checkboxSelection={false}
              disableRowSelectionOnClick={true}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default EditItem;
