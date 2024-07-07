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

const RequirementForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <PersonIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Requirement</Typography>
                </Stack>

                <TextField
                  size="small"
                  fullWidth
                  value={formValues.requirement || ""}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      requirement: e.target.value,
                    })
                  }
                  placeholder="Enter requirement..."
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RequirementForm;
