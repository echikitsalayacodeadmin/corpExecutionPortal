import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { backendOwner } from "../../../assets/corpConstants";

const BackendOwnerForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Backend Owner:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              size="small"
              fullWidth
              value={formValues.backendOwner || ""}
              label=""
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  backendOwner: e.target.value,
                })
              }
            >
              <MenuItem disabled value="">
                <em>Select backend owner...</em>
              </MenuItem>
              {backendOwner.map((value, index) => (
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

export default BackendOwnerForm;
