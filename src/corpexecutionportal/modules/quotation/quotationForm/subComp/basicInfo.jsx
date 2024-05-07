import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { Fragment } from "react";
import GlobalDateLayout from "../../../../../assets/globalDateLayout/globalDateLayout";

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
  setFormValues({ ...formValues, details: value });
};

const BasicInfo = ({ data = null, corpSalesId, formValues, setFormValues }) => {
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <Typography>Quotation By:</Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                disabled={true}
                sx={styles.textfieldStyle}
                size="small"
                fullWidth
                label="Company Name"
                placeholder="Enter Company Name"
                value={"Uno care (Mysticdoc Healthcare Pvt Ltd)"}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                multiline
                disabled={true}
                sx={styles.textfieldStyle}
                size="small"
                fullWidth
                label="Company Address"
                placeholder="Enter Company Address"
                value={
                  "Regd. Office: 253, Shri Krishna Avenue, Phase-1,  Limbodi Khandwa Road, Indore-452001"
                }
                InputProps={{
                  style: { minHeight: "63px" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <Typography>Quotation For:</Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                sx={styles.textfieldStyle}
                size="small"
                fullWidth
                label="Company Name"
                placeholder="Enter Company Name"
                value={formValues.corpName || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    corpName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                multiline
                sx={styles.textfieldStyle}
                size="small"
                fullWidth
                label="Company Address"
                placeholder="Enter Company Address"
                value={formValues.corpAddress || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    corpAddress: e.target.value,
                  })
                }
                InputProps={{
                  style: { minHeight: "63px" },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField
            multiline
            label="#Quotation Title"
            variant="outlined"
            fullWidth
            placeholder="#Quotation Title"
            size="small"
            value={formValues.title || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} lg={12}>
          <TextField
            sx={styles.textfieldStyle}
            size="small"
            fullWidth
            label="Company Spoc"
            placeholder="Enter Company Spoc"
            value={formValues.corpSpoc || ""}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                corpSpoc: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={6} lg={6}>
          <TextField
            label="#Employees"
            variant="outlined"
            fullWidth
            placeholder="#Employees"
            size="small"
            value={formValues.noOfEmp || ""}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                noOfEmp: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <TextField
            label="#Staff"
            variant="outlined"
            fullWidth
            placeholder="#staff"
            size="small"
            value={formValues.noOfStaff || ""}
            onChange={(e) =>
              setFormValues({ ...formValues, noOfStaff: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={6} lg={6}>
          <GlobalDateLayout
            label="Date"
            formValues={formValues}
            setFormValues={setFormValues}
            property={"quotationDate"}
            initialDate={formValues.quotationDate}
            disablePast={true}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <GlobalDateLayout
            label="Expiration Date"
            formValues={formValues}
            setFormValues={setFormValues}
            property={"quotationExpirationDate"}
            initialDate={formValues.quotationExpirationDate}
            disablePast={true}
          />
        </Grid>
        {data && (
          <Grid
            item
            xs={12}
            lg={12}
            sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            <Box
              sx={{
                borderRadius: "10px",
                padding: "3.5px",
              }}
            >
              <Typography sx={{ color: "#000000", textAlign: "center" }}>
                {data?.quotationStatus
                  ? `STATUS: ${data?.quotationStatus}`
                  : ""}
              </Typography>
            </Box>

            <Box
              sx={{
                borderRadius: "10px",
                padding: "3.5px",
              }}
            >
              <Typography sx={{ color: "#000000" }}>
                {data?.createdByName === "" || data?.createdByName === null
                  ? ""
                  : `Created By : ${data?.createdByName}`}
              </Typography>
            </Box>
            {data?.quotationStatus === "APPROVED" && data?.approvedByName && (
              <Box
                sx={{
                  borderRadius: "10px",
                  padding: "3.5px",
                }}
              >
                <Typography sx={{ color: "#000000" }}>
                  {data?.approvedByName === "" || data?.approvedByName === null
                    ? ""
                    : `Approved By : ${data?.approvedByName}`}
                </Typography>
              </Box>
            )}
          </Grid>
        )}
        <Grid item xs={12} lg={12}>
          <TextField
            multiline
            minRows={2}
            label="#Enter Paragraph"
            variant="outlined"
            fullWidth
            placeholder="#Enter Paragraph"
            size="small"
            value={formValues.details || ""}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                details: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BasicInfo;
const styles = {
  textfieldStyle: {
    background: "#fff",
    color: "#127DDD",
    fontWeight: "300",
    fontSize: "13px",
    lineHeight: " 15px",
    "& input::placeholder": {
      color: "#777777",
      fontWeight: "300",
      fontSize: "13px",
      lineHeight: " 15px",
    },
  },
};
