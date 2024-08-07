import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import useWindowDimensions from "../../../../../assets/customHooks/customhooks";
import CustomDataGridNew from "../../../../../assets/globalDataGridLayout/CustomDataGridNew";
import dayjs from "dayjs";
import {
  PaymentStatusColor,
  PaymentStatusList,
} from "../../../../assets/corpConstants";
import { PhotoViewer } from "../../../../../assets/customPhotoViewer/photoViewer";
import UpdateInvoiceMain from "../../addInvoice/UpdateInvoiceMain";
import {
  CustomTypographyTableCell,
  CustomTypographyTableHeader,
} from "../../../../assets/customTypography/CustomTypography";

const TableComponent = ({ companyInvoiceData, getInvoiceDetailsByCorpId }) => {
  let { height, width } = useWindowDimensions();

  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const handleClickOpen = (url) => {
    setOpen(true);
    setImageUrl(url);
  };

  const handleClose = () => {
    setOpen(false);
    setImageUrl(null);
  };

  const formData = new FormData();

  const editInvoice = (data) => {
    console.log({ data123: data });
  };
  const columns = (width) =>
    useMemo(
      () => [
        {
          field: "invoiceDate",
          display: "flex",
          renderHeader: (params) => (
            <Box sx={{ ml: 5 }}>
              <CustomTypographyTableHeader title="Invoice Date" />
            </Box>
          ),
          width: width / 8,
          headerClassName: "super-app-theme--header",
          align: "left",
          headerAlign: "left",
          renderCell: (cellValues) => (
            <Box sx={{ ml: 5 }}>
              <CustomTypographyTableCell>
                {cellValues.value ? dayjs(cellValues.value).format("LL") : ""}
              </CustomTypographyTableCell>{" "}
            </Box>
          ),
        },
        {
          field: "serviceDetails",
          display: "flex",
          renderHeader: (params) => (
            <CustomTypographyTableHeader title="Service Details" />
          ),
          width: (5 * width) / 16,
          headerClassName: "super-app-theme--header",
          align: "left",
          headerAlign: "left",
          renderCell: (cellValues) => (
            <CustomTypographyTableCell>
              {cellValues.value}
            </CustomTypographyTableCell>
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
            <CustomTypographyTableCell>
              {cellValues.value}
            </CustomTypographyTableCell>
          ),
        },
        {
          field: "totalReceivableAmount",
          display: "flex",
          renderHeader: (params) => (
            <CustomTypographyTableHeader title="Total Receivables" />
          ),
          width: width / 8,
          headerClassName: "super-app-theme--header",
          align: "center",
          headerAlign: "center",
          renderCell: (cellValues) => (
            <CustomTypographyTableCell>
              {cellValues.value}
            </CustomTypographyTableCell>
          ),
        },
        {
          field: "paymentStatus",
          display: "flex",
          renderHeader: (params) => (
            <CustomTypographyTableHeader title="Payment Status" />
          ),
          width: width / 8,
          headerClassName: "super-app-theme--header",
          align: "left",
          headerAlign: "left",
          renderCell: (cellValues) => (
            <CustomTypographyTableCell
              color={PaymentStatusColor[cellValues.value]}
            >
              {cellValues.value
                ? PaymentStatusList.find((v) => v.value === cellValues.value)
                    ?.label
                : ""}
            </CustomTypographyTableCell>
          ),
        },
        {
          field: "invoiceUrl",
          display: "flex",
          renderHeader: (params) => (
            <CustomTypographyTableHeader title="Invoice Action" />
          ),
          width: width / 8,
          headerClassName: "super-app-theme--header",
          align: "center",
          headerAlign: "center",
          renderCell: (cellValues) => (
            <IconButton
              disabled={cellValues.value ? false : true}
              aria-label="open"
              size="small"
              onClick={() => {
                handleClickOpen(cellValues.value);
              }}
            >
              <CustomTypographyTableCell color="#127DDD">
                View File
              </CustomTypographyTableCell>
            </IconButton>
          ),
        },
        {
          field: "actions",
          type: "actions",
          display: "flex",
          width: width / 16,
          // renderHeader: (params) => <CustomTypographyTableHeader title="" />,
          headerClassName: "super-app-theme--header",
          // align: "left",
          // headerAlign: "left",
          getActions: (params) => [
            <UpdateInvoiceMain
              getInvoiceList={getInvoiceDetailsByCorpId}
              formData={formData}
              params={params}
            />,
          ],
        },
      ],
      [editInvoice]
    );

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Box>
              <CustomDataGridNew
                adjustHeight={200}
                columns={columns(width - 96)}
                rows={companyInvoiceData}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <PhotoViewer url={imageUrl} open={open} handleClose={handleClose} />
    </Fragment>
  );
};

export default TableComponent;
