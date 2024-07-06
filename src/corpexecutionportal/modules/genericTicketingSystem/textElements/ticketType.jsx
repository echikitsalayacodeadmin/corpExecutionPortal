import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const TicketType = ({ data }) => {
  let { ticketType } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Ticket Type:</Typography>
        <Typography>{ticketType}</Typography>
      </Stack>
    </Fragment>
  );
};

export default TicketType;
