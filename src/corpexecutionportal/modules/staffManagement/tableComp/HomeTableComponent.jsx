import { Box, Grid, Stack } from "@mui/material";
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
    width: width / 4,
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
    field: "shift1",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Shift 1" />,
    width: width / 4,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <Box
        component={Stack}
        sx={{
          border: 0.5,
          borderColor: "lightblue",
          p: 1.2,
          backgroundColor: cellValues.value
            ? checkInTimeValidation(cellValues.value).color
            : "#FFF",
          width: "100%",
          height: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cellValues.value ? (
          <Fragment>
            <CustomTypographyTableCell>
              {` Start Time- ${
                cellValues.value?.shiftStartTime
                  ? dayjs(
                      getHourAndMinuteFromTime(cellValues.value?.shiftStartTime)
                    ).format("hh:mm A")
                  : "NA"
              }`}
            </CustomTypographyTableCell>
            <CustomTypographyTableCell>
              {` Chekin Time- ${
                cellValues.value?.checkInTimeStamp
                  ? dayjs(
                      getHourAndMinuteFromTime(
                        cellValues.value?.checkInTimeStamp
                      )
                    ).format("hh:mm A")
                  : "NA"
              }`}
            </CustomTypographyTableCell>
          </Fragment>
        ) : (
          <CustomTypographyTableCell>NA</CustomTypographyTableCell>
        )}
      </Box>
    ),
  },
  {
    field: "shift2",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Shift 2" />,
    width: width / 4,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <Box
        component={Stack}
        sx={{
          border: 0.5,
          borderColor: "lightblue",
          p: 1.2,
          backgroundColor: cellValues.value
            ? checkInTimeValidation(cellValues.value).color
            : "#FFF",
          width: "100%",
          height: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cellValues.value ? (
          <Fragment>
            <CustomTypographyTableCell>
              {` Start Time- ${
                cellValues.value?.shiftStartTime
                  ? dayjs(
                      getHourAndMinuteFromTime(cellValues.value?.shiftStartTime)
                    ).format("hh:mm A")
                  : "NA"
              }`}
            </CustomTypographyTableCell>
            <CustomTypographyTableCell>
              {` Chekin Time- ${
                cellValues.value?.checkInTimeStamp
                  ? dayjs(
                      getHourAndMinuteFromTime(
                        cellValues.value?.checkInTimeStamp
                      )
                    ).format("hh:mm A")
                  : "NA"
              }`}
            </CustomTypographyTableCell>
          </Fragment>
        ) : (
          <CustomTypographyTableCell>NA</CustomTypographyTableCell>
        )}
      </Box>
    ),
  },
  {
    field: "shift3",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Shift 3" />,
    width: width / 4,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <Box
        component={Stack}
        sx={{
          border: 0.5,
          borderColor: "lightblue",
          p: 1.2,
          backgroundColor: cellValues.value
            ? checkInTimeValidation(cellValues.value).color
            : "#FFF",
          width: "100%",
          height: "95%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cellValues.value ? (
          <Fragment>
            <CustomTypographyTableCell>
              {` Start Time- ${
                cellValues.value?.shiftStartTime
                  ? dayjs(
                      getHourAndMinuteFromTime(cellValues.value?.shiftStartTime)
                    ).format("hh:mm A")
                  : "NA"
              }`}
            </CustomTypographyTableCell>
            <CustomTypographyTableCell>
              {` Chekin Time- ${
                cellValues.value?.checkInTimeStamp
                  ? dayjs(
                      getHourAndMinuteFromTime(
                        cellValues.value?.checkInTimeStamp
                      )
                    ).format("hh:mm A")
                  : "NA"
              }`}
            </CustomTypographyTableCell>
          </Fragment>
        ) : (
          <CustomTypographyTableCell>NA</CustomTypographyTableCell>
        )}
      </Box>
    ),
  },
];

const HomeTableComponent = ({ data = [] }) => {
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
                rowHeight={60}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default HomeTableComponent;
