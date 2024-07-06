import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  StatusListForNonFilter,
  StatusListOpsTicket,
  TicketCategoryList,
} from "../../../assets/corpConstants";
import {
  CompanyNameIcon,
  DateIcon,
  DateIcon1,
  ECGIcon,
  EmployeeIcon,
  NumberIcon,
  TypeIcon,
} from "../../../../assets/customIcons";
const TicketCardView = ({ ticket }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box
        onClick={() =>
          navigate(`/corp/ticketview/${ticket.ticketId}`, { state: ticket })
        }
      >
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Box>
              <Stack
                direction={"row"}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 15,
                    height: 80,
                    background:
                      StatusListForNonFilter.find(
                        (element) => element.value === ticket?.status
                      )?.color ||
                      StatusListOpsTicket.find(
                        (element) =>
                          element.value === ticket?.ticketInfo?.status
                      )?.color ||
                      "lightgray",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                ></Box>
                <Card variant="outlined" sx={{ width: "100%" }}>
                  <CardContent>
                    <Stack direction={"row"}>
                      <Grid container spacing={1}>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <NumberIcon fontSize="10" />
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
                              <DateIcon1 fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Date
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.date
                                ? dayjs(ticket?.date).format("LL")
                                : ""}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <TypeIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Type
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {TicketCategoryList.find(
                                (element) =>
                                  element.ticketType === ticket?.ticketType
                              )?.label || "n/a"}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <CompanyNameIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Company Name
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.corpName}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item lg={2} display="flex" alignItems="center">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={1}>
                              <EmployeeIcon fontSize="10" />
                              <Typography sx={{ fontSize: 10 }}>
                                Employee Name
                              </Typography>
                            </Stack>
                            <Typography sx={{ fontSize: 14 }}>
                              {ticket?.raisedBy || "n/a"}
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
                              background:
                                StatusListForNonFilter.find(
                                  (element) => element.value === ticket?.status
                                )?.color ||
                                StatusListOpsTicket.find(
                                  (element) =>
                                    element.value === ticket?.ticketInfo?.status
                                )?.color ||
                                "lightgray",
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
                            {StatusListForNonFilter.find(
                              (element) => element.value === ticket?.status
                            )?.icon ||
                              StatusListOpsTicket.find(
                                (element) =>
                                  element.value === ticket?.ticketInfo?.status
                              )?.icon || (
                                <NotificationsIcon
                                  fontSize="10"
                                  sx={{ color: "#fff" }}
                                />
                              )}
                            <Typography sx={{ fontSize: 14, color: "#fff" }}>
                              {StatusListForNonFilter.find(
                                (element) => element.value === ticket?.status
                              )?.label ||
                                StatusListOpsTicket.find(
                                  (element) =>
                                    element.value === ticket?.ticketInfo?.status
                                )?.label ||
                                ""}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketCardView;
