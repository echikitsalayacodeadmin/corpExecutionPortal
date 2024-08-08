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
    field: "companyName",
    display: "flex",
    renderHeader: (params) => (
      <Box sx={{ ml: 5 }}>
        <CustomTypographyTableHeader title="Staff Name" />
      </Box>
    ),
    width: width / 3,
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
    field: "totalInvoices",
    display: "flex",
    renderHeader: (params) => <CustomTypographyTableHeader title="Company" />,
    width: width / 3,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "paymentPending",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Mobile Number" />
    ),
    width: width / 3,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
];

const StaffViewTableComponent = ({ data = [] }) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

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
              <TextField placeholder="Seacrh Staff..." size="small" fullWidth />
              <CustomSelectNew
                width={"100%"}
                placeholder="Company filter"
                formValues={formValues}
                setFormValues={setFormValues}
                borderRadius={3.5}
              />

              <AddNewStaffMain label="Add New Staff" />
            </Stack>
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

export default StaffViewTableComponent;
