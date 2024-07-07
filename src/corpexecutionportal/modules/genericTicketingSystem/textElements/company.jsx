import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";

const Company = ({ data }) => {
  let { corpName } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Company:</Typography>
        <Typography>{corpName}</Typography>
      </Stack>
    </Fragment>
  );
};

export default Company;
