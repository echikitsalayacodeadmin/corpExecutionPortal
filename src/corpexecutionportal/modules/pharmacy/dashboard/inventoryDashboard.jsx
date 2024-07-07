import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Portal,
  TextField,
} from "@mui/material";
import { Close, Download, Edit } from "@mui/icons-material";
import { useGridApiRef } from "@mui/x-data-grid";
import { fetchMedicineInventory } from "../../../services/pharmacyInventory";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import { useSnackbar } from "notistack";
import { updateData } from "../../../assets/corpServices";
import { BASE_URL } from "../../../../assets/constants";
import CustomAutocomplete from "../../../../assets/customAutocomplete";

const InventoryDashboard = ({}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    productCode: "",
    productName: "",
    brand: "",
    secondaryPackingUnitName: "",
    primaryPackingUnitName: "",
    baseUnit: "",
    secondaryConversionUnit: "",
    primaryConversionUnit: "",
    nearExpiryDuration: null,
    dosage: "",
    minimumUnit: "",
    batchFlag: "",
  });

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              onClick={() => {
                setOpen(true);
                setFormValues({
                  productCode: params.row.productCode,
                  productName: params.row.productName,
                  brand: params.row.brand,
                  secondaryPackingUnitName: params.row.secondaryPackingUnitName,
                  primaryPackingUnitName: params.row.primaryPackingUnitName,
                  baseUnit: params.row.baseUnit,
                  secondaryConversionUnit: params.row.secondaryConversionUnit,
                  primaryConversionUnit: params.row.primaryConversionUnit,
                  nearExpiryDuration: params.row.nearExpiryDuration,
                  dosage: params.row.dosage,
                  minimumUnit: params.row.minimumUnit,
                  batchFlag: params.row.batchFlag,
                });
              }}
            >
              <Edit />
            </IconButton>
          </Box>
        );
      },
    },
    { field: "productCode", headerName: "Product Code", width: 200 },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "brand", headerName: "Brand Name", width: 200 },
    {
      field: "secondaryPackingUnitName",
      headerName: "Secondary Package Unit Name",
      width: 220,
    },
    {
      field: "primaryPackingUnitName",
      headerName: "Primary Package Unit Name",
      width: 220,
    },
    {
      field: "baseUnit",
      headerName: "Base Unit",
      width: 100,
    },
    {
      field: "secondaryConversionUnit",
      headerName: "Secondary Conversion Unit",
      width: 170,
    },
    {
      field: "primaryConversionUnit",
      headerName: "Primary Conversion Unit",
      width: 170,
    },
    {
      field: "nearExpiryDuration",
      headerName: "Near Expiry Duration",
      width: 170,
    },
    {
      field: "dosage",
      headerName: "Dosage",
      width: 150,
    },
    {
      field: "minimumUnit",
      headerName: "Minimum Unit",
      width: 150,
    },
    {
      field: "batchFlag",
      headerName: "Batch Flag(Enable/Disable)",
      width: 150,
    },
    { field: "addedDate", headerName: "Added Date", width: 150 },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {
    fetchMedicineInventory(setMedicineList, setIsLoading);
  }, [open]);

  const handleUpdate = async () => {
    const url = BASE_URL + `inventory/updateProductDetails`;
    const payload = [{ formValues }];
    const result = await updateData(url, payload);
    if (result.error) {
      enqueueSnackbar(`${result.error.response.data.message}`, {
        variant: "error",
      });
    } else {
      setOpen(false);
      enqueueSnackbar("Successfully Uploaded", {
        variant: "success",
      });
      setFormValues({
        productCode: "",
        productName: "",
        brand: "",
        secondaryPackingUnitName: "",
        primaryPackingUnitName: "",
        baseUnit: "",
        secondaryConversionUnit: "",
        primaryConversionUnit: "",
        nearExpiryDuration: null,
        dosage: "",
        minimumUnit: "",
        batchFlag: "",
      });
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
      <CustomDataGridLayout
        rows={medicineList}
        columns={columns}
        dataGridHeight={"53vh"}
        density="compact"
      />

      <Portal>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
            Edit Reorder Point
          </DialogTitle>

          <DialogActions sx={{ position: "absolute", top: 0, right: 0 }}>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <Close />
            </IconButton>
          </DialogActions>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Product Code"
                  placeholder="Product Code"
                  size="small"
                  fullWidth
                  value={formValues.productCode}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      productCode: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Product Name"
                  placeholder="Product Name"
                  size="small"
                  fullWidth
                  value={formValues.productName}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      productName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Brand Name"
                  placeholder="Brand Name"
                  size="small"
                  fullWidth
                  value={formValues.brand}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      brand: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Secondary Packaging Unit Name"
                  placeholder="Secondary Packaging Unit Name"
                  size="small"
                  fullWidth
                  value={formValues.secondaryPackingUnitName}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      secondaryPackingUnitName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Primary Packaging Unit Name"
                  placeholder="Primary Packaging Unit Name"
                  size="small"
                  fullWidth
                  value={formValues.primaryPackingUnitName}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      primaryPackingUnitName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Base Unit"
                  placeholder="Base Unit"
                  size="small"
                  fullWidth
                  value={formValues.baseUnit}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      baseUnit: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Secondary Conversion Unit"
                  placeholder="Secondary Conversion Unit"
                  size="small"
                  fullWidth
                  value={formValues.secondaryConversionUnit}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      secondaryConversionUnit: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Primary Conversion Unit"
                  placeholder="Primary Conversion Unit"
                  size="small"
                  fullWidth
                  value={formValues.primaryConversionUnit}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      primaryConversionUnit: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Nea Expiry Duration"
                  placeholder="Near Expiry Duration"
                  size="small"
                  fullWidth
                  value={formValues.nearExpiryDuration}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      nearExpiryDuration: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Dosage"
                  placeholder="Dosage"
                  size="small"
                  fullWidth
                  value={formValues.dosage}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      dosage: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <CustomAutocomplete
                  label="Batch Flag"
                  placeholder="Batch Flag"
                  options={["Enable", "Disable"]}
                  getOptionLabel={(option) => option}
                  value={formValues.dosage}
                  onChange={(event, newValue) => {
                    setFormValues({
                      ...formValues,
                      batchFlag: newValue,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <TextField
                  label="Minimum Unit"
                  placeholder="Minimum Unit"
                  size="small"
                  fullWidth
                  value={formValues.minimumUnit}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      minimumUnit: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => {
                    handleUpdate();
                  }}
                  variant="contained"
                  sx={{ textTransform: "capitalize" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default InventoryDashboard;
