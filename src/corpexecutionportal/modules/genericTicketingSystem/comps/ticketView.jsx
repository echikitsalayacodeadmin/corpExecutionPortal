import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import NotificationsIcon from "@mui/icons-material/Notifications";

const TicketView = () => {
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
                      <Typography sx={{ fontSize: 14 }}>ASI02324</Typography>
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
                        <Typography sx={{ fontSize: 10 }}>
                          Ticket Date
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>05.06.2024</Typography>
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
                        <Typography sx={{ fontSize: 10 }}>
                          Ticket Type
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14 }}>
                        Awareness Session
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
                        Optosol business solution
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
                          Seesion Type
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 18 }}>
                        Awareness Session
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
                      <TextField type="date" size="small" />
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
                      <TextField size="small" placeholder="Pending" />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={12} display="flex" justifyContent="center">
            <Button variant="outlined" onClick={() => console.log("hi")}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketView;
