import { Grid, Stack } from "@mui/material";
import { Fragment } from "react";
import {
  CustomTypography,
  CustomTypographyBold,
} from "../../../../assets/customTypography";

const EmployeeBiodata = ({ formValues, name = "" }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent={{ lg: "space-between", xs: "space-between" }}
          >
            <Stack direction="row">
              <CustomTypography>Name:</CustomTypography>
              <CustomTypographyBold>{formValues?.name}</CustomTypographyBold>
            </Stack>
            <Stack direction="row">
              <CustomTypography>Emp Id:</CustomTypography>
              <CustomTypographyBold>{formValues?.empId}</CustomTypographyBold>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent={{ lg: "space-around", xs: "space-between" }}
          >
            <Stack direction="row">
              <CustomTypography>Phone No:</CustomTypography>
              <CustomTypographyBold>{formValues?.mobile}</CustomTypographyBold>
            </Stack>
            <Stack direction="row">
              <CustomTypography>Age:</CustomTypography>
              <CustomTypographyBold>{formValues?.age}</CustomTypographyBold>
            </Stack>
          </Stack>
        </Grid>

        {name === "pft" && (
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ lg: "space-around", xs: "space-between" }}
            >
              <Stack direction="row">
                <CustomTypography>Height:</CustomTypography>
                <CustomTypographyBold>
                  {formValues?.height ? `${formValues?.height}cm` : ""}
                </CustomTypographyBold>
              </Stack>
              <Stack direction="row">
                <CustomTypography>Weight:</CustomTypography>
                <CustomTypographyBold>
                  {formValues?.weight ? `${formValues?.weight}kg` : ""}
                </CustomTypographyBold>
              </Stack>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

export default EmployeeBiodata;
