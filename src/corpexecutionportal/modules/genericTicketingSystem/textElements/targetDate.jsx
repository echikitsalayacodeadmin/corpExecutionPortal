import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";

const TargetDate = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Target date:</Typography>
        <Typography>
          {ticketInfo?.targetDate
            ? dayjs(ticketInfo?.targetDate).format("LL")
            : ""}
        </Typography>
      </Stack>
    </Fragment>
  );
};

export default TargetDate;
