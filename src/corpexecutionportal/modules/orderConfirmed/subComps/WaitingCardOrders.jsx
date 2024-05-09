import { Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const WaitingCardOrders = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Grid
        container
        sx={{
          background: "#FFFFFF",
          boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.15)",
          borderRadius: "15px",
          padding: "10px",
          marginY: "10px",
        }}
      >
        <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
          <Typography sx={styles.companyName}>{data?.corpName}</Typography>
        </Grid>
        {data?.registrationDate ? (
          <Grid item xs={5} lg={5} sx={{ display: "flex" }}>
            <Typography sx={styles.subTitle}>Date - </Typography>
            <Typography sx={styles.subTitle}>
              {data?.registrationDate}
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={1} lg={1} textAlign="right">
          <IconButton
            onClick={() => {
              const query = { details: JSON.stringify(data) };
              navigate(
                `/corp/orderconfirmed/detailed/${encodeURIComponent(
                  JSON.stringify(query)
                )}`
              );
            }}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
        {data?.totalVisits ? (
          <Grid item xs={12} lg={12} sx={{ display: "flex" }}>
            <Typography
              sx={styles.subTitle}
            >{`Total Visits : ${data?.totalVisits}`}</Typography>
          </Grid>
        ) : null}
        {data?.interested ? (
          <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
            <Typography sx={styles.subTitle}>
              {data?.interested === true
                ? "Interested"
                : data?.interested === false
                ? "Not Interested"
                : null}
            </Typography>
          </Grid>
        ) : null}
        {data?.userName ? (
          <Grid item xs={5} lg={5} sx={{ display: "flex" }}>
            <Typography
              sx={styles.subTitle}
            >{`User : ${data?.userName}`}</Typography>
          </Grid>
        ) : null}
        {data?.location ? (
          <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
            <Typography sx={styles.subTitle}>
              Location: {data?.location}
            </Typography>
          </Grid>
        ) : null}
        {data?.priority ? (
          <Grid item xs={5} lg={5} sx={{ display: "flex" }}>
            <Typography
              sx={styles.subTitle}
            >{`Priority : ${data?.priority}`}</Typography>
          </Grid>
        ) : null}
      </Grid>
    </Fragment>
  );
};

export default WaitingCardOrders;

const styles = {
  companyName: {
    fontWeight: "600",
    fontSize: "13px",
    lineHeight: "15px",
    color: "#404040",
    paddingLeft: "5px",
    textTransform: "capitalize",
  },
  subTitle: {
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "12px",
    color: "#404040",
    marginTop: "5px",
    paddingLeft: "5px",
    textTransform: "capitalize",
  },
};
