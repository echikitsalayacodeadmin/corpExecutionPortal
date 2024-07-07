import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";
import EmployeeIdForm from "../../formElements/employeeIdForm";
import EmployeeNameForm from "../../formElements/employeeNameForm";
import IssueForm from "../../formElements/issueForm";

const RaiseEmergencyTicket = ({
  formValues,
  setFormValues,
  formData,
  companyList = [],
}) => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={4}>
            <ChooseCompanyForm
              formValues={formValues}
              setFormValues={setFormValues}
              companyList={companyList}
            />
          </Grid>

          <Grid item lg={4}>
            <EmployeeIdForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid item lg={4}>
            <EmployeeNameForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid
            item
            lg={12}
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

export default RaiseEmergencyTicket;
