import { Box, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import SingleUpload from "../../comps/singleUpload";
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";
import TargetDateForm from "../../formElements/targetDateForm";
import RequirementForm from "../../formElements/requirementForm";

const RaiseSalesOpsTicket = ({
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
            <RequirementForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid item lg={3}>
            <TargetDateForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>
          <Grid
            item
            lg={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={2} flex={1}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Upload File</Typography>
              </Stack>
              <SingleUpload title={"Attachment"} formData={formData} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseSalesOpsTicket;
