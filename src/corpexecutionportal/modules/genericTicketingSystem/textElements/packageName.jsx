import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const PackageName = ({ data }) => {
  let { ticketInfo } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Package Name:</Typography>
        <Typography>{ticketInfo?.packageName}</Typography>
      </Stack>
    </Fragment>
  );
};

export default PackageName;
