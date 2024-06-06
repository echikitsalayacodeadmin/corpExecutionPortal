import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useMemo, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { PortalContext } from "../globalContext/globalContext";
import { useNavigate } from "react-router-dom";

const GlobalTopNavbars = () => {
  const { activePortal, changeActivePortal } = useContext(PortalContext);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const portals = useMemo(
    () => [
      {
        name: "Corp Execution Portal",
        visible: activePortal !== "Corp Execution Portal",
        url: "/corp/login",
      },

      {
        name: "Reporting Portal",
        visible: activePortal !== "Reporting Portal",
        url: "/reporting/login",
      },

      {
        name: "Organalysis Portal",
        visible: activePortal !== "Organalysis Portal",
        url: "/org-analysis/login",
      },
    ],
    [activePortal]
  );

  const [selectedPortal, setselectedPortal] = useState(portals[0]);
  console.log(window.location.pathname);
  const navigate = useNavigate();
  return (
    <Fragment>
      <AppBar position="fixed" color="default">
        <Container maxWidth={false}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">
              Unocare |{" "}
              {portals.filter(
                (value) => value.url === window.location.pathname
              )[0]?.name || "Corp Execution Portal"}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                mr: 1,
              }}
            >
              {portals.map((portal, index) => (
                <Button
                  key={index}
                  sx={{
                    my: 1,
                    color: "black",
                    display: "block",
                  }}
                  onClick={() => {
                    navigate(portal.url);
                    setselectedPortal(portal);
                  }}
                >
                  {portal?.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: { xs: "block", lg: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", lg: "none" },
                }}
              >
                {portals.map((portal) => (
                  <MenuItem
                    key={portal.name}
                    sx={{
                      "&:hover": {
                        backgroundColor: "lightgray !important",
                      },
                    }}
                    onClick={() => {
                      navigate(portal.url);
                      handleCloseNavMenu();
                      setselectedPortal(portal);
                    }}
                  >
                    {portal.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default GlobalTopNavbars;
