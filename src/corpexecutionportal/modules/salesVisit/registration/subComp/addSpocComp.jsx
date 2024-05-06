import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Portal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import { isMobile } from "react-device-detect";

const AddSpocComp = ({ formValues, setFormValues, onlyView = false }) => {
  const [showSpocList, setShowSpocList] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const validateEmail = (email) => {
    if (email.trim() === "") {
      return true;
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };
  const [spocForm, setSpocForm] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    isDecisionMaker: "No",
  });
  const [open, setOpen] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);

  const handleOpen = (index) => {
    setOpen(true);
    if (index !== undefined) {
      setEditedIndex(index);
      setSpocForm(formValues.spocList[index]);
    } else {
      setSpocForm({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        isDecisionMaker: "No",
      });
      setEditedIndex(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditedIndex(null);
    setSpocForm({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      isDecisionMaker: "No",
    });
  };

  const handleFormSubmit = () => {
    if (editedIndex !== null) {
      const updatedSpocList = [...formValues.spocList];
      updatedSpocList[editedIndex] = spocForm;
      setFormValues({ ...formValues, spocList: updatedSpocList });
    } else {
      setFormValues({
        ...formValues,
        spocList: [...formValues.spocList, spocForm],
      });
    }
    setShowSpocList(true);
    handleClose();
  };

  const deleteSpoc = (index) => {
    const updatedSpocList = [...formValues.spocList];
    updatedSpocList.splice(index, 1);
    setFormValues({ ...formValues, spocList: updatedSpocList });
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              minWidth: "300px",
            }}
          >
            <Box
              sx={{
                p: 1,
                height: "40px",
                minWidth: "150px",
                border: "1px solid #000",
                borderRadius: "15px",
                backgroundColor: "#FFFFFF",
                textAlign: "center",
              }}
            >
              <Typography>Corp SPOC List</Typography>
            </Box>
            <IconButton
              sx={{
                height: "40px",
                marginRight: "15px",
                backgroundColor: "#127DDD",
                ":hover": {
                  backgroundColor: "#1f63a1",
                },
              }}
              onClick={() => {
                setShowSpocList(!showSpocList);
              }}
            >
              {showSpocList === false ? (
                <ExpandMoreIcon style={{ color: "#FFF" }} />
              ) : (
                <ExpandLessIcon style={{ color: "#FFF" }} />
              )}
            </IconButton>
            <CustomButtonBlue
              title="Add SPOC"
              onClick={() => {
                handleOpen();
              }}
              styles={{ width: "150px", height: "40px" }}
            />
          </Box>
        </Grid>
      </Grid>

      {showSpocList &&
        formValues?.spocList?.length > 0 &&
        formValues?.spocList?.map((spoc, index) => (
          <Grid
            key={index}
            container
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #777777",
              padding: "10px",
              borderRadius: "15px",
              marginBlock: "10px",
            }}
          >
            <Grid item xs={10} lg={10}>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                  <Typography sx={styles.heading}>Name -</Typography>
                  <Typography sx={styles.data}>{spoc.name}</Typography>
                </Grid>
                <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                  <Typography sx={styles.heading}>Mobile -</Typography>
                  <Typography sx={styles.data}>{spoc.mobile}</Typography>
                </Grid>
                <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                  <Typography sx={styles.heading}>Email Id -</Typography>
                  <Typography sx={styles.data}>{spoc.email}</Typography>
                </Grid>
                <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                  <Typography sx={styles.heading}>Designation -</Typography>
                  <Typography sx={styles.data}>{spoc.designation}</Typography>
                </Grid>
                <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
                  <Typography sx={styles.heading}>Decision Maker -</Typography>
                  <Typography sx={styles.data}>
                    {spoc.isDecisionMaker ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} lg={1} sx={{ textAlign: "end" }}>
              {onlyView === true ? null : (
                <IconButton onClick={() => deleteSpoc(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={1} lg={1} sx={{ textAlign: "end" }}>
              {onlyView === true ? null : (
                <IconButton onClick={() => handleOpen(index)}>
                  <EditIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
      {onlyView && (
        <Box sx={{ "& > :not(style)": { mb: 1 } }}>
          <Fab color="primary" variant="extended" onClick={() => handleOpen()}>
            <AddIcon sx={{ mr: 1 }} />
            Add New Spoc
          </Fab>
        </Box>
      )}

      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={handleClose}
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
              width: isMobile ? "365px" : "665px",
            }}
          >
            {/* <Box sx={{ minHeight: "130px" }}> */}
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={handleClose}>
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
              Add Spoc Detail
            </Typography>
            <Grid
              container
              sx={{ justifyContent: "space-between", marginTop: "20px" }}
              spacing={2}
            >
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    background: "#fff",
                  }}
                  label="Name"
                  size="small"
                  fullWidth
                  placeholder="Enter Name"
                  value={spocForm.name}
                  onChange={(e) =>
                    setSpocForm({ ...spocForm, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    background: "#fff",
                  }}
                  label="Mobile"
                  size="small"
                  fullWidth
                  placeholder="Enter Mobile"
                  value={spocForm.mobile}
                  onChange={(e) => {
                    if (!isNaN(e.target.value) && e.target.value.length < 11) {
                      setSpocForm({ ...spocForm, mobile: e.target.value });
                    }
                  }}
                  error={
                    spocForm.mobile
                      ? spocForm.mobile?.length === 10 ||
                        spocForm.mobile?.length === 0
                        ? false
                        : true
                      : null
                  }
                  helperText={
                    spocForm.mobile
                      ? spocForm.mobile?.length === 10 ||
                        spocForm.mobile?.length === 0
                        ? ""
                        : "Phone number should be 10 digit."
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  sx={{
                    background: "#fff",
                  }}
                  label="Email"
                  size="small"
                  fullWidth
                  placeholder="Enter Email"
                  value={spocForm.email}
                  onChange={(e) => {
                    const email = e.target.value;
                    setSpocForm({ ...spocForm, email: email });
                    setIsEmailValid(validateEmail(email));
                  }}
                  error={!isEmailValid ? true : false}
                  helperText={
                    !isEmailValid ? "Please Enter Valid Email Address" : ""
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Designation"
                  sx={{
                    background: "#fff",
                  }}
                  size="small"
                  fullWidth
                  placeholder="Enter Designation"
                  value={spocForm.designation}
                  onChange={(e) =>
                    setSpocForm({ ...spocForm, designation: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography sx={{ mb: 1 }}>Descision Maker</Typography>
                <RadioGroup
                  value={
                    spocForm.isDecisionMaker === true
                      ? "Yes"
                      : spocForm.isDecisionMaker === false
                      ? "No"
                      : ""
                  }
                  onChange={(e) => {
                    setSpocForm({
                      ...spocForm,
                      isDecisionMaker:
                        e.target.value === "Yes"
                          ? true
                          : e.target.value === "No"
                          ? false
                          : "",
                    });
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </Box>
                </RadioGroup>
              </Grid>
              <Grid item xs={12} lg={12} sx={{ textAlign: "center" }}>
                <CustomButtonBlue
                  title={"Submit"}
                  onClick={() => {
                    handleFormSubmit();
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

const styles = {
  heading: {
    color: "#6B6B6B",
    fontWeight: "bold",
    marginRight: "10px",
  },
  data: {
    color: "#127DDD",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};

export default AddSpocComp;
