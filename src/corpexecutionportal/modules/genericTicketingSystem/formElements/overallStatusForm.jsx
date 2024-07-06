import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { OverallStatusList } from "../../../assets/corpConstants";

const OverallStatusForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Overall Status:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <Select
              size="small"
              fullWidth
              value={formValues.overallStatus || ""}
              label=""
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  overallStatus: e.target.value,
                });
              }}
            >
              {OverallStatusList?.map((value, index) => (
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

export default OverallStatusForm;
