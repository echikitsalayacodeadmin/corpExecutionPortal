import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import TableComponent from "./comps/TableComponent";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import AddInvoiceMain from "./addInvoice/AddInvoiceMain";
import { BASE_URL } from "../../../assets/constants";
import { getData } from "../../assets/corpServices";
import SearchIcon from "@mui/icons-material/Search";
import AddCompanyMain from "./addInvoice/AddCompanyMain";

const AccountReceivableMain = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListFiltered, setInvoiceListFiltered] = useState([]);

  const getInvoiceList = async () => {
    const url = BASE_URL + `invoice/getAccountReceivables`;

    const response = await getData(url);

    if (response.error) {
      setInvoiceList([]);
    } else {
      setInvoiceList(
        response.data?.map((invoice, index) => ({ ...invoice, id: index + 1 }))
      );
    }
  };

  useEffect(() => {
    getInvoiceList();
  }, []);

  const formData = new FormData();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText) {
      setInvoiceListFiltered(
        invoiceList.filter((invoice) =>
          invoice.companyName?.toLowerCase().includes(searchText?.toLowerCase())
        )
      );
    } else {
      setInvoiceListFiltered(invoiceList);
    }
  }, [searchText, invoiceList]);

  console.log({ invoiceListFiltered });

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Account Receivable Management">
        <Box>
          <Grid container spacing={1}>
            <Grid item lg={5}>
              <TextField
                fullWidth
                size="small"
                label="search company"
                placeholder="search company..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Grid>

            <Grid item lg={7} display="flex" justifyContent="flex-end">
              <AddCompanyMain
                label="Add New Company"
                getInvoiceList={getInvoiceList}
                formData={formData}
              />
            </Grid>
            <Grid item lg={12}>
              <TableComponent data={invoiceListFiltered} />
            </Grid>
          </Grid>
        </Box>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default AccountReceivableMain;
