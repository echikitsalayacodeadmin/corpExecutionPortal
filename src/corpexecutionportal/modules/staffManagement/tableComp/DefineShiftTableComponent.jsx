import { Box, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import useWindowDimensions from "../../../../assets/customHooks/customhooks";
import { useNavigate } from "react-router-dom";
import CustomDataGridNew from "../../../../assets/globalDataGridLayout/CustomDataGridNew";
import {
  CustomTypographyTableCell,
  CustomTypographyTableHeader,
} from "../../../assets/customTypography/CustomTypography";
import dayjs from "dayjs";
import UpdateShiftMain from "../addNewShift/UpdateShiftMain";
import {
  getHourAndMinuteFromTime,
  replaceCharacter,
} from "../../../../assets/utils";

const DefineShiftTableComponent = ({ data = [], companyList }) => {
  const { height, width } = useWindowDimensions();

  const columns = (width) => [
    {
      field: "staffRole",
      display: "flex",
      renderHeader: (params) => (
        <Box sx={{ ml: 5 }}>
          <CustomTypographyTableHeader title="Staff Role" />
        </Box>
      ),
      width: width / 4,
      headerClassName: "super-app-theme--header",
      align: "left",
      headerAlign: "left",
      renderCell: (cellValues) => (
        <Box sx={{ ml: 5 }}>
          <CustomTypographyTableCell>
            {replaceCharacter(cellValues.value, "_", " ")}
          </CustomTypographyTableCell>
        </Box>
      ),
    },
    {
      field: "shiftStartTime",
      display: "flex",
      renderHeader: (params) => (
        <CustomTypographyTableHeader title="Shift Start Time" />
      ),
      width: width / 4,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => (
        <CustomTypographyTableCell>
          {cellValues.value
            ? dayjs(getHourAndMinuteFromTime(cellValues.value)).format(
                "hh:mm:A"
              )
            : ""}
        </CustomTypographyTableCell>
      ),
    },
    {
      field: "shiftEndTime",
      display: "flex",
      renderHeader: (params) => (
        <CustomTypographyTableHeader title="Shift End Time" />
      ),
      width: width / 4,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => (
        <CustomTypographyTableCell>
          {cellValues.value
            ? dayjs(getHourAndMinuteFromTime(cellValues.value)).format(
                "hh:mm:A"
              )
            : ""}
        </CustomTypographyTableCell>
      ),
    },
    {
      field: "actions",
      type: "actions",
      display: "flex",
      width: width / 4,
      // renderHeader: (params) => <CustomTypographyTableHeader title="" />,
      headerClassName: "super-app-theme--header",
      // align: "left",
      // headerAlign: "left",
      getActions: (params) => [
        <UpdateShiftMain params={params} companyList={companyList} />,
      ],
    },
  ];

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Box>
              <CustomDataGridNew
                columns={columns(width - 145)}
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

export default DefineShiftTableComponent;
