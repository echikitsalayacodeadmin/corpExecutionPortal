import { Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const getServicesStatusSymbol = (status) => {
  return status === "INTERESTED"
    ? "✔️"
    : status === "NOT_INTERESTED"
    ? "❌"
    : status === "ONE_MORE_MEETING"
    ? "✔️"
    : status === "QUOTATION_ASKED"
    ? "✔️"
    : status === "QUOTATION_SENT"
    ? "✔️"
    : status === "NEGOTIATION"
    ? "✔️"
    : status === "QUOTATION_APPROVED"
    ? "✔️"
    : status === "QUOTATION_REJECTED"
    ? "❌"
    : status === "ORDER_LOST"
    ? "❌"
    : null;
};

const DashboardCard = ({ data, serviceMapping }) => {
  const requiredServices = data?.mapOfServiceIdAndInfo;
  const userAndCount = Object?.entries(data?.mapOfUserAndVisitsCount)?.map(
    ([name, count]) => ({
      name,
      count,
    })
  );
  const navigate = useNavigate();
  return (
    <Fragment>
      <NavLink
        to={`detail/${data?.corpSalesId}`}
        style={({ isActive }) => ({
          color: isActive ? "#000" : "#000",
          textDecoration: "none",
          cursor: "pointer",
        })}
      >
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
          <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
            <Typography sx={styles.companyName}>{data?.corpName}</Typography>
          </Grid>
          {data?.corpSalesVisitEntities?.[1]?.nextVisitDate ? (
            <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
              <Typography sx={styles.subTitle}>Last Date - </Typography>
              <Typography sx={styles.subTitle}>
                {data?.corpSalesVisitEntities?.[1]?.nextVisitDate}
              </Typography>
            </Grid>
          ) : null}
          {data?.registrationDate ? (
            <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
              <Typography sx={styles.subTitle}>Create Date - </Typography>
              <Typography sx={styles.subTitle}>
                {data?.registrationDate}
              </Typography>
            </Grid>
          ) : null}
          {data?.corpSalesVisitEntities?.[0]?.nextVisitDate ? (
            <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
              <Typography sx={styles.subTitle}>Next Date - </Typography>
              <Typography sx={styles.subTitle}>
                {data?.corpSalesVisitEntities?.[0]?.nextVisitDate}
              </Typography>
            </Grid>
          ) : null}

          {data?.totalVisits ? (
            <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
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
            <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
              <Typography
                sx={styles.subTitle}
              >{`User : ${data?.userName}`}</Typography>
            </Grid>
          ) : null}
          {data?.location ? (
            <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
              <Typography sx={styles.subTitle}>
                Location: {data?.location}
              </Typography>
            </Grid>
          ) : null}
          {data?.priority ? (
            <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
              <Typography
                sx={styles.subTitle}
              >{`Priority : ${data?.priority}`}</Typography>
            </Grid>
          ) : null}
          {data?.userName ? (
            <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
              <Typography
                sx={styles.subTitle}
              >{`Priority : ${data?.priority}`}</Typography>
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            lg={12}
            sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {userAndCount.map(({ name, count }) => (
              <Typography key={name} sx={styles.subTitle}>
                {name} ({count})
              </Typography>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {requiredServices &&
              Object.keys(requiredServices).map((key) => {
                const info = requiredServices[key];

                return (
                  <Typography key={key} sx={styles.subTitle}>
                    {`${
                      serviceMapping?.find(
                        (item) => parseInt(item?.id) === parseInt(key)
                      )?.serviceName
                    }: ${
                      info?.status
                        ? `(${getServicesStatusSymbol(info?.status)})`
                        : ""
                    }`}
                  </Typography>
                );
              })}
          </Grid>
        </Grid>
      </NavLink>
    </Fragment>
  );
};

export default DashboardCard;

const styles = {
  companyName: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  subTitle: {
    textTransform: "capitalize",
  },
};
