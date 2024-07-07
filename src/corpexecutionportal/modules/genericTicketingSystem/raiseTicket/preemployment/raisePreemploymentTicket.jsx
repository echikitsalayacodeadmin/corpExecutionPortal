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
import SingleUpload from "../../comps/singleUpload";

const RaisePreemploymentTicket = ({
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
                <Typography sx={{ fontSize: 10 }}>Name</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.empName || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, empName: e.target.value })
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
                <Typography sx={{ fontSize: 10 }}> Date</Typography>
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
            lg={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2} flex={1}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Test Type</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.testType || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, testType: e.target.value })
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
                <Typography sx={{ fontSize: 10 }}>Department</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.department || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, department: e.target.value })
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
                <Typography sx={{ fontSize: 10 }}>
                  Employee ID or temporary ID
                </Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.empId || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, empId: e.target.value })
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
                <Typography sx={{ fontSize: 10 }}>Place</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.place || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, place: e.target.value })
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
                <Typography sx={{ fontSize: 10 }}>
                  Employee Contact No.
                </Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.mobile || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, mobile: e.target.value })
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
                <Typography sx={{ fontSize: 10 }}>HR Contact No.</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.hrMobile || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, hrMobile: e.target.value })
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
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Package</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.packageName || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    packageName: e.target.value,
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
                <Typography sx={{ fontSize: 10 }}>Upload File</Typography>
              </Stack>
              <SingleUpload title={"Attachment"} formData={formData} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaisePreemploymentTicket;
