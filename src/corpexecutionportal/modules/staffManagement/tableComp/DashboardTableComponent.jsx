import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import useWindowDimensions from "../../../../assets/customHooks/customhooks";
import CustomDataGridNew from "../../../../assets/globalDataGridLayout/CustomDataGridNew";
import {
  CustomTypographyTableCell,
  CustomTypographyTableHeader,
} from "../../../assets/customTypography/CustomTypography";
import dayjs from "dayjs";
import {
  checkInTimeValidation,
  getHourAndMinuteFromTime,
  replaceCharacter,
} from "../../../../assets/utils";

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
      <CustomTypographyTableCell>
        {replaceCharacter(cellValues.value, "_", " ")}
      </CustomTypographyTableCell>
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
      <CustomTypographyTableCell>
        {cellValues.value
          ? dayjs(getHourAndMinuteFromTime(cellValues.value)).format("hh:mm A")
          : ""}
      </CustomTypographyTableCell>
    ),
  },
  {
    field: "chekInTimeObject",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Check In Time" />
    ),
    width: width / 5,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell
        color={
          cellValues.value
            ? checkInTimeValidation(cellValues.value).fontcolor
            : "#000"
        }
      >
        {cellValues.value ? checkInTimeValidation(cellValues.value).text : ""}
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

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1} rowSpacing={3}>
          <Grid item lg={12}>
            <Box>
              <CustomDataGridNew
                columns={columns(width - 147)}
                rows={data}
                adjustHeight={325}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardTableComponent;
