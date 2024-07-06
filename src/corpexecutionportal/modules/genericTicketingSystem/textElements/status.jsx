import { Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { StatusListForNonFilter } from "../../../assets/corpConstants";

const Status = ({ data }) => {
  let { status } = data;
  return (
    <Fragment>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: 600 }}>Status:</Typography>
        <Typography>
          {StatusListForNonFilter.find((value) => value.value === status)
            .label || ""}
        </Typography>
      </Stack>
    </Fragment>
  );
};

export default Status;
