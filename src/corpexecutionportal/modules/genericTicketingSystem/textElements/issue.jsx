import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Issue = ({ data }) => {
  let { ticketInfo } = data;

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Issue:</Typography>
        <Typography>{ticketInfo?.issue}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Issue;
