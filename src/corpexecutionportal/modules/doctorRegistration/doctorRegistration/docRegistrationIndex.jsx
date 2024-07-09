import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import DocRegistrationContent from "./docRegistrationContent";
import DoctorSearchMainComp from "./docSearch/doctorSearchMainComp";
import EditDcotorMainComp from "./editDoctor/editDcotorMainComp";
import DoctorSignUpForm from "./RegistrationForms/doctorSignUpForm";
import NewDocForm from "./RegistrationForms/newDocForm";

const DocRegistrationIndex = (props) => {
  const actionHandler = (data, docId, docList) => {
    console.log({ sdfsfsdf111: docList });
    if (data === "REGISTER") {
      setContent(<DoctorSignUpForm onClickAction={actionHandler} />);
    } else if (data === "FILLDETAILS") {
      setContent(<NewDocForm onClickAction={actionHandler} />);
    } else if (data === "SEARCH") {
      setContent(<DoctorSearchMainComp onClickAction={actionHandler} />);
    } else if (data === "BACK") {
      setContent(<DocRegistrationContent onClickAction={actionHandler} />);
    } else if (data === "EDIT") {
      setContent(
        <EditDcotorMainComp
          onClickAction={actionHandler}
          docId={docId}
          docList={docList}
        />
      );
    } else if (data === "BACKTOSEARCH") {
      setContent(
        <DoctorSearchMainComp onClickAction={actionHandler} docList={docList} />
      );
    }
  };

  const [content, setContent] = useState(
    <DocRegistrationContent onClickAction={actionHandler} />
  );

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
            <Box sx={{ minHeight: "86vh" }}>{content}</Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DocRegistrationIndex;
