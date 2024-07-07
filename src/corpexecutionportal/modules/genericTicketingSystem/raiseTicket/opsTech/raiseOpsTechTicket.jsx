import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SingleUpload from "../../comps/singleUpload";
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";
import TargetDateForm from "../../formElements/targetDateForm";
import TaskForm from "../../formElements/taskForm";

const RaiseOpsTechTicket = ({
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
            lg={5}
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

export default RaiseOpsTechTicket;
