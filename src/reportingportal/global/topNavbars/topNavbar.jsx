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
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/logoutservices";
import { getReportingPermissions } from "../../assets/reportingPermisions";

const TopNavbar = () => {
  const permissions = getReportingPermissions();
  const { corpName } = useContext(CorpNameContext);
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
      url: "/reporting/reporting-main",
      visibility: true,
    },
    {
      name: "Change Corp",
      url: "/reporting/select-corp",
      visibility: true,
    },
    {
      name: "Assign KAM",
      url: "/reporting/assign-kam",
      visibility: permissions.assignKamTab.visibilty,
    },
    {
      name: "Corp Admin",
      url: "/reporting/create-corp-credentials",
      visibility: permissions.corpAdminTab.visibilty,
    },
    {
      name: "Bulk Upload",
      url: "/reporting/bulkupload",
      visibility: permissions.bulkUploadTab.visibilty,
    },
    {
      name: "Add Bulk Package",
      url: "/reporting/addpackage",
      visibility: permissions.addPackage.visibilty,
    },
    {
      name: "Manage Permissions",
      url: "/reporting/managepermissions",
      visibility: permissions.managePermissionsTab.visibilty,
    },
  ]);

  return (
    <Fragment>
      <AppBar position="fixed" color="default">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Typography variant="h6">Unocare | {corpName}</Typography>
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
