import React, { Fragment } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { CustomTypographyBold } from "../../../assets/customTypography";
import { NavLink } from "react-router-dom";

const EngagementMain = () => {
  const data = [
    {
      id: 1,
      title: "Add / Update Awareness Session List Information",
      xsgridwidth: 12,
      path: "/corp/engagement/sessioninfo",
    },
    {
      id: 1,
      title: "Add / Update Awareness Session in Calendar",
      xsgridwidth: 12,
      path: "/corp/engagement/calendarinfo",
    },
  ];

  return (
    <Fragment>
      <Grid container spacing={{ lg: 1, xs: 0.5 }} display="flex">
        {data.map((item, index) => (
          <Grid key={index} item lg={4} xs={item?.xsgridwidth}>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                color: isActive ? "#000" : "#000",
                textDecoration: "none",
              })}
            >
              <Box
                sx={{
                  boxShadow: "0px 1px 6px 1px rgba(0, 0, 0, 0.1)",
                  flex: 1,
                  p: { lg: 3, xs: 2 },
                  minWidth: 100,
                  height: { lg: 80, xs: 60 },
                  border: 0.5,
                  borderRadius: 5,
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#4998FF",
                    color: "#FFFFFF",
                    "& .MuiTypography-root": {
                      color: "#FFFFFF",
                    },
                  },
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Stack
                  flex={1}
                  direction={{ lg: "column", xs: "row" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {item?.title}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </NavLink>
          </Grid>
        ))}{" "}
      </Grid>
    </Fragment>
  );
};

export default EngagementMain;
