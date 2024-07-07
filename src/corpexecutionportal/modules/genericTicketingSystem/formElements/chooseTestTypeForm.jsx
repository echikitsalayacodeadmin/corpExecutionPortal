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
import SplitscreenIcon from "@mui/icons-material/Splitscreen";

const TestTypeList = [
  { id: 1, label: "ONROLL", value: "ONROLL" },
  { id: 2, label: "OFFROLL", value: "OFFROLL" },
  { id: 3, label: "PRE EMPLOYMENT", value: "PRE_EMPLOYMENT" },
];

const ChooseTestTypeForm = ({ formValues, setFormValues }) => {
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
                      <SplitscreenIcon fontSize="10" />
                      <Typography sx={{ fontSize: 10 }}>Test Type*</Typography>
                    </Stack>
                    <Box sx={{ minWidth: 400 }}>
                      <FormControl fullWidth>
                        <Select
                          displayEmpty
                          size="small"
                          fullWidth
                          value={formValues.testType || ""}
                          label=""
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              testType: e.target.value,
                            })
                          }
                        >
                          <MenuItem disabled value="">
                            <em>Select test type...</em>
                          </MenuItem>
                          {TestTypeList.map((value, index) => (
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

export default ChooseTestTypeForm;
