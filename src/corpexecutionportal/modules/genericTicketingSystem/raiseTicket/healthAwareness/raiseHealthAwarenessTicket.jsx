import { Box, Grid } from "@mui/material";
import { Fragment } from "react";
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";
import SessionDateForm from "../../formElements/sessionDateForm";
import SessionTypeForm from "../../formElements/sessionTypeForm";

const RaiseHealthAwarenessTicket = ({
  formValues,
  setFormValues,
  formData,
  companyList,
  sessionTypeList,
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
          <Grid
            item
            lg={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <SessionTypeForm
              formValues={formValues}
              setFormValues={setFormValues}
              sessionTypeList={sessionTypeList}
            />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseHealthAwarenessTicket;
