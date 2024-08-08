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
import dayjs from "dayjs";

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
          {cellValues.value}
        </CustomTypographyTableCell>{" "}
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
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
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
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "actions",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="" />,
    width: width / 4,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
];

const DefineShiftTableComponent = ({ data = [] }) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

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
