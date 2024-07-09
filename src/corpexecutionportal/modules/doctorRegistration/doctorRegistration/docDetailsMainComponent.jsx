import { Box, Container, Grid } from "@mui/material";
import NewDocForm from "./RegistrationForms/newDocForm";

const DocDetailsMainComponent = (props) => {
  return (
    <Container component="main" maxWidth={false}>
      <Grid container>
        <Grid item lg={12}>
          <Box
            sx={{
              mt: 2,
              maxHeight: "86vh",
              overflow: "auto",
              width: "100%",
              filter: "drop-shadow(1px 1px 7px rgba(32, 143, 148, 0.95))",
              background: "#fff",
              borderRadius: 2,
            }}
          >
            <NewDocForm />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DocDetailsMainComponent;
