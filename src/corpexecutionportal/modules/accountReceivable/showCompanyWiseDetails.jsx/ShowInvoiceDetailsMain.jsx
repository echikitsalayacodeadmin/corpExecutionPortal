import { Box, Button, Grid, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import TableComponent from "./comps/TableComponent";
import AddInvoiceMain from "../addInvoice/AddInvoiceMain";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";
import PaymentStatusFilter from "../addInvoice/comps/PaymentStatusFilter";

const ShowInvoiceDetailsMain = () => {
  let { corpId } = useParams();
  const [companyInvoiceData, setCompanyInvoiceData] = useState([]);
  const [companyInvoiceDataFiltered, setCompanyInvoiceDataFiltered] = useState(
    []
  );

  const getInvoiceDetailsByCorpId = async () => {
    const url = BASE_URL + `invoice/corp/getInvoice/${corpId}`;
    const res = await getData(url);

    if (res.error) {
      setCompanyInvoiceData([]);
    } else {
      setCompanyInvoiceData(res.data);
    }
  };

  useEffect(() => {
    getInvoiceDetailsByCorpId();
  }, [corpId]);

  console.log({ companyInvoiceData });
  const formData = new FormData();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({});
  console.log({ data });

  useEffect(() => {
    if (searchText && data?.paymentStatus) {
      setCompanyInvoiceDataFiltered(
        companyInvoiceData.filter(
          (invoice) =>
            invoice.serviceDetails
              ?.toLowerCase()
              .includes(searchText?.toLowerCase()) &&
            invoice.paymentStatus === data?.paymentStatus
        )
      );
    } else if (searchText) {
      setCompanyInvoiceDataFiltered(
        companyInvoiceData.filter((invoice) =>
          invoice.serviceDetails
            ?.toLowerCase()
            .includes(searchText?.toLowerCase())
        )
      );
    } else if (data?.paymentStatus) {
      setCompanyInvoiceDataFiltered(
        companyInvoiceData.filter(
          (invoice) => invoice.paymentStatus === data?.paymentStatus
        )
      );
    } else {
      setCompanyInvoiceDataFiltered(companyInvoiceData);
    }
  }, [searchText, companyInvoiceData, data]);

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Account Receivable Details">
        <Box>
          <Grid container spacing={1}>
            <Grid item lg={5}>
              <TextField
                fullWidth
                size="small"
                label="Service Details"
                placeholder="Service Details..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Grid>

            <Grid item lg={4}>
              <PaymentStatusFilter formValues={data} setFormValues={setData} />
            </Grid>

            <Grid item lg={3} display="flex" justifyContent="flex-end">
              <AddInvoiceMain
                label="Add New Invoice"
                getInvoiceList={getInvoiceDetailsByCorpId}
                formData={formData}
                corpId={corpId}
              />
            </Grid>
            <Grid item lg={12}>
              <TableComponent
                companyInvoiceData={companyInvoiceDataFiltered}
                getInvoiceDetailsByCorpId={getInvoiceDetailsByCorpId}
              />
            </Grid>
          </Grid>
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default ShowInvoiceDetailsMain;
