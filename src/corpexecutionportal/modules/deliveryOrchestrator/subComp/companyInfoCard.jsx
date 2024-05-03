import { Box, Grid } from "@mui/material";
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
        <Grid item xs={6} lg={6}>
          <CustomTypographyBold>{data?.corpName}</CustomTypographyBold>
        </Grid>
        <Grid item xs={3} lg={3}>
          <Box
            sx={{
              width: "200px",
              backgroundColor: "lightgreen",
              p: 0.5,
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <CustomTypographyBold>{data?.status}</CustomTypographyBold>
          </Box>
        </Grid>
        {data.status === "DISPATCH" ? null : (
          <Grid item xs={3} lg={3}>
            <Box
              sx={{
                width: "200px",
                backgroundColor: "yellow",
                p: 0.5,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <CustomTypographyBold>
                {data.status === "CAMP EXECUTED"
                  ? "SHEET"
                  : data.status === "SHEET"
                  ? "UPLOADED"
                  : data.status === "UPLOADED"
                  ? "REPORTING"
                  : data.status === "REPORTING"
                  ? "DISPATCH"
                  : null}
              </CustomTypographyBold>
            </Box>
          </Grid>
        )}
      </Grid>
    </NavLink>
  );
};

export default CompanyInfoCard;
