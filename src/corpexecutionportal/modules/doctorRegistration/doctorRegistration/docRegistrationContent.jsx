import { Box, Button, Grid, Stack, Typography } from "@mui/material";

const DocRegistrationContent = (props) => {
  const regitrationHandler = () => {
    props.onClickAction("REGISTER");
  };
  const searchHandler = () => {
    props.onClickAction("SEARCH");
  };
  return (
    <Box>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box
            sx={{ minHeight: "4vh", p: 25 }}
            component={Stack}
            justifyContent="center"
            spacing={4}
          >
            <Button onClick={searchHandler} variant="contained" size="large">
              Look for existing doctors
            </Button>
            <Button
              onClick={regitrationHandler}
              variant="contained"
              size="large"
            >
              On Board New Doctor
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocRegistrationContent;
