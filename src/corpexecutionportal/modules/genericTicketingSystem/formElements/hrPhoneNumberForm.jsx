import {
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import PersonIcon from "@mui/icons-material/Person";

const HRPhoneNumberForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <PersonIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>HR Contact No.</Typography>
                </Stack>

                <TextField
                  size="small"
                  fullWidth
                  value={formValues.hrmobile || ""}
                  onChange={(e) => {
                    if (!isNaN(e.target.value) && e.target.value.length < 11) {
                      setFormValues({
                        ...formValues,
                        hrmobile: e.target.value,
                      });
                    }
                  }}
                  placeholder="Enter phone number..."
                  error={formValues?.mobile && formValues.hrmobile?.length < 10}
                  helperText={
                    formValues?.hrmobile && formValues.hrmobile?.length < 10
                      ? "Enter 10 digit mobile number."
                      : ""
                  }
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default HRPhoneNumberForm;
