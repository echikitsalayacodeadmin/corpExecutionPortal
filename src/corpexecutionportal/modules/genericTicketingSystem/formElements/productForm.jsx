import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { productList } from "../../../assets/corpConstants";

const ProductForm = ({ data, formValues, setFormValues }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={2} display="flex" alignItems="center">
        <Typography sx={{ fontWeight: 600 }}>Product:</Typography>
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <Select
              displayEmpty
              size="small"
              fullWidth
              value={formValues.product || ""}
              label=""
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  product: e.target.value,
                })
              }
            >
              <MenuItem disabled value="">
                <em>Select Product...</em>
              </MenuItem>
              {productList.map((value, index) => (
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

export default ProductForm;
