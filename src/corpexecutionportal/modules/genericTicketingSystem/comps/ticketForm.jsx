import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import {
  getCompanyList,
  getSessionTypeList,
} from "../../../services/genericTicketingSystem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TicketForm = ({ formValues, setFormValues }) => {
  const [sessionTypeList, setSessionTypeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    getSessionTypeList(setSessionTypeList);
    getCompanyList(setCompanyList);
  }, []);

  console.log({ companyList, sessionTypeList });
  return (
    <Fragment>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={2}>
          <Grid
            item
            lg={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Company Name</Typography>
              </Stack>
              <Box sx={{ minWidth: 400 }}>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    size="small"
                    fullWidth
                    value={formValues.company}
                    label=""
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        company: e.target.value,
                      })
                    }
                  >
                    <MenuItem disabled value="">
                      <em>Select Company...</em>
                    </MenuItem>
                    {companyList.map((value, index) => (
                      <MenuItem value={value} key={index}>
                        {value.orgName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            lg={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Seesion Date</Typography>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label=""
                  value={formValues.date}
                  onChange={(newValue) =>
                    setFormValues({ ...formValues, date: newValue })
                  }
                  slotProps={{ textField: { size: "small" } }}
                  format="LL"
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid
            item
            lg={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Session Type</Typography>
              </Stack>
              <Box sx={{ minWidth: 500 }}>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    size="small"
                    fullWidth
                    value={formValues.sessionType}
                    label=""
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        sessionType: e.target.value,
                      })
                    }
                  >
                    <MenuItem disabled value="">
                      <em>Select Session Type...</em>
                    </MenuItem>
                    {sessionTypeList.map((value, index) => (
                      <MenuItem value={value} key={index}>
                        {value.sessionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketForm;
