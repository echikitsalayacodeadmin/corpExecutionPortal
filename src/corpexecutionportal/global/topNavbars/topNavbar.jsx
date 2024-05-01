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
import { Fragment, useContext, useState } from "react";
import LogoutIndex from "../../modules/logout/logoutIndex";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/logoutservices";

const TopNavbar = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [pages, setPages] = useState([
    {
      name: "Home",
      url: "/corp/home",
      visibility: true,
    },
  ]);

  return (
    <Fragment>
      <AppBar position="fixed" color="default">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography variant="h6">Unocare </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                mr: 1,
              }}
            >
              {pages.map(
                (page) =>
                  page?.visibility && (
                    <NavLink
                      key={page.name}
                      to={page.url}
                      style={({ isActive }) => ({
                        color: isActive ? "#000" : "#000",
                        textDecoration: "none",
                      })}
                    >
                      <Button
                        sx={{
                          my: 1,
                          color: "black",
                          fontSize: "12px",
                          display: "block",
                        }}
                      >
                        {page.name}
                      </Button>
                    </NavLink>
                  )
              )}

              <LogoutIndex />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", lg: "none" },
                justifyContent: "flex-end",
                alignItems: "center",
                mr: 2,
              }}
            >
              <Box>
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
                  {pages.map((page) => (
                    <NavLink
                      key={page.name}
                      to={page.url}
                      style={({ isActive }) => ({
                        color: isActive ? "#000" : "#000",

                        textDecoration: "none",
                      })}
                    >
                      <MenuItem
                        onClick={handleCloseNavMenu}
                        sx={{
                          "&:hover": {
                            backgroundColor: "lightgray !important",
                          },
                        }}
                      >
                        {page.name}
                      </MenuItem>
                    </NavLink>
                  ))}
                  <MenuItem
                    onClick={() => {
                      logoutUser(navigate);
                      handleCloseNavMenu();
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "lightgray !important",
                      },
                    }}
                  >
                    <LogoutIndex />
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default TopNavbar;
