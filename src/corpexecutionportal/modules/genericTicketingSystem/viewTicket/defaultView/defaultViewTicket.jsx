import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import TicketNumber from "../../textElements/ticketNumber";
import CreatedBy from "../../textElements/createdBy";
import Company from "../../textElements/company";
import Attachment from "../../textElements/attachment";
import Status from "../../textElements/status";
import TicketType from "../../textElements/ticketType";
import CommonTicketHeader from "../../textElements/commonTicketHeader";

const DefaultViewTicket = ({ data }) => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <CommonTicketHeader data={data} />
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
