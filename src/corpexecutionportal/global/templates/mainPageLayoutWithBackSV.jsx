import { Fragment } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { CustomTypographyHeading } from "../../../assets/customTypography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomButtonBlue from "../../../assets/customButtonBlue";

const MainPageLayoutWithBackSV = ({
  title,
  children,
  onDownloadClick,
  onRegisterClick,
}) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={1}>
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

          <Grid item lg={1} md={1} sm={1} xs={1} display="flex"></Grid>

          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={3}
            display="flex"
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            sx={{ gap: "10px" }}
          >
            <IconButton
              onClick={onDownloadClick}
              sx={{
                backgroundColor: "#127DDD",
                ":hover": {
                  backgroundColor: "#1f63a1",
                },
              }}
            >
              <Download sx={{ color: "#FFF" }} />
            </IconButton>
            <CustomButtonBlue
              title={"Register"}
              size="small"
              variant="contained"
              onClick={onRegisterClick}
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

export default MainPageLayoutWithBackSV;
