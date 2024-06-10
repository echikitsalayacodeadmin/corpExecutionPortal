import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Fragment, useEffect, useState } from "react";
import {
  getCompanyList,
  getSessionTypeList,
} from "../../../services/genericTicketingSystem";
import { StatusList, TicketCategoryList } from "../../../assets/corpConstants";

const DashboardFilters = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  status,
  setStatus,
  selectedCompany,
  setSelectedCompany,
  ticketType,
  setTicketType,
  searchText,
  setSearchText,
}) => {
  const [sessionTypeList, setSessionTypeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    getSessionTypeList(setSessionTypeList);
    getCompanyList(setCompanyList);
  }, []);

  return (
    <Fragment>
      <Box sx={{ py: 0 }}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <Autocomplete
              fullWidth
              value={ticketType}
              onChange={(event, newValue) => {
                setTicketType(newValue);
              }}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={TicketCategoryList}
              renderInput={(params) => (
                <TextField {...params} label="Ticket type" />
              )}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              fullWidth
              size="small"
              label="Seacrh"
              placeholder="seacrh by name, ID etc."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>
          <Grid item lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                format="LL"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                format="LL"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={3}>
            <Autocomplete
              fullWidth
              value={status}
              onChange={(event, newValue) => {
                setStatus(newValue);
              }}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={StatusList}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </Grid>
          <Grid item lg={3}>
            <Autocomplete
              fullWidth
              value={selectedCompany}
              onChange={(event, newValue) => {
                setSelectedCompany(newValue);
              }}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={companyList}
              renderInput={(params) => (
                <TextField {...params} label="Raised by" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardFilters;
