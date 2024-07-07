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
import { frontendOwner } from "../../../assets/corpConstants";
import PersonIcon from "@mui/icons-material/Person";

const FrontendOwerForm = ({ formValues, setFormValues }) => {
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
                      <PersonIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>
                        Frontend Owner
                      </Typography>
                    </Stack>
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FrontendOwerForm;
