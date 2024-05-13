import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CustomTypographyBold } from "../../../../assets/customTypography";
import { NavLink, useNavigate } from "react-router-dom";

const CompanyInfoCard = ({ data }) => {
  let navigate = useNavigate();
  return (
    <NavLink
      to={`statussummary/${data?.corpId}`}
      style={({ isActive }) => ({
        color: isActive ? "#000" : "#000",
        textDecoration: "none",
        cursor: "pointer",
      })}
    >
      <Grid
        container
        sx={{
          backgroundColor: "#FFFFFF",
          p: 1.5,
          boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.15)",
          borderRadius: "15px",
          marginBlock: 2,
          alignItems: "center",
        }}
      >
        <Grid item xs={12} lg={12}>
          <CustomTypographyBold>{data?.corpName}</CustomTypographyBold>
        </Grid>
        <Grid item xs={3} lg={3}>
          <CustomTypographyBold>DATA SHEET</CustomTypographyBold>
          <Box
            sx={{
              backgroundColor: "green",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              Done : {data?.statusCount?.SHEET?.DONE || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "yellow",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Pending : {data?.statusCount?.SHEET?.PENDING}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} lg={3}>
          <CustomTypographyBold>UPLOADED</CustomTypographyBold>
          <Box
            sx={{
              backgroundColor: "green",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              Done : {data?.statusCount?.UPLOADED?.DONE || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "yellow",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Pending : {data?.statusCount?.UPLOADED?.PENDING}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} lg={3}>
          <CustomTypographyBold>REPORTING</CustomTypographyBold>
          <Box
            sx={{
              backgroundColor: "green",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              Done : {data?.statusCount?.REPORTING?.DONE || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "yellow",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Pending : {data?.statusCount?.REPORTING?.PENDING}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} lg={3}>
          <CustomTypographyBold>DISPATCH</CustomTypographyBold>
          <Box
            sx={{
              backgroundColor: "green",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              Done : {data?.statusCount?.DISPATCH?.DONE || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "yellow",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Pending : {data?.statusCount?.DISPATCH?.PENDING}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </NavLink>
  );
};

export default CompanyInfoCard;
