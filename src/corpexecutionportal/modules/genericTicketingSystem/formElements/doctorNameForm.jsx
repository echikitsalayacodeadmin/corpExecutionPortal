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

const DoctorNameForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <PersonIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>
                    Doctor/Instructor name
                  </Typography>
                </Stack>

                <TextField
                  size="small"
                  fullWidth
                  value={formValues.doctorName || ""}
                  onChange={(e) =>
                    setFormValues({ ...formValues, doctorName: e.target.value })
                  }
                  placeholder="Enter doctor name"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DoctorNameForm;
