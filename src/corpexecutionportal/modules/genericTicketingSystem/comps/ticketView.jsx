import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import BackHandIcon from "@mui/icons-material/BackHand";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import dayjs from "dayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getSessionTypeList,
  updateTicket,
} from "../../../services/genericTicketingSystem";
import {
  StatusListForNonFilter,
  TicketCategoryList,
} from "../../../assets/corpConstants";
import {
  CompanyNameIcon,
  DateIcon,
  DateIcon1,
  NumberIcon,
  TypeIcon,
} from "../../../../assets/customIcons";

const TicketView = ({ data }) => {
  const [date, setDate] = useState(
    data?.ticketInfo?.sessionDate
      ? dayjs(data?.ticketInfo?.sessionDate)
      : dayjs()
  );
  const [status, setStatus] = useState(
    StatusListForNonFilter.filter((value) => value.value === data.status)[0] ||
      ""
  );

  const [doctorName, setDoctorName] = useState(
    data?.ticketInfo?.doctorName || ""
  );
  const [sessionStartDate, setSessionStartDate] = useState(
    dayjs(data?.ticketInfo?.sessionStartDate) || null
  );
  const [sessionEndDate, setSessionEndDate] = useState(
    dayjs(data?.ticketInfo?.sessionEndDate) || null
  );

  const [checked, setChecked] = useState(true);
  const [breakTime, setBreakTime] = useState(15);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setBreakTime(event.target.checked ? 15 : 0);
    setSessionEndDate(
      sessionStartDate.add(duration + (event.target.checked ? 15 : 0), "Minute")
    );
  };

  const [sessionTypeList, setSessionTypeList] = useState([]);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    getSessionTypeList(setSessionTypeList);
  }, []);

  useEffect(() => {
    setDuration(
      parseInt(
        sessionTypeList.find(
          (a) => a.sessionName === data.ticketInfo?.sessionName
        )?.duration
      ) || 0
    );
  }, [sessionTypeList]);
  console.log({ data123: data, sessionStartDate, sessionTypeList, duration });

  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1}>
                  <Grid
                    item
                    lg={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <NumberIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>Number</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        {data.ticketId}
                      </Typography>
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
                        <CompanyNameIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>Company</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        {data.corpName}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    lg={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <DateIcon1 fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Ticket Date
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        {data.date ? dayjs(data.date).format("LL") : ""}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    lg={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <TypeIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Ticket Type
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        {TicketCategoryList.find(
                          (element) => element.ticketType === data.ticketType
                        )?.label || "n/a"}
                      </Typography>
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
                        <BackHandIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>Raised By</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        {data.raisedBy || "n/a"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1}>
                  <Grid
                    item
                    lg={12}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Stack spacing={2} sx={{ height: 73 }}>
                      <Stack direction="row" spacing={1}>
                        <HorizontalSplitIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Seesion Type
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 18 }}>
                        {data.ticketInfo?.sessionName || "n/a"}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1}>
                  <Grid
                    item
                    lg={12}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <DateRangeIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Seesion Date
                        </Typography>
                      </Stack>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label=""
                          value={date}
                          onChange={(newValue) => setDate(newValue)}
                          slotProps={{
                            textField: { size: "small", fullWidth: true },
                          }}
                          format="LL"
                        />
                      </LocalizationProvider>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1}>
                  <Grid
                    item
                    lg={12}
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <SplitscreenIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Ticket Status
                        </Typography>
                      </Stack>
                      <Box sx={{ minWidth: 300 }}>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            fullWidth
                            value={status}
                            label=""
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {StatusListForNonFilter.map((value, index) => (
                              <MenuItem value={value} key={index}>
                                {value.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <PersonIcon fontSize="10" />
                    <Typography sx={{ fontSize: 10 }}>
                      Doctor/Instructor name
                    </Typography>
                  </Stack>

                  <TextField
                    size="small"
                    fullWidth
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Enter doctor name"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1}>
                      <AccessTimeIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>
                        Session Start Time
                      </Typography>
                    </Stack>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            size="small"
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="15 mins break"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </Stack>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label=""
                      value={sessionStartDate}
                      onChange={(newValue) => {
                        setSessionStartDate(newValue);
                        setSessionEndDate(
                          newValue.add(duration + breakTime, "Minute")
                        );
                      }}
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <AccessTimeIcon fontSize="10" />
                    <Typography sx={{ fontSize: 10 }}>
                      Session End Time
                    </Typography>
                  </Stack>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      readOnly
                      label=""
                      value={sessionEndDate}
                      onChange={(newValue) => setSessionEndDate(newValue)}
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={12} display="flex" justifyContent="center">
            <Button
              sx={{ width: 200 }}
              variant="contained"
              onClick={() =>
                updateTicket(
                  data,
                  date,
                  status,
                  doctorName,
                  sessionStartDate,
                  sessionEndDate
                )
              }
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketView;
