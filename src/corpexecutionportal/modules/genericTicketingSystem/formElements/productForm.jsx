import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { productList } from "../../../assets/corpConstants";
import CommentIcon from "@mui/icons-material/Comment";

const ProductForm = ({ data, formValues, setFormValues }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={1}>
                <Grid
                  item
                  lg={12}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Stack spacing={2} flex={1}>
                    <Stack direction="row" spacing={1}>
                      <CommentIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Product</Typography>
                    </Stack>
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProductForm;
