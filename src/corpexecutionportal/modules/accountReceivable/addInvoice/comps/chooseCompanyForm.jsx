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

const ChooseCompanyForm = ({ formValues, setFormValues, companyList = [] }) => {
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
                        Company Name
                      </Typography>
                    </Stack>
                    <Box sx={{ minWidth: 400 }}>
                      <FormControl fullWidth>
                        <Select
                          sx={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#000",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                          }}
                          displayEmpty
                          size="small"
                          fullWidth
                          value={formValues.company || ""}
                          label=""
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              company: e.target.value,
                            })
                          }
                        >
                          <MenuItem
                            value=""
                            sx={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#000",
                              fontFamily: "Roboto",
                              fontStyle: "normal",
                            }}
                          >
                            <em>Select Company...</em>
                          </MenuItem>
                          {companyList.map((value, index) => (
                            <MenuItem
                              value={value}
                              key={index}
                              sx={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "#000",
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                              }}
                            >
                              {value.orgName}
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

export default ChooseCompanyForm;
