import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";
import ServiceForm from "../../formElements/serviceForm";
import PreferredDate from "../../formElements/preferredDate";
import AdditionalDetailsForm from "../../formElements/additionalDetailsForm";

const RaiseNewServiceTicket = ({
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

          <Grid item lg={5}>
            <ServiceForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid item lg={3}>
            <PreferredDate
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid item lg={12}>
            <AdditionalDetailsForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseNewServiceTicket;
