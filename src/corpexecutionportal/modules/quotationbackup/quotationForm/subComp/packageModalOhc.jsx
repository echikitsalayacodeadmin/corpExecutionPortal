import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Portal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { Fragment, useState } from "react";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import CustomDataGridLayout from "../../../../../assets/globalDataGridLayout/customDataGridLayout";
import { generateRandomId } from "../../../../../assets/utils";

const calculateTestListRowFields = (dialogData) => {
  const pricePerEmp = dialogData?.testList.reduce(
    (total, test) => total + parseInt(test.quotePrice || 0),
    0
  );

  const totalCost = Math.floor(
    parseInt(dialogData.noOfEmp) * parseInt(pricePerEmp)
  );

  const updatedTestList = dialogData.testList.map((testItem) => {
    const noOfEmp = parseInt(testItem.noOfEmp);
    const throwAwayPrice = parseInt(testItem.throwAwayPrice);
    const bestPrice = parseInt(testItem.bestPrice);
    const quotePrice = parseInt(testItem.quotePrice);
    const revenue = isNaN(noOfEmp) ? 0 : Math.floor(quotePrice * noOfEmp);
    const marginPercent =
      isNaN(quotePrice) || isNaN(bestPrice)
        ? 0
        : Math.floor(((quotePrice - bestPrice) / quotePrice) * 100);
    return {
      ...testItem,
      noOfEmp,
      throwAwayPrice,
      bestPrice,
      quotePrice,
      revenue,
      marginPercent,
    };
  });

  const updatedTotalCost = Math.floor(
    parseInt(dialogData.noOfEmp) * parseInt(pricePerEmp)
  );

  return {
    ...dialogData,
    testList: updatedTestList,
    finalPrice: updatedTotalCost || "",
    pricePerEmp,
  };
};
const PackageModalOhc = ({
  open,
  handleClose,
  dialogData,
  formValues,
  setFormValues,
  itemList,
  setDialogData,
  packageIndex,
}) => {
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

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },

    {
      field: "packageTitle",
      headerName: "Package Title",
      align: "center",
      headerAlign: "center",
      width: 260,
      editable: true,
    },
    {
      field: "packageName",
      headerName: "Package Name",
      align: "center",
      headerAlign: "center",
      width: 240,
      editable: true,
    },
    {
      field: "packageDescription",

      headerName: "Package Description",
      align: "center",
      headerAlign: "center",
      width: 230,
      editable: true,
    },
    {
      field: "noOfStaff",
      type: "number",
      headerName: "No Of Staff",
      align: "center",
      headerAlign: "center",
      width: 100,
      editable: true,
    },
    {
      field: "perMonthCost",
      type: "number",
      headerName: "#Per Month Cost",
      align: "center",
      headerAlign: "center",
      width: 140,
      editable: true,
    },

    {
      field: "totalCostPerMonth",
      type: "number",
      headerName: "Total Cost / Month",
      align: "center",
      headerAlign: "center",
      width: 180,
      editable: true,
    },
  ];

  console.log({ formValues, dialogData });

  return (
    <Fragment>
      <Portal>
        <Dialog maxWidth={false} open={open} onClose={handleClose}>
          <DialogContent>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => {
                handleOpenTestModal();
              }}
            >
              Add Tests
            </Button>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Category Title"
                  fullWidth
                  placeholder="Category Title"
                  size="small"
                  value={dialogData.categoryTitle || ""}
                  onChange={(e) =>
                    setDialogData({
                      ...dialogData,
                      categoryTitle: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>

            <CustomDataGridLayout
              columns={columns}
              rows={dialogData?.ohcPackageVMS}
              rowHeight={40}
              Gridheight={"100%"}
              getRowId={(row) => row?.id}
              checkboxSelection={false}
              disableRowSelectionOnClick={true}
              slots={null}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomButtonBlue
                title={dialogData.isEdit === false ? "Add" : "Update"}
                onClick={() => {
                  if (dialogData.isEdit === false) {
                    console.log({ dialogDataBeforeAdding: dialogData });
                    setFormValues({
                      ...formValues,
                      ohcVM: {
                        ...formValues.ohcVM,
                        categoryTitle: dialogData?.categoryTitle,
                        ohcCategoryVMS: [
                          ...formValues.ohcVM.ohcCategoryVMS,
                          dialogData,
                        ],
                      },
                    });
                    setDialogData({
                      id: "",
                      categoryTitle: "",
                      sequence: "",
                      ohcPackageVMS: [],
                    });
                    handleClose();
                  } else {
                    setFormValues({
                      ...formValues,
                      ohcVM: {
                        ...formValues.ohcVM,
                        categoryTitle: dialogData?.categoryTitle,
                        ohcCategoryVMS: formValues.ohcVM.ohcCategoryVMS.map(
                          (item, index) =>
                            index === packageIndex ? dialogData : item
                        ),
                      },
                    });
                    setDialogData({
                      id: "",
                      categoryTitle: "",
                      sequence: "",
                      ohcPackageVMS: [],
                    });

                    handleClose();
                  }
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Portal>
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
                  label="Package Title"
                  fullWidth
                  placeholder="Package Title"
                  size="small"
                  value={formData.packageTitle || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, packageTitle: e.target.value })
                  }
                />
              </Grid>
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
                  label="#Total Cost Per Month"
                  fullWidth
                  placeholder="#Total Cost Per Month"
                  size="small"
                  value={formData.totalCostPerMonth || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      totalCostPerMonth: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default PackageModalOhc;
