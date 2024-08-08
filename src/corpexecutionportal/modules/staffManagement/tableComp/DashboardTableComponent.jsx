import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import useWindowDimensions from "../../../../assets/customHooks/customhooks";
import { useNavigate } from "react-router-dom";
import CustomDataGridNew from "../../../../assets/globalDataGridLayout/CustomDataGridNew";
import {
  CustomTypographyTableCell,
  CustomTypographyTableHeader,
} from "../../../assets/customTypography/CustomTypography";
import dayjs from "dayjs";

const columns = (width) => [
  {
    field: "corpName",
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
    field: "employeeTeam",
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
    field: "checkInTimeStamp",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Check In Time" />
    ),
    width: width / 5,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>
        {cellValues.value ? dayjs(cellValues.value).format("LT") : ""}
      </CustomTypographyTableCell>
    ),
  },
  {
    field: "userName",
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
        <Grid container spacing={1} rowSpacing={3}>
          <Grid item lg={12}>
            <Box>
              <CustomDataGridNew
                columns={columns(width - 145)}
                rows={data}
                adjustHeight={320}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardTableComponent;
