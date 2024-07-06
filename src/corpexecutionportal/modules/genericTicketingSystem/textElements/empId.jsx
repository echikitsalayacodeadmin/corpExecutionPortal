import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const EmpId = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Employee ID:</Typography>
        <Typography>{ticketInfo?.empId}</Typography>
      </Stack>
    </Fragment>
  );
};

export default EmpId;
