import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { DevStatusList } from "../../../assets/corpConstants";

const BackendStatusForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Backend Status:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <Select
              size="small"
              fullWidth
              value={formValues.backendStatus || ""}
              label=""
              onChange={(e) => {
                setFormValues({ ...formValues, backendStatus: e.target.value });
              }}
            >
              {DevStatusList?.map((value, index) => (
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

export default BackendStatusForm;
