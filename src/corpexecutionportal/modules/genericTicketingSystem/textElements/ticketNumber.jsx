import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const TicketNumber = ({ data }) => {
  let { ticketId } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Ticket number:</Typography>
        <Typography>{ticketId}</Typography>
      </Stack>
    </Fragment>
  );
};

export default TicketNumber;
