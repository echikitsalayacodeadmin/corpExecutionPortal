import { Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TourIcon from "@mui/icons-material/Tour";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { getColorOfNextVisitDate } from "../../../../../assets/utils";
import dayjs from "dayjs";

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
    : status === "DATA_AWAITED"
    ? "?"
    : status === "NEED_TO_REVISE_THE_QUOTE"
    ? "?"
    : status === "QUOTATION_APPROVED"
    ? "✔️"
    : status === "QUOTATION_REJECTED"
    ? "❌"
    : status === "ORDER_LOST"
    ? "❌"
    : null;
};

const DashboardCard = ({ data, serviceMapping }) => {
  const requiredServices = data?.mapOfServiceIdAndInfo || {};
  const userAndCount =
    Object?.entries(data?.mapOfUserAndVisitsCount || {}).map(
      ([name, count]) => ({
        name,
        count,
      })
    ) || [];

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
          <Grid
            item
            xs={12}
            lg={12}
            sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            <Typography sx={styles.companyName}>
              {data?.corpName?.toLowerCase()}{" "}
              {data?.priority && `(${data?.priority})`}
            </Typography>
          </Grid>
          {data?.lastVisitDate ? (
            <Grid
              item
              xs={6}
              lg={6}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography>Last:</Typography>
              <Typography sx={styles.subTitle}>
                {dayjs(data?.lastVisitDate).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
          ) : null}

          {data.nextVisitDate ? (
            <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
              <Typography>Next:</Typography>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  alignProperty: "center",
                  fontSize: "17px",
                  marginInline: "5px",
                  color: getColorOfNextVisitDate(data?.nextVisitDate),
                }}
              >
                {dayjs(data?.nextVisitDate).format("DD-MM-YYYY")}
              </Typography>
            </Grid>
          ) : null}

          {data?.totalVisits ? (
            <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
              <Typography>Visits:</Typography>
              <Typography sx={styles.subTitle}>{data?.totalVisits}</Typography>
            </Grid>
          ) : null}

          <Grid
            item
            xs={12}
            lg={12}
            sx={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
          >
            {userAndCount?.map(({ name, count }) => (
              <Typography key={name}>
                {data?.userName?.toString() === name ? name + "*" : name}(
                {count})
              </Typography>
            ))}
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
    fontSize: "22px",
  },
  subTitle: {
    textTransform: "capitalize",
    alignProperty: "center",
    fontSize: "17px",
    marginInline: "5px",
  },
};
