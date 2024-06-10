import {
  Box,
  FormControl,
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
            <Box sx={{ minWidth: 400 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{ fontSize: 14 }}>
                  Ticket type
                </InputLabel>
                <Select
                  size="small"
                  fullWidth
                  value={ticketType}
                  label="Ticket type"
                  onChange={(e) => setTicketType(e.target.value)}
                >
                  {TicketCategoryList.map((value, index) => (
                    <MenuItem value={value} key={index}>
                      {value.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Status
                </InputLabel>
                <Select
                  size="small"
                  fullWidth
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {StatusList.map((value, index) => (
                    <MenuItem value={value} key={index}>
                      {value.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{ fontSize: 14 }}>
                  Raised by
                </InputLabel>
                <Select
                  size="small"
                  fullWidth
                  value={selectedCompany}
                  label="Raised by"
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  {companyList.map((value, index) => (
                    <MenuItem value={value} key={index}>
                      {value.orgName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DashboardFilters;
