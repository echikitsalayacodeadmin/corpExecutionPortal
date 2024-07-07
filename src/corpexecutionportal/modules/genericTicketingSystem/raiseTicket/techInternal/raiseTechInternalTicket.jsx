import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { backendOwner, frontendOwner } from "../../../../assets/corpConstants";
import ProductForm from "../../formElements/productForm";
import BackendOwnerForm from "../../formElements/backendOwnerForm";
import FrontendOwerForm from "../../formElements/frontendOwerForm";
import TaskForm from "../../formElements/taskForm";
import TargetDateForm from "../../formElements/targetDateForm";

const RaiseTechInternalTicket = ({ formValues, setFormValues, formData }) => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={4}>
            <ProductForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid item lg={4}>
            <BackendOwnerForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid
            item
            lg={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <FrontendOwerForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid
            item
            lg={9}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <TaskForm formValues={formValues} setFormValues={setFormValues} />
          </Grid>

          <Grid
            item
            lg={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <TargetDateForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseTechInternalTicket;
