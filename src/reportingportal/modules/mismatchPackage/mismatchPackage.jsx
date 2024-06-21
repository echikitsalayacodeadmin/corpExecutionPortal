import React, { Fragment, useEffect, useMemo, useState } from "react";
import { fetchMismatchPackages } from "../../services/mismatchPackageServices";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import { isMobile } from "react-device-detect";

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
  const filterData = useMemo(() => {
    return mistmatchPackageList
      .filter((item) => (filterNullPackages ? item.packageName === "" : true))
      .filter((item) => {
        return selectedEmpIdCommaSep === ""
          ? true
          : selectedEmpIdCommaSep.split(",").includes(item.empId);
      });
  }, [filterNullPackages, mistmatchPackageList, selectedEmpIdCommaSep]);

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
          <Grid container>
            <Grid item lg={2.5} xs={6} sx={{ display: "flex" }}>
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
            <Grid item xs={12} lg={4}>
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
    </Fragment>
  );
};

export default MismatchPackage;
