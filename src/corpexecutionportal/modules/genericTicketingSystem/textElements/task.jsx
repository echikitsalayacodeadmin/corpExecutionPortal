import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Task = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Task:</Typography>
        <Typography>{ticketInfo?.requirement}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Task;
