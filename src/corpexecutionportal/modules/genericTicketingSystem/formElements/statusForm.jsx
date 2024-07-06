import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { StatusListOpsTicket } from "../../../assets/corpConstants";

const StatusForm = ({ data, formValues, setFormValues }) => {
  const [status, setStatus] = useState(
    StatusListOpsTicket.find((value) => value.value === data.status) || ""
  );
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Staus:</Typography>
        <Box sx={{ minWidth: 300 }}>
          <FormControl fullWidth>
            <Select
              size="small"
              fullWidth
              value={status}
              label=""
              onChange={(e) => {
                setStatus(e.target.value);
                setFormValues({ ...formValues, status: e.target.value?.value });
              }}
            >
              {StatusListOpsTicket?.map((value, index) => (
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
