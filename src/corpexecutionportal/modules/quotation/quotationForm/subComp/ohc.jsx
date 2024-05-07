import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import React, { Fragment, useEffect, useState } from "react";
import OhcSelectCategory from "./ohcSelectCategory";
import PackageModalOhc from "./packageModalOhc";
import { useFileUpload } from "use-file-upload";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import { fetchItemListOhc2 } from "../../../../services/quotationServices";
import { generateRandomId } from "../../../../../assets/utils";

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
  setFormValues({
    ...formValues,
    ohcVM: {
      ...formValues.ohcVM,
      disclaimer: value,
    },
  });
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
    columnName: "Description",
  },
  {
    columnName: "#Emp",
  },
  {
    columnName: "Per Month Cost",
  },
  {
    columnName: "Total Cost/Month",
  },
];

const Ohc = ({ handleUpload, formValues, setFormValues }) => {
  const [files, selectFiles] = useFileUpload();
  const [useTable, setUseTable] = useState(true);
  const [useUploadImage, setUseUploadImage] = useState(false);
  const [itemList, setItemlist] = useState([]);
  const [packageIndex, setPackageIndex] = useState("");
  const [seletedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchItemListOhc2(setItemlist, setFormValues);
    const isTableVisible =
      formValues?.ohcVM?.ohcTableUrl === null ||
      formValues?.ohcVM?.ohcTableUrl === ""
        ? true
        : false;

    if (isTableVisible === true) {
      setUseTable(true);
      setUseUploadImage(false);
    } else {
      setUseTable(false);
      setUseUploadImage(true);
    }
  }, []);

  useEffect(() => {
    if (seletedCategory !== null) {
      setOpen(true);
      setDialogData({
        id: formValues?.ohcVM?.ohcCategoryVMS?.length,
        categoryTitle: seletedCategory,
        ohcPackageVMS: itemList
          .filter(
            (item) =>
              item.quotationDataType === "OHC" &&
              item.categoryTitle === seletedCategory
          )
          .map((item, index) => ({
            id: item.id,
            packageTitle: item.packageTitle,
            packageName: item.packageName,
            packageDescription: item.packageDescription,
            noOfStaff: item.noOfStaff,
            perMonthCost: item.perMonthCost,
            totalCostPerMonth: item.totalCostPerMonth,
          })),
        isEdit: false,
      });
      setSelectedCategory(null);
    }
  }, [seletedCategory]);

  const [dialogData, setDialogData] = useState({
    id: formValues?.ohcVM?.ohcCategoryVMS?.length,
    categoryTitle: "",
    sequence: "",
    ohcPackageVMS: [],
    isEdit: false,
  });

  const [formData, setFormData] = useState({
    quotationDataType: "OHC",
    sequence: "",
    categoryTitle: "",
    packageTitle: "",
    packageName: "",
    packageDescription: "",
    noOfStaff: "",
    perMonthCost: "",
    totalCostPerMonth: "",
    isEdit: false,
    editingId: "",
  });

  console.log({ OHCdialogData: dialogData });

  const [openTestModal, setOpenTestModal] = useState(false);
  const handleOpenTestModal = () => {
    setOpenTestModal(true);
  };
  const handleCloseTestModal = () => {
    setOpenTestModal(false);
  };

  const handleAddTests = () => {
    const newRow = {
      id: generateRandomId(itemList),
      ...formData,
      isNew: true,
    };

    console.log({ newRow });

    setDialogData({
      ...dialogData,
      ohcPackageVMS: [...dialogData?.ohcPackageVMS, newRow],
    });

    handleCloseTestModal();
    setFormData({
      quotationDataType: "OHC",
      sequence: "",
      categoryTitle: "",
      packageTitle: "",
      packageName: "",
      packageDescription: "",
      noOfStaff: "",
      perMonthCost: "",
      totalCostPerMonth: "",
      isEdit: false,
      editingId: "",
    });
  };

  const handleEditClick = (id, row) => () => {
    setFormData({
      id: row.id,
      quotationDataType: row.quotationDataType,
      sequence: row.sequence,
      categoryTitle: row.categoryTitle,
      packageTitle: row.packageTitle,
      packageName: row.packageName,
      packageDescription: row.packageDescription,
      noOfStaff: row.noOfStaff,
      perMonthCost: row.perMonthCost,
      totalCostPerMonth: row.totalCostPerMonth,
      isEdit: true,
      editingId: id,
    });
    handleOpenTestModal();
  };

  const handleSaveClick = (id) => {
    const updatedRows = dialogData?.ohcPackageVMS?.map((row) => {
      if (row.id === id) {
        return {
          id: formData.editingId,
          quotationDataType: formData.quotationDataType,
          sequence: formData.sequence,
          categoryTitle: formData.categoryTitle,
          packageTitle: formData.packageTitle,
          packageName: formData.packageName,
          packageDescription: formData.packageDescription,
          noOfStaff: formData.noOfStaff,
          perMonthCost: formData.perMonthCost,
          totalCostPerMonth: formData.totalCostPerMonth,
        };
      }

      return row;
    });
    console.log({ updatedRows });

    setDialogData({ ...dialogData, ohcPackageVMS: updatedRows });

    handleCloseTestModal();
    setFormData({
      quotationDataType: "OHC",
      sequence: "",
      categoryTitle: "",
      packageTitle: "",
      packageName: "",
      packageDescription: "",
      noOfStaff: "",
      perMonthCost: "",
      totalCostPerMonth: "",
      isEdit: false,
      editingId: "",
    });
  };

  const handleDeleteClick = (id) => () => {
    const updatedRows = dialogData?.ohcPackageVMS?.filter(
      (row) => row.id !== id
    );
    console.log({ updatedRows });

    setDialogData({ ...dialogData, ohcPackageVMS: updatedRows });
  };

  return (
    <Fragment>
      <TableContainer component={Paper} style={{ padding: "10px" }}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "600", marginBlock: "10px" }}
        >
          OHC SECTION
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
              value={formValues?.ohcVM?.details || ""}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  ohcVM: {
                    ...formValues.ohcVM,
                    details: e.target.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item lg={2}>
            <OhcSelectCategory setSelectedItem={setSelectedCategory} />
          </Grid>
          <Grid item lg={10}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={useTable}
                  onChange={(event) => {
                    setUseTable(event.target.checked);
                    setUseUploadImage(false);
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
                  checked={formValues?.ohcVM?.isOHCTableNextPage}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      ohcVM: {
                        ...formValues?.ohcVM,
                        isOHCTableNextPage: e.target.checked,
                      },
                    });
                  }}
                />
              }
              label="Set OHC Table in Next Page"
            />
          </Grid>
          <Grid item xs={12} lg={10}>
            <TextField
              label="Table Title"
              fullWidth
              placeholder="Table Tile"
              size="small"
              value={formValues?.ohcVM?.title}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  ohcVM: {
                    ...formValues.ohcVM,
                    title: e.target.value,
                  },
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
              {formValues?.ohcVM?.ohcCategoryVMS?.map((row, rowIndex) => (
                <Fragment key={rowIndex}>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          setDialogData({
                            id: row.id,
                            categoryTitle: row.categoryTitle,
                            ohcPackageVMS: row.ohcPackageVMS.map(
                              (item, index) => ({
                                id: item.id,
                                packageTitle: item.packageTitle,
                                packageName: item.packageName,
                                packageDescription: item.packageDescription,
                                noOfStaff: item.noOfStaff,
                                perMonthCost: item.perMonthCost,
                                totalCostPerMonth: item.totalCostPerMonth,
                              })
                            ),
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
                          const updatedCategoryVMS = [
                            ...formValues.ohcVM.ohcCategoryVMS,
                          ];
                          updatedCategoryVMS.splice(rowIndex, 1);
                          setFormValues((prevState) => ({
                            ...prevState,
                            ohcVM: {
                              ...prevState.ohcVM,
                              ohcCategoryVMS: updatedCategoryVMS,
                            },
                          }));
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
                    <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                      {row.categoryTitle}
                    </TableCell>
                  </TableRow>
                  {row.ohcPackageVMS.map((packageItem, packageItemIndex) => (
                    <Fragment key={packageItemIndex}>
                      {packageItem.packageTitle ? (
                        <TableRow>
                          <TableCell colSpan={tableHeader?.length}>
                            <Typography sx={{ textAlign: "center" }}>
                              {packageItem.packageTitle}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : null}

                      <TableRow key={packageItemIndex}>
                        <TableCell></TableCell>
                        <TableCell component="th" scope="row">
                          {packageItemIndex + 1}
                        </TableCell>
                        <TableCell>{packageItem.packageName}</TableCell>
                        <TableCell>{packageItem.packageDescription}</TableCell>
                        <TableCell>{packageItem.noOfStaff}</TableCell>
                        <TableCell>{packageItem.perMonthCost}</TableCell>
                        <TableCell>{packageItem.totalCostPerMonth}</TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </Fragment>
              ))}
              <TableRow>
                <TableCell colSpan={tableHeader?.length}>
                  <TextField
                    label="Disclaimer"
                    multiline
                    size="small"
                    value={formValues?.ohcVM?.disclaimer}
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
            {formValues?.ohcVM?.ohcTableUrl && (
              <Box style={{ height: "700px", width: "100px" }}>
                <Box
                  component={"img"}
                  src={formValues?.ohcVM?.ohcTableUrl}
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
                    handleUpload(name, size, source, file, "OHC");
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

      <PackageModalOhc
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
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openTestModal}
          onClose={handleCloseTestModal}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(187, 187, 187, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "15px",
              width: "365px",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleCloseTestModal}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "15px",
                color: "#000000",
                marginTop: "-25px",
                marginBottom: "10px",
              }}
            >
              Add Row
            </Typography>
            <Grid
              container
              sx={{ justifyContent: "space-between", marginTop: "20px" }}
              spacing={2}
            >
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Package Name"
                  fullWidth
                  placeholder="Package Name"
                  size="small"
                  value={formData.packageName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, packageName: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  label="Package Description"
                  fullWidth
                  placeholder="Package Description"
                  size="small"
                  value={formData.packageDescription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      packageDescription: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="noOfStaff"
                  fullWidth
                  placeholder="noOfStaff"
                  size="small"
                  value={formData.noOfStaff || ""}
                  onChange={(e) => {
                    if (formData.perMonthCost !== "") {
                      setFormData({
                        ...formData,
                        noOfStaff: e.target.value,
                        totalCostPerMonth:
                          Math.floor(
                            parseFloat(e.target.value) *
                              parseFloat(formData.perMonthCost)
                          ) || "",
                      });
                    } else {
                      setFormData({
                        ...formData,
                        noOfStaff: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Per Month Cost"
                  fullWidth
                  placeholder="Per Month Cost"
                  size="small"
                  value={formData.perMonthCost || ""}
                  onChange={(e) => {
                    if (formData.noOfStaff !== "") {
                      setFormData({
                        ...formData,
                        perMonthCost: e.target.value,
                        totalCostPerMonth:
                          Math.floor(
                            parseFloat(e.target.value) *
                              parseFloat(formData.noOfStaff)
                          ) || "",
                      });
                    } else {
                      setFormData({
                        ...formData,
                        perMonthCost: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  disabled
                  label="#Total Cost Per Month"
                  fullWidth
                  placeholder="#Total Cost Per Month"
                  size="small"
                  value={formData.totalCostPerMonth || ""}
                />
              </Grid>
            </Grid>
            <CustomButtonBlue
              title={formData.isEdit === false ? "Add Row" : "Update Row"}
              onClick={() => {
                if (formData.isEdit === false) {
                  handleAddTests();
                } else {
                  handleSaveClick(formData.editingId);
                }
              }}
            />
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default Ohc;
