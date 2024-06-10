import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { updateTicket } from "../../../services/genericTicketingSystem";
import { StatusListForNonFilter } from "../../../assets/corpConstants";

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

  console.log({ data123: data });

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
                        <BookIcon fontSize="10" />
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
                        <BookIcon fontSize="10" />
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
                        <BookIcon fontSize="10" />
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
                        <BookIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Ticket Type
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        {data.ticketType}
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
                        <BookIcon fontSize="10" />
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
                        <BookIcon fontSize="10" />
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
                        <BookIcon fontSize="10" />
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
                        <BookIcon fontSize="10" />
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

          <Grid item lg={12} display="flex" justifyContent="center">
            <Button
              sx={{ width: 200 }}
              variant="contained"
              onClick={() => updateTicket(data, date, status)}
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
