import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { TicketCategoryList } from "../../../assets/corpConstants";

const TicketType = ({ data }) => {
  let { ticketType } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Ticket Type:</Typography>
        <Typography>
          {TicketCategoryList.find(
            (element) => element.ticketType === ticketType
          )?.label || "n/a"}
        </Typography>
      </Stack>
    </Fragment>
  );
};

export default TicketType;
