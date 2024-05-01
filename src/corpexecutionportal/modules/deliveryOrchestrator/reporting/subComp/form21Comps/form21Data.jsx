import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { fetchForm21Data } from "../../../../../services/deliveryOrchestratorServices";
import CustomDataGridLayout from "../../../../../../assets/globalDataGridLayout/customDataGridLayout";
import { isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";

const Form21Data = () => {
  let { itemId } = useParams();
  const corpId = itemId;
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
          rows={form21Data.filter((item) =>
            medicalDateNotEmpty === true ? item.medicalDate !== null : true
          )}
          styles={{
            backgroundColor: "#e7f2fb",
            borderRadius: "15px",
            padding: "20px",
          }}
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
