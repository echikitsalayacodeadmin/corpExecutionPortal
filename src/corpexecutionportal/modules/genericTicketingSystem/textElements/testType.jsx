import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const TestType = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Test Type:</Typography>
        <Typography>{ticketInfo?.testType}</Typography>
      </Stack>
    </Fragment>
  );
};

export default TestType;
