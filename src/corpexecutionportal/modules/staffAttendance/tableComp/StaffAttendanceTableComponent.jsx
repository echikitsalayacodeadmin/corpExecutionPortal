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

const columns = (width) => [
  {
    field: "date",
    display: "flex",
    renderHeader: (params) => (
      <Box sx={{ ml: 5 }}>
        <CustomTypographyTableHeader title="Date" />
      </Box>
    ),
    width: width / 6,
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
    field: "companyName",
    display: "flex",
    renderHeader: (params) => (
      <Box sx={{ ml: 5 }}>
        <CustomTypographyTableHeader title="Company" />
      </Box>
    ),
    width: width / 6,
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
    field: "chekInTime",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Time" />,
    width: width / 6,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "chekInImage",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Image" />,
    width: width / 6,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },

  {
    field: "chekOutTime",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Time" />,
    width: width / 6,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "chekOutImage",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Image" />,
    width: width / 6,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
];

const StaffAttendanceTableComponent = ({ data = [] }) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  const columnGroupingModel = [
    {
      groupId: "checkin_data",
      headerName: "Check In",
      headerAlign: "center",
      description: "",
      renderHeaderGroup: (params) => (
        <CustomTypographyTableHeader title={params.headerName} />
      ),
      children: [{ field: "chekInTime" }, { field: "chekInImage" }],
    },
    {
      groupId: "checkout_data",
      headerName: "Check Out",
      headerAlign: "center",
      description: "",
      renderHeaderGroup: (params) => (
        <CustomTypographyTableHeader title={params.headerName} />
      ),
      children: [{ field: "chekOutTime" }, { field: "chekOutImage" }],
    },
  ];

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Stack
              direction="row"
              spacing={1}
              display="flex"
              justifyContent="space-between"
            >
              <TextField placeholder="From Date..." size="small" fullWidth />
              <TextField placeholder="To Date..." size="small" fullWidth />
              <CustomSelectNew
                width={"100%"}
                placeholder="Aprroval Status filter"
                formValues={formValues}
                setFormValues={setFormValues}
                borderRadius={3.5}
              />
            </Stack>
          </Grid>
          <Grid item lg={12}>
            <Box>
              <CustomDataGridNew
                columns={columns(width - 96)}
                rows={data}
                adjustHeight={285}
                columnGroupingModel={columnGroupingModel}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default StaffAttendanceTableComponent;
