import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { TicketCategoryList } from "../../../assets/corpConstants";
import { TypeIcon } from "../../../../assets/customIcons";

const TicketType = ({ data }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12}>
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
                      <TypeIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Ticket Type</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 18 }}>
                      {TicketCategoryList.find(
                        (element) => element.ticketType === data?.ticketType
                      )?.label || "n/a"}
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

export default TicketType;
