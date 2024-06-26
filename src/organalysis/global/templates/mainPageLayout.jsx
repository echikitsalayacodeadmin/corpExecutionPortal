import { Box, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { CustomTypographyHeading } from "../../../assets/customTypography";

const MainPageLayout = ({ title, children }) => {
  return (
    <Fragment>
      <Box>
        <Grid container spacing={3}>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CustomTypographyHeading>{title}</CustomTypographyHeading>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default MainPageLayout;
