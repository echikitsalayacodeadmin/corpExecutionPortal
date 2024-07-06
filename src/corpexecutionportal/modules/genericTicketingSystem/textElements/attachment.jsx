import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Attachment = ({ data }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Attachment:</Typography>
        <Typography>{""}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Attachment;
