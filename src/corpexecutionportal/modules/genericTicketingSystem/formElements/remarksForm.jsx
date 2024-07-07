import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import CommentIcon from "@mui/icons-material/Comment";

const RemarksForm = ({ formValues, setFormValues }) => {
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
                      <Typography sx={{ fontSize: 10 }}>Remarks</Typography>
                    </Stack>
                    <Box sx={{ minWidth: 400 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter remark..."
                        value={formValues.remarks || ""}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            remarks: e.target.value,
                          })
                        }
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

export default RemarksForm;
