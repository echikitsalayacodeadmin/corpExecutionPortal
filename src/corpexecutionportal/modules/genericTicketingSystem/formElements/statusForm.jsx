import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { StatusListOpsTicket } from "../../../assets/corpConstants";

const StatusForm = ({
  formValues,
  setFormValues,
  statusList = StatusListOpsTicket,
}) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Status:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <Select
              size="small"
              fullWidth
              value={formValues.status || ""}
              label=""
              onChange={(e) => {
                setFormValues({ ...formValues, status: e.target.value });
              }}
            >
              {statusList?.map((value, index) => (
                <MenuItem value={value} key={index}>
                  {value.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Fragment>
  );
};

export default StatusForm;
