import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import {
  CompanyNameIcon,
  DateIcon1,
  NumberIcon,
  TypeIcon,
} from "../../../../assets/customIcons";
import dayjs from "dayjs";
import { TicketCategoryList } from "../../../assets/corpConstants";
import BackHandIcon from "@mui/icons-material/BackHand";

const CommonTicketHeader = ({ data }) => {
  return (
    <Fragment>
      <Grid container>
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
                      {data?.ticketId}
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
                      {data?.corpName}
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
                      <Typography sx={{ fontSize: 10 }}>Ticket Date</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 14 }}>
                      {data?.date ? dayjs(data.date).format("LL") : ""}
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
                      <Typography sx={{ fontSize: 10 }}>Ticket Type</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 14 }}>
                      {TicketCategoryList.find(
                        (element) => element.ticketType === data?.ticketType
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
                      {data?.raisedBy || "n/a"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CommonTicketHeader;
