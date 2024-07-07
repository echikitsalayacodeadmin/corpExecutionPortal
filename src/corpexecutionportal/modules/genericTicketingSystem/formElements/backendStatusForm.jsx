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
import { DevStatusList } from "../../../assets/corpConstants";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";

const BackendStatusForm = ({ formValues, setFormValues }) => {
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
                      <Typography sx={{ fontSize: 10 }}>
                        Backend Status
                      </Typography>
                    </Stack>
                    <Box sx={{ minWidth: 400 }}>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          fullWidth
                          value={formValues.backendStatus || ""}
                          label=""
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              backendStatus: e.target.value,
                            });
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default BackendStatusForm;
