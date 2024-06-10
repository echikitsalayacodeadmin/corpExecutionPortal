import {
  Box,
  FormControl,
  Grid,
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
import { TicketCategoryList } from "../raiseNewTicketMain";

const StatusList = [
  {
    id: 1,
    label: "All",
    value: "ALL",
  },
  {
    id: 1,
    label: "Pending",
    value: "Pending",
  },
  {
    id: 1,
    label: "Completed",
    value: "Completed",
  },
];

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
                <Select
                  size="small"
                  fullWidth
                  value={ticketType}
                  label=""
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
            <Box sx={{ minWidth: 400 }}>
              <FormControl fullWidth>
                <Select
                  size="small"
                  fullWidth
                  value={status}
                  label=""
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
            <Box sx={{ minWidth: 400 }}>
              <FormControl fullWidth>
                <Select
                  size="small"
                  fullWidth
                  value={selectedCompany}
                  label=""
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
