import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  colors,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const Setting = () => {
  const pages = [
    {
      id: 1,
      name: "Org Analysis Login",
      url: "/org-analysis/login",
    },
  ];

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  return (
    <Fragment>
      <Box sx={{ marginTop: "8px" }}>
        <IconButton onClick={handleOpenMenu}>
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          onClick={handleClose}
        >
          {pages.map((page) => (
            <MenuItem key={page.id}>
              <NavLink
                style={{ textDecoration: "none" }}
                to={page.url}
                sx={{ my: 1, mx: 1.5 }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "15px",
                    lineHeight: "15px",
                    color: "#000000",
                  }}
                >
                  {page.name}
                </Typography>
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Fragment>
  );
};

export default Setting;
