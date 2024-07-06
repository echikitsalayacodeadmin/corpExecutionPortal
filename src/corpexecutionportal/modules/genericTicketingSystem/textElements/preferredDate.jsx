import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";

const PreferredDate = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Preferred Date:</Typography>
        <Typography>
          {ticketInfo?.preferredDate
            ? dayjs(ticketInfo?.preferredDate).format("LL")
            : ""}
        </Typography>
      </Stack>
    </Fragment>
  );
};

export default PreferredDate;
