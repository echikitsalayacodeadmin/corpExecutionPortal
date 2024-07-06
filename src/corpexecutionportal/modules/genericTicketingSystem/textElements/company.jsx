import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Company = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Company:</Typography>
        <Typography>{ticketInfo?.company?.orgName}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Company;
