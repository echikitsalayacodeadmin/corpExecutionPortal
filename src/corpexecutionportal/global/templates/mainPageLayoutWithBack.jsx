import { Box, Button, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { CustomTypographyHeading } from "../../../assets/customTypography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const MainPageLayoutWithBack = ({ title, children }) => {
  let navigate = useNavigate();
  return (
    <Fragment>
      <Box>
        <Grid container spacing={3}>
          <Grid
            item
            lg={1}
            md={1}
            sm={1}
            xs={1}
            display="flex"
            //justifyContent="center"
            //alignItems="center"
          >
            <Button onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon />
            </Button>
          </Grid>
          <Grid
            item
            lg={11}
            md={11}
            sm={11}
            xs={11}
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

export default MainPageLayoutWithBack;
