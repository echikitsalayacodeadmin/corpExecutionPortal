import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const EmployeeName = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Employee Name:</Typography>
        <Typography>{ticketInfo?.empName}</Typography>
      </Stack>
    </Fragment>
  );
};

export default EmployeeName;
