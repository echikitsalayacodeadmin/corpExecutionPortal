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
  console.log({ totalRevenue, sumOfCost });
  const totalMarginPercent = Math.floor(
    ((totalRevenue - sumOfCost) / totalRevenue) * 100
  );

  return {
    ...dialogData,
    testList: updatedTestList,
    finalPrice: updatedTotalCost || "",
    pricePerEmp: pricePerEmp || "",
    totalMarginPercent: totalMarginPercent || "",
  };
};

const PackageModalAhc = ({
  open,
  handleClose,
  dialogData,
  formValues,
  setFormValues,
  itemList,
  setDialogData,
  packageIndex,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const [openTestModal, setOpenTestModal] = useState(false);
  const handleOpenTestModal = () => {
    setOpenTestModal(true);
  };
  const handleCloseTestModal = () => {
    setOpenTestModal(false);
  };

  const handleRecalculateDialogData = () => {
    setDialogData((dialogData) => {
      const updatedData = calculateTestListRowFields(dialogData);
      return {
        ...dialogData,
        ...updatedData,
      };
    });
  };

  const [formData, setFormData] = useState({
    testName: "",
    description: "",
    bestPrice: "",
    quotationDataType: "AHC",
    sequence: formValues?.ahc?.[tableIndex]?.tableData?.length + 1 || "",
    throwAwayPrice: "",
    quotePrice: "",
    revenue: "",
    marginPercent: "",
    marginPercentTAP: "",
    noOfEmp: "",
    isEdit: false,
    editingId: "",
  });

  const handleAddTests = () => {
    const newRow = {
      id: generateRandomId(itemList),
      ...formData,
      isNew: true,
    };

    setDialogData({
      ...dialogData,
      testList: [...dialogData?.testList, newRow],
    });

    handleCloseTestModal();
    setFormData({
      testName: "",
      description: "",
      bestPrice: "",
      quotationDataType: "AHC",
      sequence: "",
      throwAwayPrice: "",
      quotePrice: "",
      revenue: "",
      marginPercent: "",
      marginPercentTAP: "",
      noOfEmp: "",
      isEdit: false,
      editingId: "",
    });
    handleRecalculateDialogData();
  };

  const handleEditClick = (id, row) => () => {
    setFormData({
      id: row.id,
      testName: row.testName,
      description: row.description,
      bestPrice: row.bestPrice,
      quotationDataType: "AHC",
      sequence: row.sno,
      throwAwayPrice: row.throwAwayPrice,
      quotePrice: row.quotePrice,
      revenue: row.revenue,
      marginPercent: row.marginPercent,
      marginPercentTAP: row.marginPercentTAP,
      noOfEmp: row.noOfEmp,
      isEdit: true,
      editingId: id,
    });
    handleOpenTestModal();
  };

  const handleSaveClick = (id) => {
    const updatedRows = dialogData?.testList?.map((row) => {
      if (row.id === id) {
        return {
          id: formData.editingId,
          testName: formData.testName,
          description: formData.description,
          bestPrice: formData.bestPrice,
          quotationDataType: "AHC",
          sequence: formData.sequence,
          throwAwayPrice: formData.throwAwayPrice,
          quotePrice: formData.quotePrice,
          revenue: formData.revenue,
          marginPercent: formData.marginPercent,
          marginPercentTAP: formData.marginPercentTAP,
          noOfEmp: formData.noOfEmp,
        };
      }
      return row;
    });

    setDialogData({ ...dialogData, testList: updatedRows });

    handleCloseTestModal();
    setFormData({
      testName: "",
      description: "",
      bestPrice: "",
      quotationDataType: "AHC",
      sequence: "",
      throwAwayPrice: "",
      quotePrice: "",
      revenue: "",
      marginPercent: "",
      marginPercentTAP: "",
      noOfEmp: "",
      isEdit: false,
      editingId: "",
    });
    handleRecalculateDialogData();
  };

  const handleDeleteClick = (id) => () => {
    const updatedRows = dialogData?.testList?.filter((row) => row.id !== id);
    console.log({ updatedRows });
    setDialogData({ ...dialogData, testList: updatedRows });
    handleRecalculateDialogData();
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
      field: "sno",
      headerName: "#",
      width: 40,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    { field: "testName", headerName: "Test Name", width: 170, editable: true },

    {
      field: "throwAwayPrice",
      type: "number",
      headerName: "Throw Away Price",
      align: "center",
      headerAlign: "center",
      width: 150,
      editable: true,
    },
    {
      field: "bestPrice",
      type: "number",
      headerName: "Best Price",
      align: "center",
      headerAlign: "center",
      width: 100,
      editable: true,
    },
    {
      field: "quotePrice",
      type: "number",
      headerName: "Quote Price",
      align: "center",
      headerAlign: "center",
      width: 100,
      editable: true,
    },
    {
      field: "noOfEmp",
      type: "number",
      headerName: "#Emp",
      align: "center",
      headerAlign: "center",
      width: 100,
      editable: true,
    },
    {
      field: "revenue",
      type: "number",
      headerName: "Revenue",
      align: "center",
      headerAlign: "center",
      width: 100,
      editable: true,
    },
    {
      field: "marginPercentTAP",
      type: "number",
      headerName: "Margin % TAP",
      align: "center",
      headerAlign: "center",
      width: 120,
      editable: true,
    },
    {
      field: "marginPercent",
      type: "number",
      headerName: "Margin %",
      align: "center",
      headerAlign: "center",
      width: 120,
      editable: true,
    },
  ];

  console.log({ dialogData, formValues });

  return (
    <Fragment>
      <Portal>
        <Dialog maxWidth={false} open={open} onClose={handleClose}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Package Name"
                  fullWidth
                  placeholder="Package Name"
                  size="small"
                  value={dialogData.packageName}
                  onChange={(e) => {
                    setDialogData({
                      ...dialogData,
                      packageName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="#Employees"
                  fullWidth
                  placeholder="#Employees"
                  size="small"
                  value={dialogData.noOfEmp || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDialogData((prevData) => ({
                      ...prevData,
                      noOfEmp: value,
                      testList: prevData.testList.map((item) => ({
                        ...item,
                        noOfEmp: parseInt(value) || "",
                        revenue:
                          Math.floor(
                            parseFloat(value) * parseFloat(item.quotePrice)
                          ) || "",
                        marginPercent:
                          Math.floor(
                            ((parseFloat(item.quotePrice) -
                              parseFloat(item.bestPrice)) /
                              parseFloat(item.quotePrice)) *
                              100
                          ) || "",
                      })),
                      finalPrice: prevData.pricePerEmp
                        ? Math.floor(
                            parseInt(value) * parseInt(prevData.pricePerEmp)
                          ) || ""
                        : "",
                    }));
                    handleRecalculateDialogData();
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Price Per Employees"
                  fullWidth
                  placeholder="Price Per Employees"
                  size="small"
                  value={dialogData.pricePerEmp}
                  onChange={(e) => {
                    const totalQuotePrice = dialogData?.testList?.reduce(
                      (total, test) => total + parseInt(test.quotePrice || 0),
                      0
                    );
                    setDialogData((prevData) => ({
                      ...prevData,
                      pricePerEmp: totalQuotePrice || e.target.value,
                      finalPrice:
                        Math.floor(
                          parseInt(dialogData.noOfEmp) *
                            parseInt(totalQuotePrice)
                        ) || "",
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Total Cost"
                  fullWidth
                  placeholder="Total Cost"
                  size="small"
                  value={dialogData.finalPrice}
                  onChange={(e) => {
                    setDialogData({
                      ...dialogData,
                      finalPrice: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>

            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              onClick={() => {
                handleOpenTestModal();
              }}
            >
              Add Tests
            </Button>
            <CustomDataGridLayout
              columns={columns}
              rows={dialogData?.testList}
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
                    setFormValues((prevState) => {
                      return {
                        ...prevState,
                        quotationTableDataVMS:
                          prevState.quotationTableDataVMS.map((tableData) => {
                            return {
                              ...tableData,
                              quotationDataVMS: [
                                ...tableData.quotationDataVMS,
                                dialogData,
                              ],
                            };
                          }),
                      };
                    });
                    setDialogData({
                      id: "",
                      packageName: "",
                      noOfEmp: 0,
                      finalPrice: 0,
                      pricePerEmp: 0,
                      totalMarginPercent: 0,
                      quotationDataType: "AHC",
                      testList: [],
                    });
                    handleClose();
                    setFormValues((formValues) => ({
                      ...formValues,
                      quotationTableDataVMS: [
                        {
                          ...formValues.quotationTableDataVMS[0],
                          quotationDataVMS:
                            formValues.quotationTableDataVMS[0].quotationDataVMS?.map(
                              (item) => calculateTestListRowFields(item)
                            ),
                        },
                      ],
                    }));
                  } else {
                    setFormValues((prevState) => {
                      return {
                        ...prevState,
                        quotationTableDataVMS:
                          prevState.quotationTableDataVMS.map((tableData) => {
                            return {
                              ...tableData,
                              quotationDataVMS: tableData.quotationDataVMS.map(
                                (data) => {
                                  if (data.id === dialogData.id) {
                                    return dialogData;
                                  }
                                  return data;
                                }
                              ),
                            };
                          }),
                      };
                    });
                    setDialogData({
                      id: "",
                      packageName: "",
                      noOfEmp: 0,
                      finalPrice: 0,
                      pricePerEmp: 0,
                      totalMarginPercent: 0,
                      quotationDataType: "AHC",
                      testList: [],
                    });
                    handleClose();
                    setFormValues((formValues) => ({
                      ...formValues,
                      quotationTableDataVMS: [
                        {
                          ...formValues.quotationTableDataVMS[0],
                          quotationDataVMS:
                            formValues.quotationTableDataVMS[0].quotationDataVMS?.map(
                              (item) => calculateTestListRowFields(item)
                            ),
                        },
                      ],
                    }));
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
                  label="Test Name"
                  fullWidth
                  placeholder="Test Name"
                  size="small"
                  value={formData.testName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, testName: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  label="Throw Away Price"
                  fullWidth
                  placeholder="Throw Away Price"
                  size="small"
                  value={formData.throwAwayPrice || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, throwAwayPrice: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Best Price"
                  fullWidth
                  placeholder="Best Price"
                  size="small"
                  value={formData.bestPrice || ""}
                  onChange={(e) => {
                    if (formData.quotePrice !== "") {
                      setFormData({
                        ...formData,
                        bestPrice: e.target.value,
                        marginPercent: Math.floor(
                          ((parseFloat(formData.quotePrice) -
                            parseFloat(e.target.value)) /
                            parseFloat(formData.quotePrice)) *
                            100
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        bestPrice: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Quote Price"
                  fullWidth
                  placeholder="Quote Price"
                  size="small"
                  value={formData.quotePrice || ""}
                  onChange={(e) => {
                    if (formData.noOfEmp !== "" || formData.bestPrice !== "") {
                      setFormData({
                        ...formData,
                        quotePrice: e.target.value,
                        revenue: Math.floor(
                          parseFloat(e.target.value) *
                            parseFloat(formData.noOfEmp)
                        ),
                        marginPercent: Math.floor(
                          ((parseFloat(e.target.value) -
                            parseFloat(formData.bestPrice)) /
                            parseFloat(e.target.value)) *
                            100
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        quotePrice: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="#Emp"
                  fullWidth
                  placeholder="#Emp"
                  size="small"
                  value={formData.noOfEmp || ""}
                  onChange={(e) => {
                    if (formData.quotePrice !== "") {
                      setFormData({
                        ...formData,
                        noOfEmp: e.target.value,
                        revenue: Math.floor(
                          parseFloat(e.target.value) *
                            parseFloat(formData.quotePrice)
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        noOfEmp: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Revenue"
                  fullWidth
                  placeholder="Revenue"
                  size="small"
                  value={formData.revenue || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  label="Margin%"
                  fullWidth
                  placeholder="Margin%"
                  size="small"
                  value={formData.marginPercent || ""}
                  disabled
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
      <Portal>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>No</Button>
            <Button onClick={() => {}} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </Fragment>
  );
};

export default PackageModalAhc;
