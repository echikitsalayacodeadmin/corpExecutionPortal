import React, { Fragment, useEffect, useState } from "react";
import ParseCSV from "../../../../assets/parseCSV";
import { BASE_URL } from "../../../../assets/constants";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
} from "@mui/material";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { saveData } from "../../../assets/reportingServices";
import { useSnackbar } from "notistack";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import dayjs from "dayjs";
import CustomAutocomplete from "../../../../assets/customAutocomplete";

const AddBulkPackage = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [packageDetail, setPackageDetail] = useState([]);
  const [packageDetailUpdated, setPackageDetailUpdated] = useState([]);
  const [savedFile, setSavedFile] = useState("");

  const [selectedEmpType, setSelectedEmpType] = useState(null);

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

  useEffect(() => {
    if (packageDetail) {
      setPackageDetailUpdated(
        packageDetail.map((item, index) => ({
          id: index,
          packageName: item.packagename,
          bloodPackageName: item.bloodpackagename,
          xray: item.xray === "TRUE" ? true : false,
          cbc: item.cbc === "TRUE" ? true : false,
          urine: item.urine === "TRUE" ? true : false,
          fitness: item.fitness === "TRUE" ? true : false,
          eye: item.eye === "TRUE" ? true : false,
          audiometry: item.audiometry === "TRUE" ? true : false,
          pft: item.pft === "TRUE" ? true : false,
          ecg: item.ecg === "TRUE" ? true : false,
          sugar: item.sugar === "TRUE" ? true : false,
          sbilirubin: item.sbilirubin === "TRUE" ? true : false,
          testCode: item.testCode === "TRUE" ? true : false,
          stoolSample: item.stoolsample === "TRUE" ? true : false,
          date: dayjs().format("YYYY-MM-DD"),
        }))
      );
    }
  }, [packageDetail]);

  const handleUploadBulkPackages = async () => {
    const campCycleId =
      localStorage.getItem("CAMP_ID_REPORTING") === "null"
        ? null
        : localStorage.getItem("CAMP_ID_REPORTING");
    const url =
      BASE_URL +
      `org/addBulkPackageDetails/${corpId}?campCycleId=${campCycleId}&employmentType=${selectedEmpType}`;
    const payload = packageDetailUpdated.map(({ id, ...rest }) => rest);
    const result = await saveData(url, payload);
    if (result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Successfully Saved`, {
        variant: "success",
      });
    }
  };

  console.log({ packageDetail, packageDetailUpdated });

  return (
    <Fragment>
      <Box sx={{ mt: 2 }}>
        <CustomAutocomplete
          options={[
            "AHC",
            "ONROLL",
            "CONTRACTOR",
            "PRE_EMPLOYMENT",
            "NOT_PROVIDED",
            "NOT_MAPPED",
            "CSR",
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
          rows={packageDetailUpdated}
          Gridheight={"65vh"}
        />
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
                  <Stack direction={{ lg: "row", xs: "column" }}>
                    <ParseCSV
                      setList={setPackageDetail}
                      corpId={corpId}
                      setSavedFile={setSavedFile}
                      testPackage={true}
                    />
                    <Button
                      variant="contained"
                      disabled={selectedEmpType === "" ? true : false}
                      onClick={handleUploadBulkPackages}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </Fragment>
  );
};

export default AddBulkPackage;
