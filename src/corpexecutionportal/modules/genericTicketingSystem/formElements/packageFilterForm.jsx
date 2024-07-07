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
import { fetchPackages } from "../../../services/genericTicketingSystem";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import PackageAutocomplete from "../comps/packageAutocomplete";

const PackageFilterForm = ({ formValues, setFormValues, corpId, testType }) => {
  const [listOfPackage, setListOfPackage] = useState([]);

  useEffect(() => {
    fetchPackages(corpId, testType, setListOfPackage);
  }, [corpId, testType]);

  console.log({ listOfPackage });

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
                      <Typography sx={{ fontSize: 10 }}>Package</Typography>
                    </Stack>
                    <Box sx={{ minWidth: 400 }}>
                      <PackageAutocomplete
                        formValues={formValues}
                        setFormValues={setFormValues}
                        listOfPackage={listOfPackage}
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

export default PackageFilterForm;
