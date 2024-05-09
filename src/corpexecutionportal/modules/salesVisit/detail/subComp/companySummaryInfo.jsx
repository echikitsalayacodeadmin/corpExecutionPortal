import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { Fragment } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import CustomButtonBlue from "../../../../../assets/customButtonBlue";
import { CustomTypographyBold } from "../../../../../assets/customTypography";

const CompanySummaryInfo = ({ data }) => {
  const navigate = useNavigate();
  const handleDownload = (url) => {
    if (url !== "" || url !== null || url !== undefined) {
      window.open(url, "_blank");
    }
  };
  return (
    <Fragment>
      <CustomTypographyBold>Company Information</CustomTypographyBold>
      <Grid
        container
        sx={{
          boxSizing: "border-box",
          background: "#FFFFFF",
          border: "0.5px solid #A6A6A6",
          borderRadius: 5,
          padding: 1,
          marginTop: 1,
          marginBottom: 2,
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
              <Typography sx={styles.heading}>Name -</Typography>
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
              <Typography sx={styles.heading}>Address -</Typography>
              <Typography sx={styles.data}>{data?.address}</Typography>
            </Grid>
            <Grid item xs={6} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>#On Roll -</Typography>
              <Typography sx={styles.data}>{data?.onRollEmployees}</Typography>
            </Grid>
            <Grid item xs={6} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>#Off Roll -</Typography>
              <Typography sx={styles.data}>{data?.offRollEmployees}</Typography>
            </Grid>
            <Grid item xs={6} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}># Plants -</Typography>
              <Typography sx={styles.data}>{data?.noOfPlants}</Typography>
            </Grid>
            <Grid item xs={6} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Priority -</Typography>
              <Typography sx={styles.data}>{data?.priority}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Type -</Typography>
              <Typography sx={styles.data}>{data?.corpType}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Location -</Typography>
              <Typography sx={styles.data}>{data?.location}</Typography>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sm={6} sx={{ display: "flex" }}>
              <Typography sx={styles.heading}>Sub Location -</Typography>
              <Typography sx={styles.data}>{data?.subLocation}</Typography>
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} lg={1} md={1} sm={1}>
          <Tooltip title="Click to Edit Company Info">
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
