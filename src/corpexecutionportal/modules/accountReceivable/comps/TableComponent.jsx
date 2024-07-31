import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import useWindowDimensions from "../../../../assets/customHooks/customhooks";
import { useNavigate } from "react-router-dom";
import CustomDataGridNew from "../../../../assets/globalDataGridLayout/CustomDataGridNew";
import {
  CustomTypographyTableCell,
  CustomTypographyTableHeader,
} from "../../../assets/customTypography/CustomTypography";

const columns = (width) => [
  {
    field: "companyName",
    display: "flex",
    renderHeader: (params) => (
      <Box sx={{ ml: 5 }}>
        <CustomTypographyTableHeader title="Company Name" />
      </Box>
    ),
    width: (3 * width) / 8 - 30,
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
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Total Invoice" />
    ),
    width: width / 8,
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
      <CustomTypographyTableHeader title="Payment Pending" />
    ),
    width: width / 8,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
  {
    field: "paymentReceived",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Payment Received" />
    ),
    width: width / 8,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },

  {
    field: "totalInvoiceAmount",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Total Invoice Amount" />
    ),
    width: width / 8,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },

  {
    field: "totalReceivedAmount",
    display: "flex",
    renderHeader: (params) => (
      <CustomTypographyTableHeader title="Total Received Amount" />
    ),
    width: width / 8 + 30,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: (cellValues) => (
      <CustomTypographyTableCell>{cellValues.value}</CustomTypographyTableCell>
    ),
  },
];

const TableComponent = ({ data }) => {
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Box>
              <CustomDataGridNew
                columns={columns(width - 96)}
                rows={data}
                onRowClick={(params) =>
                  navigate(
                    `/corp/accountreceivable/details/${params.row.corpId}`
                  )
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TableComponent;
