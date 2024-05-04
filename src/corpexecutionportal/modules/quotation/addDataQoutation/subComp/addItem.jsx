import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../../assets/constants";
import { getData, saveData } from "../../../../assets/corpServices";
import CustomAutocomplete from "../../../../../assets/customAutocomplete";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";

const AddItem = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = React.useState([]);
  const fetchCategoryList = async () => {
    const url = BASE_URL + "quotation/data/ohc/categories";
    try {
      const response = await getData(url);
      if (response?.data) {
        setCategories(response.data);
      } else {
        console.error("Error fetching data:", response?.error);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCategories([]);
    }
  };

  React.useEffect(() => {
    fetchCategoryList();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    testName: "",
    description: "",
    bestPrice: "",
    throwAwayPrice: "",
    quotePrice: "",
    quotationDataType: "AHC",
    sequence: "",
    categoryTitle: "",
    packageTitle: "",
    packageName: "",
    packageDescription: "",
    noOfStaff: "",
    perMonthCost: "",
    totalCostPerMonth: "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    const url = BASE_URL + "quotation/data/add/item";
    const Obj = [
      formValues.quotationDataType === "AHC"
        ? {
            testName: formValues.testName,
            description: formValues.description,
            bestPrice: formValues.bestPrice,
            throwAwayPrice: formValues.throwAwayPrice,
            quotePrice: formValues.quotePrice,
            quotationDataType: "AHC",
            sequence: formValues.sequence,
            ohcPackageType: formValues.ohcPackageType,
            quantity: formValues.quantity,
          }
        : {
            quotationDataType: "OHC",
            sequence: formValues.sequence,
            categoryTitle: formValues.categoryTitle,
            packageTitle: formValues.packageTitle,
            packageName: formValues.packageName,
            packageDescription: formValues.packageDescription,
            noOfStaff: formValues.noOfStaff,
            perMonthCost: formValues.perMonthCost,
            totalCostPerMonth: formValues.totalCostPerMonth,
          },
    ];

    const result = await saveData(url, Obj);
    if (result && result.data) {
      setIsLoading(false);
      console.log("SUCCESS POST", result.data);
      setFormValues({
        testName: "",
        description: "",
        bestPrice: "",
        throwAwayPrice: "",
        quotePrice: "",
        quotationDataType: "",
        sequence: "",

        categoryTitle: "",
        packageTitle: "",
        packageName: "",
        packageDescription: "",
        noOfStaff: "",
        perMonthCost: "",
        totalCostPerMonth: "",
      });
      enqueueSnackbar("Saved Successfully!", {
        variant: "success",
      });
    } else if (result && result.error) {
      console.log("SUCCESS POST", result.error);
      enqueueSnackbar("An Error Occured", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  console.log({ formValues });

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
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} lg={12}>
          <FormControl fullWidth size="small">
            <InputLabel>Quotation Data Type</InputLabel>
            <Select
              label="Quotation Data Type"
              placeholder="Quotation Data Type"
              value={formValues.quotationDataType}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  quotationDataType: e.target.value,
                })
              }
            >
              <MenuItem value="AHC">AHC</MenuItem>
              <MenuItem value="OHC">OHC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={12}>
          <TextField
            label="#Sequence"
            variant="outlined"
            fullWidth
            placeholder="#Sequence"
            size="small"
            value={formValues.sequence}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (
                inputValue === "" ||
                (!isNaN(inputValue) && parseInt(inputValue) >= 1)
              ) {
                setFormValues({ ...formValues, sequence: inputValue });
              }
            }}
          />
        </Grid>
        {formValues.quotationDataType === "AHC" ? (
          <>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#TestName"
                variant="outlined"
                fullWidth
                placeholder="#TestName"
                size="small"
                value={formValues.testName}
                onChange={(e) => {
                  setFormValues({ ...formValues, testName: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#Description"
                variant="outlined"
                fullWidth
                placeholder="#Description"
                size="small"
                value={formValues.description}
                onChange={(e) => {
                  setFormValues({ ...formValues, description: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#Throw Away Price"
                variant="outlined"
                fullWidth
                placeholder="#Throw Away Price"
                size="small"
                value={formValues.throwAwayPrice}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (
                    inputValue === "" ||
                    (!isNaN(inputValue) && parseInt(inputValue) >= 1)
                  ) {
                    setFormValues({
                      ...formValues,
                      throwAwayPrice: inputValue,
                    });
                  }
                }}
              />
            </Grid>{" "}
            <Grid item xs={12} lg={12}>
              <TextField
                label="#Quote Price"
                variant="outlined"
                fullWidth
                placeholder="#Quote Price"
                size="small"
                value={formValues.quotePrice}
                onChange={(e) => {
                  setFormValues({ ...formValues, quotePrice: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#Best Price"
                variant="outlined"
                fullWidth
                placeholder="#Best Price"
                size="small"
                value={formValues.bestPrice}
                onChange={(e) => {
                  setFormValues({ ...formValues, bestPrice: e.target.value });
                }}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} lg={12}>
              <CustomAutocomplete
                options={categories}
                placeholder={"Select Category"}
                label={"Select Category"}
                value={formValues.categoryTitle || null}
                getOptionLabel={(option) => option}
                onChange={(event, newValue, reason) => {
                  setFormValues({ ...formValues, categoryTitle: newValue });
                  if (reason === "clear") {
                    setFormValues({
                      ...formValues,
                      categoryTitle: null,
                    });
                  }
                }}
                onInputChange={(event, newInputValue) => {
                  setFormValues({
                    ...formValues,
                    categoryTitle: newInputValue,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#PackageTitle"
                variant="outlined"
                fullWidth
                placeholder="#PackageTitle"
                size="small"
                value={formValues.packageTitle}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    packageTitle: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#PackageName"
                variant="outlined"
                fullWidth
                placeholder="#PackageName"
                size="small"
                value={formValues.packageName}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setFormValues({
                    ...formValues,
                    packageName: inputValue,
                  });
                }}
              />
            </Grid>{" "}
            <Grid item xs={12} lg={12}>
              <TextField
                label="#PackageDescription"
                variant="outlined"
                fullWidth
                placeholder="#PackageDescription"
                size="small"
                value={formValues.packageDescription}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    packageDescription: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#NoOfStaff"
                variant="outlined"
                fullWidth
                placeholder="#NoOfStaff"
                size="small"
                value={formValues.noOfStaff}
                onChange={(e) => {
                  setFormValues({ ...formValues, noOfStaff: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#PerMonthCost"
                variant="outlined"
                fullWidth
                placeholder="#PerMonthCost"
                size="small"
                value={formValues.perMonthCost}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    perMonthCost: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                label="#TotalCostPerMonth"
                variant="outlined"
                fullWidth
                placeholder="#TotalCostPerMonth"
                size="small"
                value={formValues.totalCostPerMonth}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    totalCostPerMonth: e.target.value,
                  });
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
      <CustomButtonBlue title="Save" onClick={handleSave} />
    </Fragment>
  );
};

export default AddItem;
