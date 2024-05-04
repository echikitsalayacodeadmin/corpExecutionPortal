import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { isBrowser, isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

const WaitingCardQoutationDashboard = ({ data }) => {
  const navigate = useNavigate();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${period}`;
  };

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
        <Grid item xs={12} lg={12}>
          <Typography>{data?.corpName}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>
            {data?.createdByName
              ? `CreatedBy: ${data?.createdByName || ""}`
              : ""}
          </Typography>
        </Grid>
        {data?.quotationStatus === "APPROVED" && data?.approvedByName && (
          <Grid item xs={12} lg={6}>
            <Typography sx={{ textAlign: isBrowser && "right" }}>
              {data?.approvedByName
                ? `Approved By: ${data?.approvedByName || ""}`
                : ""}
            </Typography>
          </Grid>
        )}
        {data?.quotationStatus !== null && (
          <Grid item xs={12} lg={12}>
            <Typography
              sx={{
                color: "#000000",
                textTransform: "capitalize",
              }}
            >
              {data?.quotationStatus
                ? `Status: ${data?.quotationStatus
                    .toLowerCase()
                    .replace(/_/, " ")}`
                : ""}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} lg={6}>
          <Typography>
            {data?.createdDate
              ? `Created Date: ${
                  new Date(data?.createdDate)?.toISOString().split("T")[0]
                }  ${formatDateTime(data?.createdDate)}`
              : ""}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography sx={{ textAlign: isBrowser && "right" }}>
            {data?.lastModifiedDate
              ? `Last Modified Date: ${
                  new Date(data?.lastModifiedDate)?.toISOString().split("T")[0]
                } ${formatDateTime(data?.lastModifiedDate)}`
              : ""}
          </Typography>
        </Grid>{" "}
        <Grid item xs={6} lg={6}>
          <Button
            onClick={() => {
              const query = {
                corpId: data.corpId,
                quotationId: data?.id,
                companyName: data.corpName,
                address: data.corpAddress,
                quotationStatus: data.quotationStatus,
                fromAdmin: true,
              };
              navigate(`/corp/quotation/quotationUpdate/${query}`);
            }}
            size="small"
            variant="contained"
            sx={{ borderRadius: "10px", textTransform: "capitalize" }}
          >
            <Typography sx={{ color: "#FFFFFF", textAlign: "center" }}>
              View Quotation
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default WaitingCardQoutationDashboard;
