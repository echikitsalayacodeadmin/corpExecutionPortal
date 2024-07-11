import React, { Fragment, useEffect, useMemo, useState } from "react";
import { fetchForm21Data } from "../../../../services/uploadReportServices";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
} from "@mui/material";
import CustomDataGridLayout from "../../../../../assets/globalDataGridLayout/customDataGridLayout";
import RenderExpandableCells from "../../../../../assets/globalDataGridLayout/renderExpandableCells";
import GlobalDateLayout from "../../../../../assets/globalDateLayout/globalDateLayout";

const Form21Data = ({ corpId = localStorage.getItem("CORP_ID_REPORTING") }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [form21Data, setForm21Data] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchForm21Data(corpId, setIsLoading, setForm21Data);
  }, []);

  console.log({ form21Data });

  const columns = [
    {
      field: "sno",
      headerName: "S.No",
      width: 50,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "empId",
      headerName: "Emp ID",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "age",
      headerName: "Age",
      width: 80,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "occupation",
      headerName: "Occupation",
      width: 250,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => <RenderExpandableCells {...params} />,
    },
    {
      field: "dateOfJoining",
      headerName: "Date Of Joining",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "dateOfLeavingOrTransfer",
      headerName: "Date Of Leaving Or Transfer",
      width: 250,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "reasonsForLeavingOrTransfer",
      headerName: "Reasons For Leaving Or Transfer",
      width: 250,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "section",
      headerName: "Section",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "medicalDate",
      headerName: "Medical Date",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "fitness",
      headerName: "Fitness",
      width: 80,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "doctorSignature",
      headerName: "Doctor Signature",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "certifyingSurgeonSignature",
      headerName: "Certifying Surgeon Signature",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
  ];

  const [medicalDateNotEmpty, setMedicalDateNotEmpty] = useState(false);
  const handleMedicalDateNotEmpty = (event) => {
    setMedicalDateNotEmpty(event.target.checked);
  };

  const filteredData = useMemo(() => {
    return form21Data
      .filter((item) =>
        medicalDateNotEmpty === true ? item.medicalDate !== null : true
      )
      .filter((item) => {
        const medicalDate = new Date(item.medicalDate);
        if (fromDate && toDate) {
          const withinDateRange =
            medicalDate >= new Date(fromDate) &&
            medicalDate <= new Date(toDate);

          return withinDateRange;
        } else if (fromDate) {
          // If only fromDate is provided, filter for that specific date
          const withinDateRange =
            medicalDate >= new Date(fromDate) &&
            medicalDate <= new Date(fromDate); // toDate is same as fromDate

          return withinDateRange;
        } else {
          return true;
        }
      });
  }, [form21Data, medicalDateNotEmpty, fromDate, toDate]);

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
      <Box sx={{ marginBlock: 2 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={4}
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <GlobalDateLayout
              initialDate={fromDate}
              setDate={setFromDate}
              label={"From Date"}
              disableFuture={true}
            />
            <GlobalDateLayout
              initialDate={toDate}
              setDate={setToDate}
              label={"To Date"}
              disableFuture={true}
            />
          </Grid>
          <Grid item lg={12} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={medicalDateNotEmpty}
                  onChange={handleMedicalDateNotEmpty}
                />
              }
              label="Filter employees whose medical date is not empty"
            />
          </Grid>
        </Grid>
        <CustomDataGridLayout
          columns={columns}
          rows={filteredData}
          rowHeight={30}
          getRowId={(row) => row?.empId}
          checkboxSelection={true}
          disableRowSelectionOnClick={true}
          Gridheight={"60vh"}
        />
      </Box>
    </Fragment>
  );
};

export default Form21Data;
