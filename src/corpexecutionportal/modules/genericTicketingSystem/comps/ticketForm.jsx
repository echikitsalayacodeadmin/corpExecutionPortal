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
import {
  getCompanyList,
  getSessionTypeList,
} from "../../../services/genericTicketingSystem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SingleUpload from "./singleUpload";
import {
  ServiceList,
  backendOwner,
  frontendOwner,
  productList,
} from "../../../assets/corpConstants";

const TicketForm = ({
  formValues,
  setFormValues,
  selectedTicketType,
  formData,
}) => {
  const [sessionTypeList, setSessionTypeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    getSessionTypeList(setSessionTypeList);
    getCompanyList(setCompanyList);
  }, []);

  console.log({ companyList, sessionTypeList });

  if (selectedTicketType?.ticketType === "SALES_OPS") {
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
              lg={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={2} flex={1}>
                <Stack direction="row" spacing={1}>
                  <BookIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Requirement</Typography>
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter requirement..."
                  value={formValues.requirement || ""}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      requirement: e.target.value,
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
                  <Typography sx={{ fontSize: 10 }}>Target Date</Typography>
                </Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label=""
                    value={formValues.targetDate}
                    onChange={(newValue) =>
                      setFormValues({ ...formValues, targetDate: newValue })
                    }
                    slotProps={{ textField: { size: "small" } }}
                    format="LL"
                  />
                </LocalizationProvider>
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
  } else if (selectedTicketType?.ticketType === "OPS_TECH") {
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
              lg={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={2} flex={1}>
                <Stack direction="row" spacing={1}>
                  <BookIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Task</Typography>
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter task..."
                  value={formValues.task || ""}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      task: e.target.value,
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
                  <Typography sx={{ fontSize: 10 }}>Target Date</Typography>
                </Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label=""
                    value={formValues.targetDate}
                    onChange={(newValue) =>
                      setFormValues({ ...formValues, targetDate: newValue })
                    }
                    slotProps={{ textField: { size: "small" } }}
                    format="LL"
                  />
                </LocalizationProvider>
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
  } else if (selectedTicketType?.ticketType === "TECH_INTERNAL") {
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
              <Stack spacing={2} flex={1}>
                <Stack direction="row" spacing={1}>
                  <BookIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Product</Typography>
                </Stack>
                <Box sx={{ minWidth: 400 }}>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      size="small"
                      fullWidth
                      value={formValues.product || ""}
                      label=""
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          product: e.target.value,
                        })
                      }
                    >
                      <MenuItem disabled value="">
                        <em>Select Product...</em>
                      </MenuItem>
                      {productList.map((value, index) => (
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
              lg={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={2} flex={1}>
                <Stack direction="row" spacing={1}>
                  <BookIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Backend owner</Typography>
                </Stack>
                <Box sx={{ minWidth: 400 }}>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      size="small"
                      fullWidth
                      value={formValues.backendOwner || ""}
                      label=""
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          backendOwner: e.target.value,
                        })
                      }
                    >
                      <MenuItem disabled value="">
                        <em>Select backend owner...</em>
                      </MenuItem>
                      {backendOwner.map((value, index) => (
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
              lg={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={2} flex={1}>
                <Stack direction="row" spacing={1}>
                  <BookIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Frontend owner</Typography>
                </Stack>
                <Box sx={{ minWidth: 400 }}>
                  <FormControl fullWidth>
                    <Select
                      displayEmpty
                      size="small"
                      fullWidth
                      value={formValues.frontendOwner || ""}
                      label=""
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          frontendOwner: e.target.value,
                        })
                      }
                    >
                      <MenuItem disabled value="">
                        <em>Select frontend owner...</em>
                      </MenuItem>
                      {frontendOwner.map((value, index) => (
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
                  <Typography sx={{ fontSize: 10 }}>Task</Typography>
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter requirement..."
                  value={formValues.task || ""}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      task: e.target.value,
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
                  <Typography sx={{ fontSize: 10 }}>Target Date</Typography>
                </Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label=""
                    value={formValues.targetDate || ""}
                    onChange={(newValue) =>
                      setFormValues({ ...formValues, targetDate: newValue })
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
  } else if (selectedTicketType?.ticketType === "EMERGENCY") {
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
  } else if (selectedTicketType?.ticketType === "NEW_SERVICE_INQUIRY") {
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
  } else if (selectedTicketType?.ticketType === "SERVICE_ISSUE") {
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
              lg={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={2} flex={1}>
                <Stack direction="row" spacing={1}>
                  <BookIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Service Name</Typography>
                </Stack>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter Service Name..."
                  value={formValues.serviceName || ""}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      serviceName: e.target.value,
                    })
                  }
                />
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
  } else if (selectedTicketType?.ticketType === "PRE_EMPLOYMENT") {
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
  }
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
