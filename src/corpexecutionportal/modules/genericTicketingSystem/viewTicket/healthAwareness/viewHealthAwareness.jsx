import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getSessionTypeList,
  updateTicket,
} from "../../../../services/genericTicketingSystem";
import { StatusListForNonFilter } from "../../../../assets/corpConstants";
import CommonTicketHeader from "../../textElements/commonTicketHeader";
import SessionType from "../../textElements/sessionType";
import SessionDateForm from "../../formElements/sessionDateForm";
import StatusForm from "../../formElements/statusForm";
import DoctorName from "../../formElements/doctorName";

const ViewHealthAwareness = ({ data }) => {
  const [date, setDate] = useState(
    data?.ticketInfo?.sessionDate
      ? dayjs(data?.ticketInfo?.sessionDate)
      : dayjs()
  );

  const [formValues, setFormValues] = useState({
    status:
      StatusListForNonFilter.find((value) => value.value === data.status) || "",
    doctorName: data?.ticketInfo?.doctorName || "",
  });
  const [sessionStartDate, setSessionStartDate] = useState(
    data?.ticketInfo?.sessionStartDate
      ? dayjs(data?.ticketInfo?.sessionStartDate)
      : null
  );
  const [sessionEndDate, setSessionEndDate] = useState(
    data?.ticketInfo?.sessionEndDate
      ? dayjs(data?.ticketInfo?.sessionEndDate)
      : null
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
            <CommonTicketHeader data={data} />
          </Grid>
          <Grid item lg={4}>
            <SessionType data={data} />
          </Grid>
          <Grid item lg={4}>
            <SessionDateForm date={date} setDate={setDate} />
          </Grid>
          <Grid item lg={4}>
            <StatusForm
              formValues={formValues}
              setFormValues={setFormValues}
              statusList={StatusListForNonFilter}
            />
          </Grid>
          <Grid item lg={4}>
            <DoctorName formValues={formValues} setFormValues={setFormValues} />
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
                  sessionStartDate,
                  sessionEndDate,
                  formValues
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

export default ViewHealthAwareness;
