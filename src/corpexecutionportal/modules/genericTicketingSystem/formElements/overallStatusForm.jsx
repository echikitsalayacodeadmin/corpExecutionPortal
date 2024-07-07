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
import { OverallStatusList } from "../../../assets/corpConstants";
import CommentIcon from "@mui/icons-material/Comment";

const OverallStatusForm = ({ formValues, setFormValues }) => {
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
                      <Typography sx={{ fontSize: 10 }}>
                        Overall Status
                      </Typography>
                    </Stack>
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default OverallStatusForm;
