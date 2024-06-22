import React, { Fragment, useEffect, useMemo, useState } from "react";
import { fetchMismatchPackages } from "../../services/mismatchPackageServices";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import { isMobile } from "react-device-detect";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import { Edit } from "@mui/icons-material";
import PackageAutocomplete from "../../global/packageAutocomplete/packageAutocomplete";
import { BASE_URL } from "../../../assets/constants";
import { getData, saveData } from "../../assets/reportingServices";
import CustomButtonBlue from "../../../assets/customButtonBlue";

const MismatchPackage = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const [mistmatchPackageList, setMistmatchPackageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filterNullPackages, setFilterNullPackages] = useState(false);

  const handleFilterNullPackages = (event) => {
    setFilterNullPackages(event.target.checked);
  };

  useEffect(() => {
    fetchMismatchPackages(corpId, setMistmatchPackageList, setIsLoading);
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState("");

  const columns = [
    {
      field: "empId",
      headerName: "Emp ID",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "packageName",
      headerName: "Package Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "employmentType",
      headerName: "Employment Type",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updatePackage",
      headerName: "Upadate Package",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              setSelectedRowData(params.row);
              setOpen(true);
            }}
          >
            <Edit />
          </IconButton>
        );
      },
    },
  ];

  const [selectedRows, setSelectedRows] = React.useState([]);
  const handleSelectionModelChange = (selectionModel) => {
    console.log({ selectionModel });
    const selectedRowsData = selectionModel.map((id) => {
      return mistmatchPackageList?.find((row) => row?.empId === id);
    });
    console.log({ selectedRowsData });
    setSelectedRows(selectedRowsData);
  };

  const [selectedEmpIdCommaSep, setSelectedEmpIdCommaSep] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [selectedPackage, setSelectedpackage] = useState("");
  const filterData = useMemo(() => {
    return mistmatchPackageList
      .filter((item) => (filterNullPackages ? item.packageName === "" : true))
      .filter((item) => {
        return selectedEmpIdCommaSep === ""
          ? true
          : selectedEmpIdCommaSep.split(",").includes(item.empId);
      })
      .filter((item) =>
        employmentType ? item.employmentType === employmentType : true
      );
  }, [
    filterNullPackages,
    mistmatchPackageList,
    selectedEmpIdCommaSep,
    employmentType,
  ]);

  const handleUpdateEmpPackage = async () => {
    const obj = [
      {
        empId: selectedRowData.empId,
        packageName: selectedPackage,
      },
    ];

    const url =
      BASE_URL +
      `http://apibackend.uno.care/api/org/empIdAndPackageDefinition/${corpId}`;
    const response = await saveData(url, obj);
    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response.data);
    }
  };

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
      <Box sx={{ marginBlock: 1 }}>
        <Paper
          sx={{
            borderRadius: 5,
            paddingInline: 3,
            boxShadow: 3,
            height: isMobile ? "100%" : "84vh",
            paddingBlock: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item lg={2} xs={6} sx={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filterNullPackages}
                    onChange={handleFilterNullPackages}
                  />
                }
                label="Filter Null Packages"
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <TextField
                size="small"
                fullWidth
                label={`Filter Employee ID Comma Seperated`}
                placeholder={`Enter Employee ID Comma Seperated`}
                value={selectedEmpIdCommaSep || ""}
                onChange={(e) => {
                  setSelectedEmpIdCommaSep(e.target.value);
                  handleChangeEmployeeCommaSepIds(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <CustomAutocomplete
                options={["ONROLL", "CONTRACTOR", "PRE_EMPLOYMENT", "CSR"]}
                label={`Employment Type`}
                placeholder={`Employment Type`}
                getOptionLabel={(option) => option}
                value={employmentType || ""}
                onChange={(e) => {
                  setEmploymentType(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <CustomDataGridLayout
            rows={filterData}
            styles={{
              ".error": {
                backgroundColor: "#FF0000",
                "&:hover": {
                  backgroundColor: "#FF4D4D",
                },
              },
            }}
            columns={columns}
            rowHeight={30}
            checkboxSelection={true}
            Gridheight={isMobile ? "100%" : "68vh"}
            disableSelectionOnClick={true}
            disableRowSelectionOnClick={true}
            getRowId={(row) => row?.empId}
            selectionModel={selectedRows.map((row) => row.empId)}
            onRowSelectionModelChange={handleSelectionModelChange}
            getRowClassName={(params) => {
              return params.row.packageName === "" ? "error" : "";
            }}
          />
        </Paper>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <PackageAutocomplete
            setSelectedPackage={setSelectedpackage}
            employmentType={selectedRowData.employmentType}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <CustomButtonBlue
              onClick={handleUpdateEmpPackage}
              title={"Submit"}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default MismatchPackage;
