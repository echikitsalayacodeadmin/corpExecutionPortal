import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { Fragment } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";

const CompanySummaryInfo = ({ data }) => {
  const navigate = useNavigate();
  const handleDownload = (url) => {
    if (url !== "" || url !== null || url !== undefined) {
      window.open(url, "_blank");
    }
  };
  return (
    <Fragment>
      <Grid
        container
        sx={{
          boxSizing: "border-box",
          background: "#FFFFFF",
          border: "0.5px solid #A6A6A6",
          borderRadius: 5,
          padding: 1,
        }}
      >
        <Grid item xs={11} lg={11} md={11} sm={11}>
          <Grid container>
            <Grid
              item
              xs={12}
              lg={6}
              md={6}
              sm={6}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <Typography sx={styles.heading}>Company Name -</Typography>
              <Typography sx={styles.data}>{data?.corpName}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              md={6}
              sm={6}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <Typography sx={styles.heading}>Company Address -</Typography>
              <Typography sx={styles.data}>{data?.address}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>
                No of On Roll Employees -
              </Typography>
              <Typography sx={styles.data}>{data?.onRollEmployees}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>
                No of Off Roll Employees -
              </Typography>
              <Typography sx={styles.data}>{data?.offRollEmployees}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}># Plants -</Typography>
              <Typography sx={styles.data}>{data?.noOfPlants}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Type of Company -</Typography>
              <Typography sx={styles.data}>{data?.corpType}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Location -</Typography>
              <Typography sx={styles.data}>{data?.location}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Priority -</Typography>
              <Typography sx={styles.data}>{data?.priority}</Typography>
            </Grid>

            <Grid item xs={12} lg={6} md={6} sm={12} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Sales Month -</Typography>
              <Typography sx={styles.data}>{data?.auditMonth}</Typography>
            </Grid>

            {data?.visitType === null ? null : (
              <Grid item xs={12} lg={6} md={6} sm={12} sx={{ display: "flex" }}>
                <Typography sx={styles.heading}>Visit Type -</Typography>
                <Typography sx={styles.data}>
                  {data?.visitType?.replace(/_/g, " ")}
                </Typography>
              </Grid>
            )}

            {/* <Grid item xs={12} lg={6} md={6} sm={12} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Delivery Date -</Typography>
              <Typography sx={styles.data}>{data?.deliveryDate}</Typography>
            </Grid>

            <Grid item xs={12} lg={6} md={6} sm={12} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>
                Delivery Instruction -
              </Typography>
              <Typography sx={styles.data}>
                {data?.deliveryInstruction}
              </Typography>
            </Grid> */}

            <Grid
              item
              xs={12}
              lg={12}
              md={12}
              sm={12}
              sx={{ display: "flex", marginTop: "5px", flexWrap: "wrap" }}
            >
              <Typography sx={styles.heading}>Potential Services -</Typography>
              <Typography sx={styles.data}>
                {data?.prospectiveServices?.join(", ")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={12}
              md={12}
              sm={12}
              sx={{
                display: "flex",
                marginBlock: "2px",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {data?.photoUrl === "" || data?.photoUrl === null ? null : (
                <CustomButtonBlue
                  startIcon={<DownloadIcon />}
                  title="Photo"
                  onClick={() => {
                    handleDownload(data?.photoUrl);
                  }}
                />
              )}
              {data?.invoiceUrl === "" || data?.invoiceUrl === null ? null : (
                <CustomButtonBlue
                  startIcon={<DownloadIcon />}
                  title=" Invoice"
                  onClick={() => {
                    handleDownload(data?.invoiceUrl);
                  }}
                />
              )}
              {data?.approvedQuotationUrl === "" ||
              data?.approvedQuotationUrl === null ? null : (
                <CustomButtonBlue
                  startIcon={<DownloadIcon />}
                  title="Approved Quotation"
                  onClick={() => {
                    handleDownload(data?.approvedQuotationUrl);
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} lg={1} md={1} sm={1}>
          <Tooltip title="Click to Edit Visit">
            <IconButton
              onClick={() => {
                navigate(`/corp/editvisit/${data?.corpSalesId}`);
              }}
            >
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CompanySummaryInfo;
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
