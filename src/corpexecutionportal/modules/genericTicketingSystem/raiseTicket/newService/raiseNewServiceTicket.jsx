import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ServiceList } from "../../../../assets/corpConstants";

const RaiseNewServiceTicket = ({
  formValues,
  setFormValues,
  selectedTicketType,
  formData,
}) => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            lg={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2} flex={1}>
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
            lg={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2} flex={1}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Service</Typography>
              </Stack>
              <Box sx={{ minWidth: 400 }}>
                <FormControl fullWidth>
                  <Select
                    displayEmpty
                    size="small"
                    fullWidth
                    value={formValues.service || ""}
                    label=""
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        service: e.target.value,
                      })
                    }
                  >
                    <MenuItem disabled value="">
                      <em>Select frontend owner...</em>
                    </MenuItem>
                    {ServiceList.map((value, index) => (
                      <MenuItem value={value} key={index}>
                        {value.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            lg={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2} flex={1}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>
                  Additional Details
                </Typography>
              </Stack>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter Additional Details..."
                value={formValues.additionalDetails || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    additionalDetails: e.target.value,
                  })
                }
              />
            </Stack>
          </Grid>

          <Grid
            item
            lg={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2} flex={1}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Preferred Date</Typography>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label=""
                  value={formValues.preferredDate || null}
                  onChange={(newValue) =>
                    setFormValues({ ...formValues, preferredDate: newValue })
                  }
                  slotProps={{ textField: { size: "small" } }}
                  format="LL"
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseNewServiceTicket;
