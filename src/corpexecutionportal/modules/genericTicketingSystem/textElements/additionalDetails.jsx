import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const AdditionalDetails = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Additional Details:</Typography>
        <Typography>{ticketInfo?.additionalDetails}</Typography>
      </Stack>
    </Fragment>
  );
};

export default AdditionalDetails;
