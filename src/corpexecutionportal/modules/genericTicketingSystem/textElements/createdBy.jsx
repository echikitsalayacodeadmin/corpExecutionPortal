import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const CreatedBy = ({ data }) => {
  let { raisedBy } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Raised by:</Typography>
        <Typography>{raisedBy}</Typography>
      </Stack>
    </Fragment>
  );
};

export default CreatedBy;
