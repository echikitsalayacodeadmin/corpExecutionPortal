import React, { Fragment, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { saveData } from "../../../assets/corpServices";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import ParseCSV from "../../../../assets/parseCSV";

const UploadInventory = ({ rows = [] }) => {
  const columns = [
    { field: "productCode", headerName: "Product Code", width: 150 },
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "brand", headerName: "Brand Name", width: 150 },
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
  return (
    <Fragment>
      <Box>
        <CustomDataGridLayout
          disableRowSelectionOnClick={true}
          disableSelectionOnClick={true}
          checkboxSelection={false}
          hideFooterPagination={false}
          rowHeight={30}
          columns={columns}
          rows={rows}
          Gridheight={"55vh"}
        />
      </Box>
    </Fragment>
  );
};

export default UploadInventory;
