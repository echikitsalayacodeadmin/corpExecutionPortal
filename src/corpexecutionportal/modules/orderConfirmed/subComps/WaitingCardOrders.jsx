// import { Grid, IconButton, Typography } from "@mui/material";
// import React, { Fragment } from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useNavigate } from "react-router-dom";

// const WaitingCardOrders = ({ data }) => {
//   const navigate = useNavigate();
//   return (
//     <Fragment>
//       <Grid
//         container
//         sx={{
//           background: "#FFFFFF",
//           boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.15)",
//           borderRadius: "15px",
//           padding: "10px",
//           marginY: "10px",
//         }}
//       >
//         <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
//           <Typography sx={styles.companyName}>{data?.corpName}</Typography>
//         </Grid>
//         {data?.registrationDate ? (
//           <Grid item xs={5} lg={5} sx={{ display: "flex" }}>
//             <Typography sx={styles.subTitle}>Date - </Typography>
//             <Typography sx={styles.subTitle}>
//               {data?.registrationDate}
//             </Typography>
//           </Grid>
//         ) : null}
//         <Grid item xs={1} lg={1} textAlign="right">
//           <IconButton
// onClick={() => {
//   const query = { details: JSON.stringify(data) };
//   navigate(
//     `/corp/orderconfirmed/detailed/${encodeURIComponent(
//       JSON.stringify(query)
//     )}`
//   );
// }}
//             style={{ textDecoration: "none", color: "#000000" }}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </Grid>
//         {data?.totalVisits ? (
//           <Grid item xs={12} lg={12} sx={{ display: "flex" }}>
//             <Typography
//               sx={styles.subTitle}
//             >{`Total Visits : ${data?.totalVisits}`}</Typography>
//           </Grid>
//         ) : null}
//         {data?.interested ? (
//           <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
//             <Typography sx={styles.subTitle}>
//               {data?.interested === true
//                 ? "Interested"
//                 : data?.interested === false
//                 ? "Not Interested"
//                 : null}
//             </Typography>
//           </Grid>
//         ) : null}
//         {data?.userName ? (
//           <Grid item xs={5} lg={5} sx={{ display: "flex" }}>
//             <Typography
//               sx={styles.subTitle}
//             >{`User : ${data?.userName}`}</Typography>
//           </Grid>
//         ) : null}
//         {data?.location ? (
//           <Grid item xs={6} lg={6} sx={{ display: "flex" }}>
//             <Typography sx={styles.subTitle}>
//               Location: {data?.location}
//             </Typography>
//           </Grid>
//         ) : null}
//         {data?.priority ? (
//           <Grid item xs={5} lg={5} sx={{ display: "flex" }}>
//             <Typography
//               sx={styles.subTitle}
//             >{`Priority : ${data?.priority}`}</Typography>
//           </Grid>
//         ) : null}
//       </Grid>
//     </Fragment>
//   );
// };

// export default WaitingCardOrders;

// const styles = {
//   companyName: {
//     fontWeight: "600",
//     fontSize: "13px",
//     lineHeight: "15px",
//     color: "#404040",
//     paddingLeft: "5px",
//     textTransform: "capitalize",
//   },
//   subTitle: {
//     fontWeight: "400",
//     fontSize: "13px",
//     lineHeight: "12px",
//     color: "#404040",
//     marginTop: "5px",
//     paddingLeft: "5px",
//     textTransform: "capitalize",
//   },
// };

import { Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getColorOfNextVisitDate } from "../../../../assets/utils";

const WaitingCardOrders = ({ data, serviceMapping }) => {
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
        onClick={() => {
          const query = data;
          navigate(
            `/corp/orderconfirmed/detailed/${encodeURIComponent(
              JSON.stringify(query)
            )}`
          );
        }}
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
              {data?.corpName.toLowerCase()}{" "}
              {data?.priority && `(${data?.priority})`}
            </Typography>
          </Grid>
          {data.lastVisitDate ? (
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
                {data?.userId?.toString() === name ? name + "*" : name}({count})
              </Typography>
            ))}
          </Grid>
        </Grid>
      </NavLink>
    </Fragment>
  );
};

export default WaitingCardOrders;

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
