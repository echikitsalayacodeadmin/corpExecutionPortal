import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Address = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Address:</Typography>
        <Typography>{ticketInfo?.place}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Address;
