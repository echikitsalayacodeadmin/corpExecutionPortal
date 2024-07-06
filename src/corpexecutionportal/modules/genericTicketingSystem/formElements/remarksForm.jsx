import { Box, Stack, TextField, Typography } from "@mui/material";
import { Fragment } from "react";

const RemarksForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Remarks:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter remark..."
            value={formValues.remarks || ""}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                remarks: e.target.value,
              })
            }
          />
        </Box>
      </Stack>
    </Fragment>
  );
};

export default RemarksForm;
