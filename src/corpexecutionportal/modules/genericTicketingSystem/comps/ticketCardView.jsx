import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
const TicketCardView = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box
        onClick={() =>
          navigate(`/corp/ticketview/${ticket}`, { state: ticket })
        }
      >
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Box
              sx={{
                minWidth: 275,
                background: "lightgreen",
                pl: 3,
                borderRadius: 5,
              }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Stack direction={"row"}>
                    <Grid container spacing={1}>
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
                              Number
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontSize: 14 }}>
                            {ticket?.ticketId}
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
                            <Typography sx={{ fontSize: 10 }}>Date</Typography>
                          </Stack>
                          <Typography sx={{ fontSize: 14 }}>
                            {ticket?.date}
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
                            <Typography sx={{ fontSize: 10 }}>Type</Typography>
                          </Stack>
                          <Typography sx={{ fontSize: 14 }}>
                            {ticket?.ticketType}
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
                              Company Name
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontSize: 14 }}>
                            {ticket?.corpName}
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
                              Employee Name
                            </Typography>
                          </Stack>
                          <Typography sx={{ fontSize: 14 }}>
                            {ticket?.raisedBy}
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
                        <Box
                          component={Stack}
                          sx={{
                            background: "lightgreen",
                            px: 3,
                            py: 1,
                            borderRadius: 3,
                            minWidth: 210,
                            minHeight: 40,
                          }}
                          direction="row"
                          spacing={1}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <NotificationsIcon fontSize="10" />
                          <Typography sx={{ fontSize: 14 }}>
                            {ticket?.status}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketCardView;
