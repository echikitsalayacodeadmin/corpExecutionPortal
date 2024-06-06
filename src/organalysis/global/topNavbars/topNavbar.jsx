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
import { CorpNameContext } from "../context/context";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/logoutservices";

const TopNavbar = () => {
  const { corpName } = useContext(CorpNameContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [pages, setPages] = useState([
    { name: "Home", url: "/org-analysis/home" },
    {
      name: "Change Corp",
      url: "/org-analysis/select-corp",
    },
  ]);

  return (
    <Fragment>
      <AppBar position="fixed" color="default">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6">Unocare | {corpName}</Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                mr: 2,
              }}
            >
              {pages.map((page) => (
                <Button
                  href={page.url}
                  key={page.name}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}

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
                    <MenuItem
                      sx={{
                        "&:hover": {
                          backgroundColor: "lightgray !important",
                        },
                      }}
                      key={page.name}
                      onClick={() => navigate(page.url)}
                    >
                      {page.name}
                    </MenuItem>
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
