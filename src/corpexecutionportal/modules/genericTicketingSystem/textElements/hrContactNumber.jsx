import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const HRContactNumber = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>HR Contact Number:</Typography>
        <Typography>{ticketInfo?.hrMobile}</Typography>
      </Stack>
    </Fragment>
  );
};

export default HRContactNumber;
