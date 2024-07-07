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

const EmployeeIdForm = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <PersonIcon fontSize="10" />
                  <Typography sx={{ fontSize: 10 }}>Employee ID</Typography>
                </Stack>

                <TextField
                  size="small"
                  fullWidth
                  value={formValues.empId || ""}
                  onChange={(e) =>
                    setFormValues({ ...formValues, empId: e.target.value })
                  }
                  placeholder="Enter employee ID..."
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EmployeeIdForm;
