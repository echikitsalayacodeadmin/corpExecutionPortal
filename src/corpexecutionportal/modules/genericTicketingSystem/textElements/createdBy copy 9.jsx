import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const CreatedBy = ({ createdBy }) => {
  return (
    <Fragment>
      <Stack>
        <Typography>Ticket number</Typography>
        <Typography>{createdBy}</Typography>
      </Stack>
    </Fragment>
  );
};

export default CreatedBy;
