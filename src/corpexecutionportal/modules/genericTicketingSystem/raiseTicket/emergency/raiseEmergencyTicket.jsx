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

const RaiseEmergencyTicket = ({
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
                <Typography sx={{ fontSize: 10 }}>Employee ID</Typography>
              </Stack>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter employee ID..."
                value={formValues.empId || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    empId: e.target.value,
                  })
                }
              />
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
                <Typography sx={{ fontSize: 10 }}>Employee Name</Typography>
              </Stack>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter name..."
                value={formValues.empName || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    empName: e.target.value,
                  })
                }
              />
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
                <Typography sx={{ fontSize: 10 }}>Issue</Typography>
              </Stack>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter Issue..."
                value={formValues.issue || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    issue: e.target.value,
                  })
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseEmergencyTicket;
