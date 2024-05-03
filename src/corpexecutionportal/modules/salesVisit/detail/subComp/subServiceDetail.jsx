import {
  Box,
  Grid,
  IconButton,
  Modal,
  Portal,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTypographyBold } from "../../../../assets/customTypography";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import CustomDataGridLayout from "../../../../assets/globalDataGridLayout/customDataGridLayout";
import GlobalDateLayout from "../../../../assets/globalDateLayout/globalDateLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { BASE_URL } from "../../../../assets/constants";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const SubServiceDetail = ({ openModal, setOpenModal, selectedRow }) => {
  const { itemId } = useParams();
  const corpId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [openSubModal, setOpenSubModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [moreInfoObject, setMoreInfoObject] = useState({
    id: "",
    required: "",
    lastPlayer: "",
    existingAmmount: "",
    dueDate: new Date()?.toISOString().split("T")[0],
    comments: "",
    isEdit: false,
  });

  const columns = [
    {
      field: "required",
      headerName: "Required",
      width: 200,
      editable: true,
    },
    {
      field: "lastPlayer",
      headerName: "Last Player",
      width: 200,
      editable: true,
    },
    {
      field: "existingAmmount",
      headerName: "Existing Amount",
      width: 200,
      editable: true,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 200,
      editable: true,
    },
    {
      field: "comments",
      headerName: "Comments",
      width: 200,
      editable: true,
    },
    {
      field: "deleteRow",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Box sx={{ display: "flex" }}>
            <IconButton
              sx={{ marginRight: "10px" }}
              onClick={() => {
                const updatedRows = rows.filter((row) => row.id !== id);
                setRows(updatedRows);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenSubModal(true);
                setMoreInfoObject({
                  id: params.row.id,
                  required: params.row.required,
                  lastPlayer: params.row.lastPlayer,
                  existingAmmount: params.row.existingAmmount,
                  dueDate: params.row.dueDate
                    ? new Date(params.row.dueDate)?.toISOString().split("T")[0]
                    : null,
                  comments: params.row.comments,
                  isEdit: true,
                });
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleSave = async () => {
    const obj = {
      status: "INTERESTED",
      servicesInfoVM: {
        required: "",
        lastPlayer: "string",
        lastAmount: 0.0,
        dueDate: "2024-05-02",
        comments: "string",
      },
    };
    const url =
      BASE_URL +
      `corpSales/service/info?corpId=${corpId}&serviceName=${selectedRow?.testName}`;
    const result = await saveData(url, obj);
    if (result.data) {
      enqueueSnackbar("Saved Successfully", { variant: "success" });
    } else {
      enqueueSnackbar("An Error Occured", { variant: "error" });
    }
  };

  return (
    <Fragment>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openModal}
          onClose={() => setOpenModal(false)}
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
              width: "90%",
              minHeight: "70vh",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: "-30px" }}>
              <CustomTypographyBold>
                {selectedRow?.testName}
              </CustomTypographyBold>
            </Box>

            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              spacing={2}
            >
              <Grid item xs={12} lg={12}>
                <CustomButtonBlue
                  title="Add New Row"
                  onClick={() => {
                    setOpenSubModal(true);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <CustomDataGridLayout
                  rows={rows}
                  columns={columns}
                  disableRowSelectionOnClick={true}
                  disableSelectionOnClick={true}
                  checkboxSelection={true}
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openSubModal}
          onClose={() => {
            setOpenSubModal(false);
            setMoreInfoObject({
              id: "",
              required: "",
              lastPlayer: "",
              existingAmmount: "",
              dueDate: new Date()?.toISOString().split("T")[0],
              comments: "",
              isEdit: false,
            });
          }}
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
              minHeight: "70vh",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => {
                  setOpenSubModal(false);
                  setMoreInfoObject({
                    id: "",
                    required: "",
                    lastPlayer: "",
                    existingAmmount: "",
                    dueDate: new Date()?.toISOString().split("T")[0],
                    comments: "",
                    isEdit: false,
                  });
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ textAlign: "center", marginTop: "-30px" }}>
              <CustomTypographyBold>
                {selectedRow?.testName}
              </CustomTypographyBold>
            </Box>

            <Grid
              container
              sx={{ justifyContent: "space-between" }}
              spacing={2}
            >
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  size="small"
                  label={
                    selectedRow.modalType === "1"
                      ? "#Required"
                      : selectedRow.modalType === "2"
                      ? "#Doctors"
                      : selectedRow.modalType === "3"
                      ? "Paramedical Staff"
                      : null
                  }
                  placeholder={
                    selectedRow.modalType === "1"
                      ? "#Required"
                      : selectedRow.modalType === "2"
                      ? "#Doctors"
                      : selectedRow.modalType === "3"
                      ? "Paramedical Staff"
                      : null
                  }
                  value={moreInfoObject.required}
                  onChange={(e) => {
                    setMoreInfoObject({
                      ...moreInfoObject,
                      required: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Last Player"
                  placeholder="Last Player"
                  value={moreInfoObject.lastPlayer}
                  onChange={(e) => {
                    setMoreInfoObject({
                      ...moreInfoObject,
                      lastPlayer: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Existing Amount"
                  placeholder="Existing Amount"
                  value={moreInfoObject.existingAmmount}
                  onChange={(e) => {
                    setMoreInfoObject({
                      ...moreInfoObject,
                      existingAmmount: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <GlobalDateLayout
                  label={"Due Date"}
                  initialDate={moreInfoObject.dueDate}
                  formValues={moreInfoObject}
                  setFormValues={setMoreInfoObject}
                  property="dueDate"
                  disableFuture={true}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  multiline
                  maxRows={5}
                  fullWidth
                  size="small"
                  label="Comments"
                  placeholder="Comments"
                  value={moreInfoObject.comments}
                  onChange={(e) => {
                    setMoreInfoObject({
                      ...moreInfoObject,
                      comments: e.target.value,
                    });
                  }}
                  inputProps={{
                    style: {
                      minHeight: "130px",
                    },
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
                  title="Add"
                  onClick={() => {
                    if (moreInfoObject.isEdit === false) {
                      const newRow = { ...moreInfoObject, id: rows.length + 1 };
                      setRows([...rows, newRow]);
                      setOpenSubModal(false);
                      setMoreInfoObject({
                        id: "",
                        required: "",
                        lastPlayer: "",
                        existingAmmount: "",
                        dueDate: new Date()?.toISOString().split("T")[0],
                        comments: "",
                        isEdit: false,
                      });
                    } else if (moreInfoObject.isEdit === true) {
                      const updatedRows = rows.map((row) =>
                        row.id === moreInfoObject.id
                          ? { ...moreInfoObject }
                          : row
                      );
                      setRows(updatedRows);
                      setOpenSubModal(false);
                      setMoreInfoObject({
                        id: "",
                        required: "",
                        lastPlayer: "",
                        existingAmmount: "",
                        dueDate: new Date()?.toISOString().split("T")[0],
                        comments: "",
                        isEdit: false,
                      });
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

export default SubServiceDetail;
