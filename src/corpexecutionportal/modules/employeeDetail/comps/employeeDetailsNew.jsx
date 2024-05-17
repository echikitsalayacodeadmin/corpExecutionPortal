import { Box, Grid, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { CustomSelect } from "./customSelect";

const EmployeeDetailsNew = ({ formValues, setFormValues }) => {
  return (
    <Fragment>
      <Box sx={{ width: { lg: "35%", xs: "100%" }, p: 1 }}>
        <Grid container spacing={1} border={1}>
          <Grid
            item
            lg={6}
            xs={5}
            //borderBottom={1}
            borderRight={1}
          ></Grid>
          <Grid
            item
            lg={2}
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            //borderBottom={1}
            borderRight={1}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, fontSize: 12, lineHeight: 2.6 }}
            >
              Expected
            </Typography>
          </Grid>
          <Grid
            item
            lg={2}
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            //borderBottom={1}
            borderRight={1}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12 }}>
              Tech
            </Typography>
          </Grid>
          <Grid
            item
            lg={2}
            xs={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            //borderBottom={1}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12 }}>
              Missing
            </Typography>
          </Grid>

          {formValues.map((item, index) => (
            <Fragment key={index}>
              <Grid item lg={6} xs={5} borderRight={1} borderTop={1}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, fontSize: 12 }}
                >
                  {item[0]}
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                xs={2}
                borderRight={1}
                borderTop={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography color={item[1].expected ? "green" : "red"}>
                  {item[1].expected ? "Yes" : "No"}
                </Typography>
              </Grid>
              <Grid
                item
                lg={2}
                xs={2}
                borderRight={1}
                borderTop={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography color={item[1].tech ? "green" : "red"}>
                  {item[1].tech ? "Yes" : "No"}
                </Typography>
              </Grid>
              <Grid
                borderTop={1}
                item
                lg={2}
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CustomSelect
                  dataValue={item[1]}
                  property="missing"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </Grid>
            </Fragment>
          ))}
        </Grid>

        <Grid container sx={{ mt: 4 }}>
          <Grid item lg={12} xs={12}>
            <TextField fullWidth label="Remark" />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default EmployeeDetailsNew;
