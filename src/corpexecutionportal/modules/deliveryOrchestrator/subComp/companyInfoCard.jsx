import { Box, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CustomTypographyBold } from "../../../../assets/customTypography";
import { NavLink, useNavigate } from "react-router-dom";
import { CorpNameContext } from "../../../global/context/usercontext";

const CompanyInfoCard = ({ data }) => {
  let navigate = useNavigate();
  const { corpName, setCorpName } = useContext(CorpNameContext);
  return (
    <NavLink
      onClick={() => {
        setCorpName(data?.corpName);
      }}
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
              backgroundColor: "orange",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              WIP : {data?.statusCount?.SHEET?.WORK_IN_PROGRESS || 0}
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
              Pending : {data?.statusCount?.SHEET?.PENDING || 0}
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
              backgroundColor: "orange",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              WIP : {data?.statusCount?.UPLOADED?.WORK_IN_PROGRESS || 0}
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
              Pending : {data?.statusCount?.UPLOADED?.PENDING || 0}
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
              backgroundColor: "orange",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              WIP : {data?.statusCount?.REPORTING?.WORK_IN_PROGRESS || 0}
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
              Pending : {data?.statusCount?.REPORTING?.PENDING || 0}
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
              backgroundColor: "orange",
              padding: "4px",
              borderRadius: "5px",
              width: "120px",
              textAlign: "center",
              marginBlock: 1,
            }}
          >
            <Typography sx={{ fontWeight: "bold", color: "#FFF" }}>
              WIP : {data?.statusCount?.DISPATCH?.WORK_IN_PROGRESS || 0}
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
              Pending : {data?.statusCount?.DISPATCH?.PENDING || 0}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </NavLink>
  );
};

export default CompanyInfoCard;
