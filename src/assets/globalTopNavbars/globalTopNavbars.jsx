import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useContext, useMemo, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const GlobalTopNavbars = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Fragment>
      <AppBar position="fixed" color="default">
        <Container maxWidth={false}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Unocare | Camp Portal</Typography>
            {/* <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                mr: 1,
              }}
            >
              {portals.map(
                (portal, index) =>
                  portal.visible && (
                    <Button
                      key={index}
                      sx={{
                        my: 1,
                        color: "black",
                        display: "block",
                      }}
                      onClick={() => changeActivePortal(portal.name)}
                    >
                      {portal?.name}
                    </Button>
                  )
              )}
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
                {portals.map(
                  (portal) =>
                    portal.visible && (
                      <MenuItem
                        key={portal.name}
                        sx={{
                          "&:hover": {
                            backgroundColor: "lightgray !important",
                          },
                        }}
                        onClick={() => {
                          changeActivePortal(portal.name);
                          handleCloseNavMenu();
                        }}
                      >
                        {portal.name}
                      </MenuItem>
                    )
                )}
              </Menu>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default GlobalTopNavbars;
