import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import TicketNumber from "../../textElements/ticketNumber";
import CreatedBy from "../../textElements/createdBy";
import Company from "../../textElements/company";
import Attachment from "../../textElements/attachment";
import Status from "../../textElements/status";
import TicketType from "../../textElements/ticketType";

const DefaultViewTicket = ({ data }) => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <TicketNumber data={data} />
          </Grid>
          <Grid item lg={12}>
            <CreatedBy data={data} />
          </Grid>
          <Grid item lg={12}>
            <Company data={data} />
          </Grid>
          <Grid item lg={12}>
            <TicketType data={data} />
          </Grid>
          <Grid item lg={12}>
            <Status data={data} />
          </Grid>
          <Grid item lg={12}>
            <Attachment data={data} />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default DefaultViewTicket;
