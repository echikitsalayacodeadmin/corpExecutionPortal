import React, { Fragment, useEffect, useState } from "react";
import CustomAutocomplete from "../../../../assets/customAutocomplete";
import { formatColumnName } from "../../../../assets/utils";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import { getData, updateData } from "../../../assets/reportingServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import { Edit } from "@mui/icons-material";
import RenderExpandableCells from "../../../../assets/globalDataGridLayout/renderExpandableCells";
import { useSnackbar } from "notistack";
import CreateNewPackageMain from "../createNewPackage/createNewPackageMain";
import CustomSelectNew from "../../../../assets/customSelectNew";

const GetPackages = ({
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);
  const [selectedEmpType, setSelectedEmpType] = useState("AHC");
  const [selectedRowData, setSelectedRowData] = useState({});
  const [open, setOpen] = useState(false);

  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).map((key) => {
          return {
            field: key,
            headerName: formatColumnName(key),
            width: key === "id" ? 50 : 170,
            align: "left",
            headerAlign: "left",
            headerClassName: "super-app-theme--header",
            renderCell: (params) => {
              return key === "actions" ? (
                <IconButton
                  onClick={() => {
                    setSelectedRowData(params.row);
                    setOpen(true);
                  }}
                >
                  <Edit />
                </IconButton>
              ) : (
                <RenderExpandableCells {...params} />
              );
            },
          };
        })
      : [];

  const getPackages = async () => {
    if (selectedEmpType) {
      const campCycleId =
        localStorage.getItem("CAMP_ID_REPORTING") === "null"
          ? null
          : localStorage.getItem("CAMP_ID_REPORTING");
      const url =
        BASE_URL +
        `org/getPackageDetails/${corpId}?employmentType=${selectedEmpType}&campCycleId=${
          campCycleId || ""
        }`;
      const result = await getData(url);
      if (result.error) {
        setRows([]);
        console.log(result.error);
      } else {
        const temp = result.data.map((item, index) => ({
          id: index + 1,
          packageName: item.packageName,
          bloodPackageName: item.bloodPackageName,
          xray: item.xray,
          cbc: item.cbc,
          urine: item.urine,
          fitness: item.fitness,
          eye: item.eye,
          audiometry: item.audiometry,
          pft: item.pft,
          ecg: item.ecg,
          sugar: item.sugar,
          sbilirubin: item.sbilirubin,
          testCode: item.testCode,
          stoolSample: item.stoolSample,
          vaccination: item.vaccination,
          employmentType: item.employmentType,
          campCycleId: item.campCycleId,
          conditions: item.conditions,
          pathPackageDetails: item.pathPackageDetails,
          testDetails: item.testDetails,
          date: item.date,
          actions: "",
        }));
        setRows(temp);
      }
    }
  };

  useEffect(() => {
    getPackages();
  }, [selectedEmpType]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRowData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const booleanFields = Object.keys(selectedRowData).filter(
    (key) => typeof selectedRowData[key] === "boolean"
  );

  const handleUpdateEmpPackage = async (e) => {
    e.preventDefault();
    const url = BASE_URL + `org/update/packageDetails/${corpId}`;

    const result = await updateData(url, selectedRowData);
    if (result.error) {
      enqueueSnackbar(`${response.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Successfully Updated`, {
        variant: "success",
      });
      setOpen(false);
      setSelectedRowData({});
      getPackages();
    }
  };

  console.log({ selectedRowData });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Box sx={{ gap: 2 }}>
        <Grid container spacing={1}>
          <Grid item lg={4}>
            <CustomAutocomplete
              options={["AHC", "PRE_EMPLOYMENT"]}
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
          </Grid>
          <Grid item lg={8} display="flex" justifyContent="flex-end">
            <CreateNewPackageMain />
          </Grid>
          <Grid item lg={12}>
            <CustomDataGridLayout
              disableRowSelectionOnClick={true}
              disableSelectionOnClick={true}
              checkboxSelection={false}
              hideFooterPagination={false}
              rowHeight={35}
              columns={columns}
              rows={rows}
              Gridheight={"62vh"}
            />
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle textAlign="center" sx={{ textTransform: "capitalize" }}>
          {selectedRowData.packageName || ""}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 5 }}>
            <form onSubmit={handleUpdateEmpPackage}>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Package Name:</Typography>
                    <TextField
                      sx={{ flex: 3 }}
                      size="small"
                      fullWidth
                      required
                      ///label="Packge Name"
                      placeholder="Enter package name..."
                      value={selectedRowData.packageName}
                      onChange={(e) => {
                        setSelectedRowData({
                          ...selectedRowData,
                          packageName: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Employment Type:</Typography>
                    <Box sx={{ flex: 3 }}>
                      <CustomSelectNew
                        formValues={selectedRowData}
                        setFormValues={setSelectedRowData}
                        property="employmentType"
                        options={[
                          { id: 1, label: "AHC", value: "AHC" },
                          {
                            id: 1,
                            label: "PRE EMPLOYMENT",
                            value: "PRE_EMPLOYMENT",
                          },
                        ]}
                        placeholder="Select employment type..."
                        width={"100%"}
                      />
                    </Box>
                  </Stack>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Employment Type:</Typography>

                    <TextField
                      sx={{ flex: 3 }}
                      size="small"
                      fullWidth
                      //label="Blood Packge Name"
                      placeholder="Enter blood package name..."
                      value={selectedRowData.bloodPackageName}
                      onChange={(e) => {
                        setSelectedRowData({
                          ...selectedRowData,
                          bloodPackageName: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography sx={{ flex: 1.2 }}>Blood Detail:</Typography>
                    <TextField
                      sx={{ flex: 3 }}
                      size="small"
                      fullWidth
                      //label="Blood Packge Details"
                      placeholder="Enter blood details..."
                      value={selectedRowData.pathPackageDetails}
                      onChange={(e) => {
                        setSelectedRowData({
                          ...selectedRowData,
                          pathPackageDetails: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                </Grid>
                {booleanFields.map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedRowData[field] || false}
                          onChange={handleCheckboxChange}
                          name={field}
                        />
                      }
                      label={field}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box
                component={Stack}
                spacing={2}
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 5,
                }}
              >
                <Button variant="contained" size="small" type="submit">
                  Submit
                </Button>

                <Button variant="contained" size="small" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default GetPackages;
