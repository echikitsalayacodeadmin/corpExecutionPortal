import { darken, lighten, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.7) : "rgb(179, 219, 241)";

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .super-app-theme--Normal": {
    backgroundColor: "rgb(255, 255, 255)",
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode
      ),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode
      ),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode
        ),
      },
    },
  },
}));
