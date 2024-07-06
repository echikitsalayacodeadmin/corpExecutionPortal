import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Name = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Name:</Typography>
        <Typography>{ticketInfo?.name}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Name;
