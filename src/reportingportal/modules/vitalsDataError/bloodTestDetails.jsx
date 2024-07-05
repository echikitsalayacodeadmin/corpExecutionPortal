import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import CustomAutocomplete from "../../../assets/customAutocomplete";
import CustomDataGridLayout from "../../../assets/globalDataGridLayout/customDataGridLayout";
import { formatColumnName } from "../../../assets/utils";
import RenderExpandableCells from "../../../assets/globalDataGridLayout/renderExpandableCells";
import { BASE_URL } from "../../../assets/constants";
import CustomButtonBlue from "../../../assets/customButtonBlue";
import { Edit } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { getData, updateData } from "../../assets/reportingServices";

const BloodTestDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    testCategory: "PFT",
    testName: "",
    testKey: "",
    biorefRangeMin: 0,
    biorefRangeMax: 0,
    gender: 0,
    genderInString: "",
    acceptableRangeMin: 0,
    acceptableRangeMax: 0,
    rangeType: "",
    mainTestType: "",
    subTestType: "",
  });

  const handleChange = (e, field) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const [bloodData, setBloodData] = useState([]);
  const getTestDetails = async () => {
    const url = BASE_URL + `org/testsconfig`;
    const result = await getData(url);
    if (result.error) {
      console.log(result.error);
    } else {
      const temp = result.data.map((item, index) => ({
        id: index,
        ...item,
        editRow: "editRow",
      }));
      setBloodData(temp);
    }
  };
  useEffect(() => {
    getTestDetails();
  }, [openEditModal]);

  const options = bloodData.map((item) => item.testKey);

  const columns =
    bloodData.length > 0
      ? Object.keys(bloodData[0]).map((key) => ({
          field: key,
          headerName: formatColumnName(key),
          width: 200,
          align: "left",
          headerAlign: "left",
          renderCell: (params) => {
            if (key === "editRow") {
              console.log({ params });
              return (
                <IconButton
                  onClick={() => {
                    setOpenEditModal(true);
                    setFormValues({
                      id: params.row.id,
                      testCategory: params.row.testCategory,
                      testName: params.row.testName,
                      testKey: params.row.testKey,
                      biorefRangeMin: params.row.biorefRangeMin,
                      biorefRangeMax: params.row.biorefRangeMax,
                      gender: params.row.gender,
                      genderInString: params.row.genderInString,
                      acceptableRangeMin: params.row.acceptableRangeMin,
                      acceptableRangeMax: params.row.acceptableRangeMax,
                      rangeType: params.row.rangeType,
                      mainTestType: params.row.mainTestType,
                      subTestType: params.row.subTestType,
                      editRow: "editRow",
                    });
                  }}
                >
                  <Edit />
                </IconButton>
              );
            } else {
              return <RenderExpandableCells {...params} />;
            }
          },
        }))
      : [];

  const [selectedTestName, setSelectedTestName] = useState("");

  const filterData = useMemo(() => {
    return bloodData.filter((item) =>
      selectedTestName !== "" ? item.testKey === selectedTestName : true
    );
  }, [selectedTestName, bloodData]);

  const handleUpdateRow = async () => {
    const payload = {
      id: formValues.id,
      testCategory: formValues.testCategory,
      testName: formValues.testName,
      testKey: formValues.testKey,
      biorefRangeMin: formValues.biorefRangeMin,
      biorefRangeMax: formValues.biorefRangeMax,
      gender: formValues.gender,
      genderInString: formValues.genderInString,
      acceptableRangeMin: formValues.acceptableRangeMin,
      acceptableRangeMax: formValues.acceptableRangeMax,
      rangeType: formValues.rangeType,
      mainTestType: formValues.mainTestType,
      subTestType: formValues.subTestType,
    };

    const url = BASE_URL + `org/testsconfig`;
    const response = await updateData(url, payload);
    if (response.error) {
      enqueueSnackbar(`${response.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Successfully Updated`, {
        variant: "success",
      });
    }
  };

  console.log({ options });
  return (
    <Fragment>
      <Box sx={{ marginBlock: 1 }}>
        <CustomAutocomplete
          options={options}
          label={"Test Name"}
          placeholder="Test Name"
          value={selectedTestName}
          getOptionLabel={(option) => option}
          onChange={(event, newValue, reason) => {
            setSelectedTestName(newValue);
            if (reason === "clear") {
              setSelectedTestName("");
            }
          }}
        />

        <CustomDataGridLayout
          columns={columns}
          rows={filterData.map((item, index) => ({
            id: index,
            ...item,
          }))}
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
        />

        <Dialog
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogContent sx={{ gap: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Test Name"
                  value={formValues.testName}
                  onChange={(e) => handleChange(e, "testName")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Test Key"
                  value={formValues.testKey}
                  onChange={(e) => handleChange(e, "testKey")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bioref Range Min"
                  value={formValues.biorefRangeMin}
                  onChange={(e) => handleChange(e, "biorefRangeMin")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bioref Range Max"
                  value={formValues.biorefRangeMax}
                  onChange={(e) => handleChange(e, "biorefRangeMax")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  value={formValues.gender}
                  onChange={(e) => handleChange(e, "gender")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender In String"
                  value={formValues.genderInString}
                  onChange={(e) => handleChange(e, "genderInString")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Acceptable Range Min"
                  value={formValues.acceptableRangeMin}
                  onChange={(e) => handleChange(e, "acceptableRangeMin")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Acceptable Range Max"
                  value={formValues.acceptableRangeMax}
                  onChange={(e) => handleChange(e, "acceptableRangeMax")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Range Type"
                  value={formValues.rangeType}
                  onChange={(e) => handleChange(e, "rangeType")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Main Test Type"
                  value={formValues.mainTestType}
                  onChange={(e) => handleChange(e, "mainTestType")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sub Test Type"
                  value={formValues.subTestType}
                  onChange={(e) => handleChange(e, "subTestType")}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomButtonBlue onClick={handleUpdateRow} title={"Submit"} />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
    </Fragment>
  );
};

export default BloodTestDetails;
