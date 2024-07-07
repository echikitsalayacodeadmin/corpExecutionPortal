import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import SessionDateForm from "../../formElements/sessionDateForm";
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";

const RaiseDefaultTicket = ({
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
            lg={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SessionDateForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseDefaultTicket;
