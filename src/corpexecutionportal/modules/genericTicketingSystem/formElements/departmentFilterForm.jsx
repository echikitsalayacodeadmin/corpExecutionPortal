import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { getDepartments } from "../../../services/genericTicketingSystem";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";

const DepartmentFilterForm = ({ formValues, setFormValues, corpId }) => {
  const [departmentList, setDepartmentList] = useState([]);

  useEffect(() => {
    if (corpId) {
      getDepartments(corpId, setDepartmentList);
    } else {
      setDepartmentList([]);
    }
  }, [corpId]);

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
                      <Typography sx={{ fontSize: 10 }}>Department</Typography>
                    </Stack>
                    <Box sx={{ minWidth: 400 }}>
                      <Autocomplete
                        value={formValues.department || null}
                        onChange={(event, newValue) => {
                          console.log({ newValue });
                          setFormValues({
                            ...formValues,
                            department: newValue,
                          });
                        }}
                        sx={{
                          "& .MuiAutocomplete-input, & .MuiInputLabel-root": {
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#000",
                          },
                        }}
                        ListboxProps={{
                          sx: { fontSize: 11, fontWeight: 600 },
                        }}
                        size="small"
                        fullWidth
                        disablePortal
                        options={departmentList}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              "& fieldset": {
                                fontSize: 11,
                                height: 41,
                                borderRadius: 3,
                              },
                            }}
                            label="Department"
                            InputLabelProps={{
                              style: {
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: 11,
                                color: "#404040",
                              },
                            }}
                          />
                        )}
                      />
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

export default DepartmentFilterForm;
