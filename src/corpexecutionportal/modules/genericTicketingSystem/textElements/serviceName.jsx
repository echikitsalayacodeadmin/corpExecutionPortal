import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const ServiceName = ({ data }) => {
  let { ticketInfo } = data;

  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Service Name:</Typography>
        <Typography>{ticketInfo?.serviceName}</Typography>
      </Stack>
    </Fragment>
  );
};

export default ServiceName;
