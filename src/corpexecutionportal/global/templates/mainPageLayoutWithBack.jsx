import { Fragment } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { CustomTypographyHeading } from "../../../assets/customTypography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MainPageLayoutWithBack = ({
  title,
  children,
  onDownloadClick,
  downloadButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box>
        <Grid container rowSpacing={2}>
          <Grid item lg={1} md={1} sm={1} xs={1} display="flex">
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon sx={{ color: "#127DDD" }} />
            </IconButton>
          </Grid>
          <Grid
            item
            lg={downloadButton ? 10 : 11}
            md={downloadButton ? 10 : 11}
            sm={downloadButton ? 10 : 11}
            xs={downloadButton ? 10 : 11}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CustomTypographyHeading>{title}</CustomTypographyHeading>
          </Grid>
          {downloadButton && (
            <Grid item lg={1} md={1} sm={1} xs={1} display="flex">
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
            </Grid>
          )}
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default MainPageLayoutWithBack;
