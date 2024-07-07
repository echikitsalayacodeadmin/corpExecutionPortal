import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { Fragment } from "react";
import BookIcon from "@mui/icons-material/Book";
import SingleUpload from "../../comps/singleUpload";
import ChooseCompanyForm from "../../formElements/chooseCompanyForm";
import EmployeeNameForm from "../../formElements/employeeNameForm";
import SessionDateForm from "../../formElements/sessionDateForm";
import ChooseTestTypeForm from "../../formElements/chooseTestTypeForm";
import EmployeeIdForm from "../../formElements/employeeIdForm";
import AddressForm from "../../formElements/addressForm";
import EmployeePhoneNumberForm from "../../formElements/employeePhoneNumberForm";
import HRPhoneNumberForm from "../../formElements/hrPhoneNumberForm";

const RaisePreemploymentTicket = ({
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
            <EmployeeNameForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid item lg={4}>
            <SessionDateForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid item lg={4}>
            <ChooseTestTypeForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid item lg={4}>
            <Stack spacing={2} flex={1}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Department</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.department || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, department: e.target.value })
                }
              />
            </Stack>
          </Grid>

          <Grid item lg={4}>
            <EmployeeIdForm
              formValues={formValues}
              setFormValues={setFormValues}
              label="Employee ID or temporary ID"
            />
          </Grid>

          <Grid item lg={4}>
            <AddressForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid item lg={4}>
            <EmployeePhoneNumberForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid item lg={4}>
            <HRPhoneNumberForm
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </Grid>

          <Grid item lg={4}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <BookIcon fontSize="10" />
                <Typography sx={{ fontSize: 10 }}>Package</Typography>
              </Stack>
              <TextField
                size="small"
                fullWidth
                placeholder=""
                value={formValues.packageName || ""}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    packageName: e.target.value,
                  })
                }
              />
            </Stack>
          </Grid>

          <Grid item lg={12}>
            <Stack spacing={2} sx={{ width: 200 }}>
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

export default RaisePreemploymentTicket;
