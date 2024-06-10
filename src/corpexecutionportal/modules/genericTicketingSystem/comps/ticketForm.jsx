import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import {
  getCompanyList,
  getSessionTypeList,
} from "../../../services/genericTicketingSystem";

const TicketForm = ({ formValues, setFormValues }) => {
  const [sessionTypeList, setSessionTypeList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    getSessionTypeList(setSessionTypeList);
    getCompanyList(setCompanyList);
  }, []);

  console.log({ companyList, sessionTypeList });
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={4}>
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
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <BookIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Company name
                        </Typography>
                      </Stack>
                      <TextField size="small" />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
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
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <BookIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Seesion Date
                        </Typography>
                      </Stack>
                      <TextField type="date" size="small" />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
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
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1}>
                        <BookIcon fontSize="10" />
                        <Typography sx={{ fontSize: 10 }}>
                          Session Type
                        </Typography>
                      </Stack>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <Select
                            value={formValues.sessionType}
                            label=""
                            onChange={(e) =>
                              setFormValues({
                                ...formValues,
                                sessionType: e.target.value,
                              })
                            }
                          >
                            {sessionTypeList.map((value, index) => (
                              <MenuItem value={value} key={index}>
                                {value.sessionName}
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

          <Grid item lg={12} display="flex" justifyContent="center">
            <Button variant="outlined" onClick={() => console.log("hi")}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default TicketForm;
