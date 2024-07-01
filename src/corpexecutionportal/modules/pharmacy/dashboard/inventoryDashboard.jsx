import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { Download } from "@mui/icons-material";
import { useGridApiRef } from "@mui/x-data-grid";
import { fetchMedicineInventory } from "../../../services/pharmacyInventory";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";

const InventoryDashboard = ({}) => {
  const columns = [
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
    { field: "addedDate", headerName: "Added Date", width: 150 },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [medicineList, setMedicineList] = useState([]);

  useEffect(() => {
    fetchMedicineInventory(setMedicineList, setIsLoading);
  }, []);

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
    </Fragment>
  );
};

export default InventoryDashboard;
