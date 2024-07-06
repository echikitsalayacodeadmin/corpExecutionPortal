import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";

const Date = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Date:</Typography>
        <Typography>
          {ticketInfo?.date ? dayjs(ticketInfo?.date).format("LL") : ""}
        </Typography>
      </Stack>
    </Fragment>
  );
};

export default Date;
