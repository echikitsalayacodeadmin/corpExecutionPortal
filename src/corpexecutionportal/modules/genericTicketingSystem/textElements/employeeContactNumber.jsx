import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const EmployeeContactNumber = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>
          Employee Contact Number:
        </Typography>
        <Typography>{ticketInfo?.mobile}</Typography>
      </Stack>
    </Fragment>
  );
};

export default EmployeeContactNumber;
