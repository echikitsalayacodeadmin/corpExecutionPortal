import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Department = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Department:</Typography>
        <Typography>{ticketInfo?.department}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Department;
