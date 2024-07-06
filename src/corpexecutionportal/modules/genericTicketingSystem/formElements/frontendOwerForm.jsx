import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { frontendOwner } from "../../../assets/corpConstants";

const FrontendOwerForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Frontend Owner:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              size="small"
              fullWidth
              value={formValues.frontendOwner || ""}
              label=""
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  frontendOwner: e.target.value,
                })
              }
            >
              <MenuItem disabled value="">
                <em>Select frontend owner...</em>
              </MenuItem>
              {frontendOwner.map((value, index) => (
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

export default FrontendOwerForm;
