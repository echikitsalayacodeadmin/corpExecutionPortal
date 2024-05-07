import { Fragment } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { CustomTypographyHeading } from "../../../assets/customTypography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomButtonBlue from "../../../assets/customButtonBlue";

const MainPageLayoutWithBackQ = ({ title, children, onAddQuotationClick }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item lg={1} md={1} sm={1} xs={1} display="flex">
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon sx={{ color: "#127DDD" }} />
            </IconButton>
          </Grid>
          <Grid
            item
            lg={7}
            md={7}
            sm={7}
            xs={7}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CustomTypographyHeading>{title}</CustomTypographyHeading>
          </Grid>

          <Grid
            item
            lg={4}
            md={4}
            sm={4}
            xs={4}
            display="flex"
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            sx={{ gap: "10px" }}
          >
            <CustomButtonBlue
              title={"Add Quotation"}
              size="small"
              variant="contained"
              onClick={onAddQuotationClick}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default MainPageLayoutWithBackQ;
