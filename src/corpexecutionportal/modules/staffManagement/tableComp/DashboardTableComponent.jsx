import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import useWindowDimensions from "../../../../assets/customHooks/customhooks";
import { useNavigate } from "react-router-dom";
import CustomDataGridNew from "../../../../assets/globalDataGridLayout/CustomDataGridNew";
import {
  CustomTypographyTableCell,
  CustomTypographyTableHeader,
} from "../../../assets/customTypography/CustomTypography";
import CustomSelectNew from "../../../../assets/customSelectNew";
import AddNewStaffMain from "../addNewStaff/AddNewStaffMain";

const columns = (width) => [
  {
    field: "compant",
    display: "flex",
    renderHeader: (params) => (
      <Box sx={{ ml: 5 }}>
        <CustomTypographyTableHeader title="Company" />
      </Box>
    ),
    width: width / 5,
    headerClassName: "super-app-theme--header",
    align: "left",
    headerAlign: "left",
    renderCell: (cellValues) => (
      <Box sx={{ ml: 5 }}>
        <CustomTypographyTableCell>
          {cellValues.value}
        </CustomTypographyTableCell>{" "}
      </Box>
    ),
  },
  {
    field: "staffRole",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Staff Role" />
    ),
    width: width / 5,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "shiftStartTime",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Shift Start Time" />
    ),
    width: width / 5,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "checknTime",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Check In Time" />
    ),
    width: width / 5,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "employee",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Employee" />,
    width: width / 5,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
];

const DashboardTableComponent = ({ data = [] }) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12} display="flex" justifyContent="center">
            <CustomTypographyTableHeader title=" OHC Staff Attendance Dashboard" />
          </Grid>
          <Grid item lg={12}>
            <Box>
              <CustomDataGridNew
                columns={columns(width - 145)}
                rows={data}
                adjustHeight={285}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardTableComponent;
