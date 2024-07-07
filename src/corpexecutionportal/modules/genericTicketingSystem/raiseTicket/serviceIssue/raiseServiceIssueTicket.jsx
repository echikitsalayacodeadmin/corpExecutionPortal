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
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";
import ServiceNameForm from "../../formElements/serviceNameForm";
import IssueForm from "../../formElements/issueForm";

const RaiseServiceIssueTicket = ({
  formValues,
  setFormValues,
  formData,
  companyList = [],
}) => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid
            item
            lg={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ChooseCompanyForm
              formValues={formValues}
              setFormValues={setFormValues}
              companyList={companyList}
            />
          </Grid>

          <Grid
            item
            lg={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ServiceNameForm
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
            <IssueForm formValues={formValues} setFormValues={setFormValues} />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseServiceIssueTicket;
