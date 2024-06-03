import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Portal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PackageModalAhc from "./packageModalAhc";
import { useFileUpload } from "use-file-upload";
import { useSnackbar } from "notistack";
import { fetchItemListNew2 } from "../../../../services/quotationServices";

const calculateTestListRowFields = (dialogData) => {
  const pricePerEmp = dialogData?.testList?.reduce(
    (total, test) => total + parseInt(test?.quotePrice || 0),
    0
  );

  const totalCost = Math.floor(
    parseInt(dialogData?.noOfEmp) * parseInt(pricePerEmp)
  );

  const updatedTestList = dialogData?.testList?.map((testItem) => {
    const noOfEmp = parseInt(testItem?.noOfEmp) || "";
    const throwAwayPrice = parseInt(testItem?.throwAwayPrice) || "";
    const bestPrice = parseInt(testItem?.bestPrice) || "";
    const quotePrice = parseInt(testItem?.quotePrice) || "";
    const revenue = isNaN(noOfEmp) ? 0 : Math.floor(quotePrice * noOfEmp) || "";
    const marginPercent =
      isNaN(quotePrice) || isNaN(bestPrice)
        ? 0
        : Math.floor(((quotePrice - bestPrice) / quotePrice) * 100);
    const marginPercentTAP =
      isNaN(quotePrice) || isNaN(bestPrice)
        ? 0
        : Math.floor(((throwAwayPrice - bestPrice) / throwAwayPrice) * 100);

    return {
      ...testItem,
      noOfEmp,
      throwAwayPrice,
      bestPrice,
      quotePrice,
      revenue,
      marginPercent,
      marginPercentTAP,
    };
  });

  const updatedTotalCost = Math.floor(
    parseInt(dialogData?.noOfEmp) * parseInt(pricePerEmp)
  );
  const totalRevenue = updatedTestList?.reduce(
    (total, testItem) => total + testItem?.revenue,
    0
  );
  const sumOfCost = updatedTestList?.reduce(
    (total, testItem) => total + testItem?.noOfEmp * testItem?.bestPrice,
    0
  );
  const totalMarginPercent =
    totalRevenue === 0
      ? 0
      : Math.floor(((totalRevenue - sumOfCost) / totalRevenue) * 100);

  return {
    ...dialogData,
    testList: updatedTestList,
    finalPrice: updatedTotalCost || "",
    pricePerEmp,
    totalMarginPercent,
  };
};

const tableHeader = [
  {
    columnName: "Actions",
  },
  {
    columnName: "S.No",
  },
  {
    columnName: "Package Name",
  },
  {
    columnName: "Test List",
  },
  {
    columnName: "#Emp",
  },
  {
    columnName: "Price Per Employee",
  },
  {
    columnName: "Total Cost/Revenue",
  },
  {
    columnName: "Total Margin %",
  },
];

const bullet = "\u2022";
const bulletWithSpace = `${bullet} `;
const enter = 13;

const handleInput = (event, formValues, setFormValues) => {
  const { target } = event;
  let { value, selectionStart, selectionEnd } = target;

  // Insert bullet point if the input doesn't start with it
  if (value.indexOf(bullet) !== 0) {
    value = `${bulletWithSpace}${value}`;
    selectionStart += bulletWithSpace.length;
    selectionEnd += bulletWithSpace.length;
  }

  // Handle Enter key press
  if (event.keyCode === enter) {
    event.preventDefault();
    value = `${value.substring(
      0,
      selectionStart
    )}\n${bulletWithSpace}${value.substring(selectionEnd)}`;
    selectionStart = selectionEnd += bulletWithSpace.length + 1;
  }

  // Update TextField value and selection
  target.value = value;
  target.setSelectionRange(selectionStart, selectionEnd);

  // Update formValues state
  const updatedFormValues = { ...formValues };
  const ahcDataIndex = formValues.quotationTableDataVMS?.findIndex(
    (quote) => quote.quotationDataType === "AHC"
  );
  if (ahcDataIndex !== -1) {
    updatedFormValues.quotationTableDataVMS[ahcDataIndex].disclaimer = value;
    setFormValues(updatedFormValues);
  }
};

const Ahc = ({ handleUpload, formValues, setFormValues }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [files, selectFiles] = useFileUpload();
  const [useTable, setUseTable] = useState(true);
  const [useUploadImage, setUseUploadImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState("");
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const [itemList, setItemlist] = useState([]);
  const [packageIndex, setPackageIndex] = useState("");
  const [dialogData, setDialogData] = useState({
    id: "",
    packageName: "",
    noOfEmp: "",
    finalPrice: "",
    pricePerEmp: "",
    totalMarginPercent: "",
    quotationDataType: "AHC",
    testList: [],
    isEdit: false,
  });
  useEffect(() => {
    fetchItemListNew2(setItemlist, setFormValues);
    const isTableVisible =
      formValues?.quotationTableDataVMS[0].tableUrl === null ||
      formValues?.quotationTableDataVMS[0].tableUrl === ""
        ? true
        : false;
    if (isTableVisible === true) {
      setUseTable(true);
      setUseUploadImage(false);
    } else {
      setUseTable(false);
      setUseUploadImage(true);
    }
    handleRecalculateDialogData();
  }, []);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    handleRecalculateDialogData();
  };

  const handleRecalculateDialogData = () => {
    setFormValues((dialogData) => {
      const updatedData = calculateTestListRowFields(dialogData);
      return {
        ...dialogData,
        ...updatedData,
      };
    });
  };

  return (
    <Fragment>
      <TableContainer component={Paper} style={{ padding: "10px" }}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "600", marginBlock: "10px" }}
        >
          AHC SECTION
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <TextField
              multiline
              minRows={4}
              label="#Enter Paragraph"
              variant="outlined"
              fullWidth
              placeholder="#Enter Paragraph"
              size="small"
              value={
                formValues?.quotationTableDataVMS?.filter(
                  (quote) => quote?.quotationDataType === "AHC"
                )[0]?.details || ""
              }
              onChange={(e) => {
                const updatedFormValues = { ...formValues };
                const ahcDataIndex =
                  formValues?.quotationTableDataVMS?.findIndex(
                    (quote) => quote.quotationDataType === "AHC"
                  );
                if (ahcDataIndex !== -1) {
                  updatedFormValues.quotationTableDataVMS[
                    ahcDataIndex
                  ].details = e.target.value;
                  setFormValues(updatedFormValues);
                }
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <Button
              onClick={() => {
                setOpen(true);
                setDialogData({
                  ...dialogData,
                  id: formValues?.quotationTableDataVMS?.filter(
                    (quote) => quote.quotationDataType === "AHC"
                  )[0]?.quotationDataVMS?.length,
                  packageName: "",
                  noOfEmp: "",
                  finalPrice: "",
                  pricePerEmp: "",
                  totalMarginPercent: "",
                  quotationDataType: "AHC",
                  testList: itemList.map((item) => ({
                    ...item,
                    marginPercentTAP: "",
                  })),
                  isEdit: false,
                });
              }}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Row
            </Button>
          </Grid>
          <Grid item xs={12} lg={10}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useTable}
                  onChange={(event) => {
                    setUseUploadImage(false);
                    setUseTable(event.target.checked);
                  }}
                />
              }
              label="Table"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={useUploadImage}
                  onChange={(event) => {
                    setUseUploadImage(event.target.checked);
                    setUseTable(false);
                  }}
                />
              }
              label="Upload Image"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formValues?.quotationTableDataVMS?.filter(
                      (quote) => quote.quotationDataType === "AHC"
                    )[0]?.isAHCTableNextPage
                  }
                  onChange={(event) => {
                    setFormValues({
                      ...formValues,
                      quotationTableDataVMS:
                        formValues.quotationTableDataVMS.map((quote) =>
                          quote.quotationDataType === "AHC"
                            ? {
                                ...quote,
                                isAHCTableNextPage: event.target.checked,
                              }
                            : quote
                        ),
                    });
                  }}
                />
              }
              label="Set AHC Table in Next Page"
            />
          </Grid>
          <Grid item xs={12} lg={10}>
            <TextField
              label="Table Title"
              fullWidth
              placeholder="Table Tile"
              size="small"
              value={
                formValues?.quotationTableDataVMS?.filter(
                  (quote) => quote.quotationDataType === "AHC"
                )[0]?.tableTitle
              }
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  quotationTableDataVMS: formValues.quotationTableDataVMS.map(
                    (quote) =>
                      quote.quotationDataType === "AHC"
                        ? { ...quote, tableTitle: e.target.value }
                        : quote
                  ),
                });
              }}
            />
          </Grid>
        </Grid>
        {useTable && (
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeader?.map((item, index) => (
                  <TableCell key={index}>{item.columnName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {formValues.quotationTableDataVMS
                ?.filter((quote) => quote.quotationDataType === "AHC")[0]
                ?.quotationDataVMS?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          setDialogData({
                            id: row.id,
                            packageName: row.packageName,
                            noOfEmp: row.noOfEmp,
                            finalPrice: row.finalPrice,
                            pricePerEmp: row.pricePerEmp,
                            quotationDataType: "AHC",
                            testList: row.testList,
                            isEdit: true,
                          });
                          setPackageIndex(rowIndex);
                        }}
                      >
                        <EditIcon
                          style={{
                            color: "#000",
                            height: "20px",
                            width: "20px",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleOpenDelete();
                          setDeleteModalData({ rowIndex: rowIndex });
                        }}
                      >
                        <DeleteIcon
                          style={{
                            color: "#000",
                            height: "20px",
                            width: "20px",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {rowIndex + 1}
                    </TableCell>
                    <TableCell>{row.packageName}</TableCell>
                    <TableCell>
                      {row?.testList?.map((test, index) => (
                        <Typography key={index}>{test.testName}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>{row.noOfEmp}</TableCell>
                    <TableCell>{row.pricePerEmp}</TableCell>
                    <TableCell>{row.finalPrice}</TableCell>
                    <TableCell>{row.totalMarginPercent}</TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={tableHeader?.length - 1}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                    <Typography
                      sx={{ fontWeight: "bold", marginRight: "70px" }}
                    >
                      Rs{" "}
                      {formValues.quotationTableDataVMS
                        ?.filter(
                          (quote) => quote.quotationDataType === "AHC"
                        )[0]
                        ?.quotationDataVMS?.reduce(
                          (total, item) => total + item.finalPrice,
                          0
                        ) || ""}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={tableHeader?.length}>
                  <TextField
                    label="Disclaimer"
                    multiline
                    size="small"
                    value={
                      formValues?.quotationTableDataVMS?.filter(
                        (quote) => quote.quotationDataType === "AHC"
                      )[0]?.disclaimer || ""
                    }
                    onChange={(e) => handleInput(e, formValues, setFormValues)}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      onKeyDown: (e) =>
                        handleInput(e, formValues, setFormValues),
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        {useUploadImage && (
          <Fragment>
            {formValues.quotationTableDataVMS[0].tableUrl && (
              <Box style={{ height: "700px", width: "100px" }}>
                <img
                  src={formValues.quotationTableDataVMS[0].tableUrl}
                  alt="tableImage"
                  width={900}
                  height={700}
                  priority={true}
                />
              </Box>
            )}
            <Button
              onClick={() =>
                selectFiles({ accept: "*" }, ({ name, size, source, file }) => {
                  if (handleUpload) {
                    handleUpload(name, size, source, file, "AHC");
                  }
                })
              }
              sx={{ marginTop: "10px" }}
              variant="contained"
            >
              Upload Image
            </Button>
          </Fragment>
        )}
      </TableContainer>

      <PackageModalAhc
        open={open}
        handleClose={handleClose}
        formValues={formValues}
        dialogData={dialogData}
        setDialogData={setDialogData}
        setFormValues={setFormValues}
        itemList={itemList}
        packageIndex={packageIndex}
      />
      <Portal>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>No</Button>
            <Button
              onClick={() => {
                setFormValues((prevState) => {
                  const updatedTableData =
                    prevState?.quotationTableDataVMS?.map((tableData) => {
                      return {
                        ...tableData,
                        quotationDataVMS: tableData?.quotationDataVMS?.filter(
                          (_, index) => index !== deleteModalData?.rowIndex
                        ),
                      };
                    });

                  return {
                    ...prevState,
                    quotationTableDataVMS: updatedTableData,
                  };
                });
                handleCloseDelete();
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default Ahc;
